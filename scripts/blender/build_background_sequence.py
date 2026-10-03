import bpy
import os
import math
from mathutils import Vector

# ─── PATHS ────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR  = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
ASSETS_DIR   = os.path.join(PROJECT_DIR, 'assets', '3d')
OBJ_PATH     = os.path.join(ASSETS_DIR, 'house_download', 'house.obj')
OUT_DIR      = os.path.join(PROJECT_DIR, 'public', 'images', 'construction', 'background')
os.makedirs(OUT_DIR, exist_ok=True)

# ─── SCENE INIT ───────────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 32
scene.cycles.use_denoising = True

scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.quality = 80
scene.frame_start = 1
scene.frame_end = 90

# ─── LIGHTING (HDRI) ──────────────────────────────────────────────────────────
def find_map(cat_dir, *keywords):
    if not os.path.isdir(cat_dir): return None
    for f in sorted(os.listdir(cat_dir)):
        fl = f.lower()
        if not fl.endswith(('.hdr', '.exr')): continue
        for kw in keywords:
            if kw in fl: return os.path.join(cat_dir, f)
    return None

world = bpy.data.worlds.new('World')
scene.world = world
world.use_nodes = True
w_nodes = world.node_tree.nodes
w_links = world.node_tree.links
w_nodes.clear()
w_bg = w_nodes.new('ShaderNodeBackground')
w_out = w_nodes.new('ShaderNodeOutputWorld')
w_links.new(w_bg.outputs['Background'], w_out.inputs['Surface'])

hdr_path = find_map(os.path.join(ASSETS_DIR, 'hdr'), '.hdr', 'kloppenheim', 'sky')
if hdr_path:
    w_env = w_nodes.new('ShaderNodeTexEnvironment')
    w_env.image = bpy.data.images.load(hdr_path)
    w_links.new(w_env.outputs['Color'], w_bg.inputs['Color'])
    w_bg.inputs['Strength'].default_value = 1.0

# Add a strong sun for contrast
bpy.ops.object.light_add(type='SUN', align='WORLD', location=(0, 0, 10))
sun = bpy.context.active_object
sun.data.energy = 5.0
sun.rotation_euler = (math.radians(45), math.radians(30), math.radians(45))

# ─── IMPORT ASSET ─────────────────────────────────────────────────────────────
print(f"Importing {OBJ_PATH}...")
bpy.ops.wm.obj_import(filepath=OBJ_PATH)

# Separate by loose parts to animate them individually
bpy.ops.object.select_all(action='SELECT')
bpy.ops.mesh.separate(type='LOOSE')

# Gather all mesh objects
meshes = [obj for obj in scene.objects if obj.type == 'MESH']

# Calculate bounding box to place camera
min_coord = Vector((float('inf'), float('inf'), float('inf')))
max_coord = Vector((float('-inf'), float('-inf'), float('-inf')))

for obj in meshes:
    # Set origin to geometry for clean animation
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    
    for corner in obj.bound_box:
        world_corner = obj.matrix_world @ Vector(corner)
        for i in range(3):
            min_coord[i] = min(min_coord[i], world_corner[i])
            max_coord[i] = max(max_coord[i], world_corner[i])

center = (min_coord + max_coord) / 2
size = max_coord - min_coord
max_dim = max(size.x, size.y, size.z)

# ─── CAMERA ───────────────────────────────────────────────────────────────────
bpy.ops.object.camera_add()
cam = bpy.context.active_object
cam.name = 'Camera_Cinematic'
cam.data.lens = 50

# Position camera diagonally above and looking at center
cam_dist = max_dim * 1.5
cam.location = center + Vector((cam_dist, -cam_dist, cam_dist * 0.5))
scene.camera = cam

# Track camera to center
bpy.ops.object.empty_add(type='PLAIN_AXES', location=center)
target = bpy.context.active_object
ttc = cam.constraints.new(type='TRACK_TO')
ttc.target = target
ttc.track_axis = 'TRACK_NEGATIVE_Z'
ttc.up_axis = 'UP_Y'

# ─── ANIMATION SEQUENCE ───────────────────────────────────────────────────────
# We want to animate the components joining.
# Sort objects by their Z height (bottom to top)
meshes.sort(key=lambda obj: obj.location.z)

total_objects = len(meshes)
frames_per_object = 20
total_frames = 90

# Calculate when each object should start animating
for i, obj in enumerate(meshes):
    # Normalized position 0.0 to 1.0
    progress = i / max(1, (total_objects - 1))
    
    # Start frame (leaves last 20 frames for final settling)
    start_frame = int(1 + progress * (total_frames - frames_per_object - 10))
    end_frame = start_frame + frames_per_object
    
    final_loc = obj.location.copy()
    final_scale = obj.scale.copy()
    
    # Frame 1: Hidden (Scale 0, dropped from above)
    obj.location = final_loc + Vector((0, 0, max_dim * 0.5))
    obj.scale = (0, 0, 0)
    obj.keyframe_insert(data_path="location", frame=1)
    obj.keyframe_insert(data_path="scale", frame=1)
    
    # Frame start_frame: Still hidden
    obj.keyframe_insert(data_path="location", frame=start_frame)
    obj.keyframe_insert(data_path="scale", frame=start_frame)
    
    # Frame end_frame: Finished joining
    obj.location = final_loc
    obj.scale = final_scale
    obj.keyframe_insert(data_path="location", frame=end_frame)
    obj.keyframe_insert(data_path="scale", frame=end_frame)

# ─── RENDER ───────────────────────────────────────────────────────────────────
print("\nRendering 90 frame sequence...")
for frame in range(1, 91):
    scene.frame_set(frame)
    out_path = os.path.join(OUT_DIR, f"frame-{frame:03d}.webp")
    scene.render.filepath = out_path
    
    # Skip if exists to allow resuming
    if not os.path.exists(out_path):
        bpy.ops.render.render(write_still=True)
        print(f"Rendered: {out_path}")

print("Sequence render complete.")
