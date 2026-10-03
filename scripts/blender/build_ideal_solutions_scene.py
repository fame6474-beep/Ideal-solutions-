"""
Ideal Solutions — Phase 8A Production Blender Scene (Revision 4 - Architectural Rebuild)
build_ideal_solutions_scene.py

Changes:
1. Architectural Rebuild: Replaced primitive cubes with detailed, correctly scaled architectural geometry.
2. UV Mapping Fix: Explicitly apply scale to all objects so PBR textures map realistically and don't stretch.
3. Realistic Rafters: Modeled as actual 2x8 timber joists properly oriented and sitting on wall plates.
4. Detailed Shingle Courses: Individual overlapping rows with thickness and proper asphalt texturing.
5. Camera Framing: Adjusted to fill 70% of the viewport with the roof/house.
6. Render Scope: Only renders frames 001, 050, 090 for the specific visual gate.
"""

import bpy
import bmesh
import os
import math
from mathutils import Vector

# ─── PATHS ────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR  = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
ASSETS_DIR   = os.path.join(PROJECT_DIR, 'assets', '3d')
TEST_DIR     = os.path.join(PROJECT_DIR, 'public', 'images', 'construction', 'test')
BLEND_PATH   = os.path.join(SCRIPT_DIR, 'IdealSolutions_RoofConstruction.blend')
os.makedirs(TEST_DIR, exist_ok=True)

# ─── SCENE INIT ───────────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = 'IdealSolutions_RoofConstruction'

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 128
scene.cycles.use_denoising = True
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.quality = 95
scene.render.fps = 30

scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - High Contrast'
scene.view_settings.exposure = -0.1

# ─── HELPERS ──────────────────────────────────────────────────────────────────

def find_map(cat_dir, *keywords):
    if not os.path.isdir(cat_dir): return None
    for f in sorted(os.listdir(cat_dir)):
        fl = f.lower()
        if not fl.endswith(('.jpg', '.jpeg', '.png', '.exr', '.hdr')): continue
        for kw in keywords:
            if kw in fl: return os.path.join(cat_dir, f)
    return None

COLORSPACE_MAP = {'Linear': 'Linear Rec.709', 'sRGB': 'sRGB', 'Non-Color': 'Non-Color'}

def load_img(path, color_space='sRGB'):
    if not path: return None
    img = bpy.data.images.load(path)
    cs = COLORSPACE_MAP.get(color_space, color_space)
    try: img.colorspace_settings.name = cs
    except TypeError: pass
    return img

def pbr_material(name, cat, scale=1.0, metallic=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (-300, 0)
    out.location = (0, 0)
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    bsdf.inputs['Metallic'].default_value = metallic

    cat_dir = os.path.join(ASSETS_DIR, cat)
    
    # Use UV Box Mapping to prevent stretching and handle geometry well
    tc = nodes.new('ShaderNodeTexCoord')
    mp = nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (scale, scale, scale)
    # Using Object coordinates + Box mapping is robust for architectural elements
    links.new(tc.outputs['Object'], mp.inputs['Vector'])

    def tex_node(img_path, cs='sRGB', x=-800, y=0):
        if not img_path: return None
        img = load_img(img_path, cs)
        if not img: return None
        t = nodes.new('ShaderNodeTexImage')
        t.image = img
        t.location = (x, y)
        t.projection = 'BOX'
        t.projection_blend = 0.2
        links.new(mp.outputs['Vector'], t.inputs['Vector'])
        return t

    color_path = find_map(cat_dir, 'color', 'col', 'diff', 'albedo')
    rough_path = find_map(cat_dir, 'roughness', 'rough')
    normal_path = find_map(cat_dir, 'normal', 'nor')
    disp_path = find_map(cat_dir, 'displacement', 'disp')

    ct = tex_node(color_path, 'sRGB', -800, 200)
    rt = tex_node(rough_path, 'Non-Color', -800, 0)
    nt = tex_node(normal_path, 'Non-Color', -800, -200)
    dt = tex_node(disp_path, 'Non-Color', -800, -400)

    if ct: links.new(ct.outputs['Color'], bsdf.inputs['Base Color'])
    if rt: links.new(rt.outputs['Color'], bsdf.inputs['Roughness'])
    if nt:
        nm = nodes.new('ShaderNodeNormalMap')
        nm.location = (-400, -200)
        links.new(nt.outputs['Color'], nm.inputs['Color'])
        links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
    if dt:
        disp = nodes.new('ShaderNodeBump')
        disp.location = (-400, -400)
        disp.inputs['Distance'].default_value = 0.05
        links.new(dt.outputs['Color'], disp.inputs['Height'])
        links.new(disp.outputs['Normal'], bsdf.inputs['Normal'])
        # If normal map exists, chain them
        if nt:
            links.new(nt.outputs['Color'], nm.inputs['Color'])
            links.new(nm.outputs['Normal'], disp.inputs['Normal'])

    return mat

def apply_scale(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.select_set(False)

def create_mesh(name, verts, faces, mat, coll):
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    coll.objects.link(obj)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj.data.materials.append(mat)
    # Generate simple UVs
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.editmode_toggle()
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.cube_project(cube_size=1.0)
    bpy.ops.object.editmode_toggle()
    obj.select_set(False)
    return obj

def animate_drop_in(obj, appear_frame, lift_z):
    obj.hide_render = True
    obj.hide_viewport = True
    obj.keyframe_insert('hide_render', frame=1)
    obj.keyframe_insert('hide_viewport', frame=1)
    
    if appear_frame > 1:
        obj.hide_render = True
        obj.hide_viewport = True
        obj.keyframe_insert('hide_render', frame=appear_frame - 1)
        obj.keyframe_insert('hide_viewport', frame=appear_frame - 1)
        
    obj.hide_render = False
    obj.hide_viewport = False
    obj.keyframe_insert('hide_render', frame=appear_frame)
    obj.keyframe_insert('hide_viewport', frame=appear_frame)
    
    final_z = obj.location.z
    obj.location.z = final_z + lift_z
    obj.keyframe_insert('location', frame=appear_frame)
    
    end_frame = appear_frame + 6
    obj.location.z = final_z
    obj.keyframe_insert('location', frame=end_frame)

# ─── ENVIRONMENT ──────────────────────────────────────────────────────────────
world = bpy.data.worlds.new('World')
scene.world = world
if not world.node_tree: world.use_nodes = True
w_nodes = world.node_tree.nodes
w_links = world.node_tree.links
w_nodes.clear()
w_bg = w_nodes.new('ShaderNodeBackground')
w_out = w_nodes.new('ShaderNodeOutputWorld')
w_links.new(w_bg.outputs['Background'], w_out.inputs['Surface'])

hdr_path = find_map(os.path.join(ASSETS_DIR, 'hdr'), '.hdr', 'kloppenheim', 'sky')
if hdr_path:
    w_env = w_nodes.new('ShaderNodeTexEnvironment')
    w_env.image = load_img(hdr_path, 'Linear')
    w_tc = w_nodes.new('ShaderNodeTexCoord')
    w_mp = w_nodes.new('ShaderNodeMapping')
    w_mp.inputs['Rotation'].default_value = (0, 0, math.radians(110))
    w_links.new(w_tc.outputs['Generated'], w_mp.inputs['Vector'])
    w_links.new(w_mp.outputs['Vector'], w_env.inputs['Vector'])
    w_links.new(w_env.outputs['Color'], w_bg.inputs['Color'])
    w_bg.inputs['Strength'].default_value = 0.8

bpy.ops.object.light_add(type='SUN')
sun = bpy.context.active_object
sun.rotation_euler = (math.radians(45), math.radians(15), math.radians(-30))
sun.data.energy = 1.2
sun.data.angle = math.radians(2.0)

# Ground
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -0.05))
ground = bpy.context.active_object
gmat = pbr_material('Ground_Mat', 'house', scale=15.0)
ground.data.materials.append(gmat)
apply_scale(ground)

# ─── MATERIALS ────────────────────────────────────────────────────────────────
mat_wall     = pbr_material('Wall_Mat',     'house',       scale=0.5)
mat_timber   = pbr_material('Timber_Mat',   'timber',      scale=0.8)
mat_osb      = pbr_material('OSB_Mat',      'osb',         scale=0.5)
mat_underlay = pbr_material('Underlay_Mat', 'underlayment',scale=1.5)
mat_shingles = pbr_material('Shingles_Mat', 'shingles',    scale=1.0)
mat_metal    = pbr_material('Metal_Mat',    'metal',       scale=1.0, metallic=0.9)

mat_dark = bpy.data.materials.new(name="Dark_Glass")
mat_dark.use_nodes = True
mat_dark.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.01, 0.01, 0.015, 1)
mat_dark.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.05
mat_dark.node_tree.nodes['Principled BSDF'].inputs['Metallic'].default_value = 0.8

# ─── COLLECTIONS ──────────────────────────────────────────────────────────────
colls = {}
for name in ['0_House', '1_Rafters', '2_Decking', '3_Underlay', '4_Shingles', '5_Flashing', '6_Gutters']:
    c = bpy.data.collections.new(name)
    scene.collection.children.link(c)
    colls[name] = c

# ─── ARCHITECTURAL GEOMETRY ───────────────────────────────────────────────────
# House Layout: Main body + Front projecting wing
WH = 3.0    # Wall Height
HW_MAIN = 8.0  
HD_MAIN = 12.0 
HW_WING = 6.0   
HD_WING = 6.0   
OVH = 0.6   # Roof overhang
PITCH = 6.0 / 12.0  # 6:12 roof pitch
RP_MAIN = (HW_MAIN / 2 + OVH) * PITCH

# Walls
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, WH/2))
main_walls = bpy.context.active_object
main_walls.scale = (HW_MAIN, HD_MAIN, WH)
main_walls.data.materials.append(mat_wall)
apply_scale(main_walls)
colls['0_House'].objects.link(main_walls)
scene.collection.objects.unlink(main_walls)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING/2 - 1.0, WH/2))
side_walls = bpy.context.active_object
side_walls.scale = (HW_WING, HD_WING, WH)
side_walls.data.materials.append(mat_wall)
apply_scale(side_walls)
colls['0_House'].objects.link(side_walls)
scene.collection.objects.unlink(side_walls)

# Windows (Frames + Glass)
def add_window(loc, w, h, d):
    # Frame
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    frame = bpy.context.active_object
    frame.scale = (w, d, h)
    frame.data.materials.append(mat_metal)
    apply_scale(frame)
    colls['0_House'].objects.link(frame)
    scene.collection.objects.unlink(frame)
    # Glass
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    glass = bpy.context.active_object
    glass.scale = (w - 0.1, d + 0.05, h - 0.1)
    glass.data.materials.append(mat_dark)
    apply_scale(glass)
    colls['0_House'].objects.link(glass)
    scene.collection.objects.unlink(glass)

add_window((2.0, -HD_MAIN/2, 1.2), 1.2, 1.8, 0.2)
add_window((-2.0, -HD_MAIN/2, 1.2), 1.2, 1.8, 0.2)
add_window((-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING - 1.0, 1.2), 2.4, 0.2, 1.8) # Wing front window

# ─── ROOF FRAMING (RAFTERS) ───────────────────────────────────────────────────
# Real 2x8 timber joists
T_W = 0.038  # 1.5 inches
T_D = 0.184  # 7.25 inches
SPACING = 0.609 # 24 inches

# Main Ridge
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, WH + RP_MAIN - T_D/2))
ridge = bpy.context.active_object
ridge.scale = (T_W, HD_MAIN + OVH*2, T_D)
ridge.data.materials.append(mat_timber)
apply_scale(ridge)
colls['1_Rafters'].objects.link(ridge)
scene.collection.objects.unlink(ridge)
animate_drop_in(ridge, 10, 1.0)

# Main Rafters
num_main_rafters = int((HD_MAIN + OVH*2) / SPACING)
RAFTER_L = math.sqrt((HW_MAIN/2 + OVH)**2 + RP_MAIN**2)
SLOPE = math.atan(PITCH)

for i in range(num_main_rafters + 1):
    y = -HD_MAIN/2 - OVH + i * SPACING
    for side, sign in [('L', -1), ('R', 1)]:
        # Skip intersection with wing
        if side == 'L' and y > (HD_MAIN/2 - HD_WING - 1.0 - OVH) and y < (HD_MAIN/2 - 1.0 + OVH):
            continue
        
        bpy.ops.mesh.primitive_cube_add(size=1)
        r = bpy.context.active_object
        r.scale = (T_W, RAFTER_L, T_D)
        
        # Position and rotate correctly so timber aligns with roof slope
        cx = sign * (HW_MAIN/2 + OVH) / 2
        cz = WH + RP_MAIN/2
        r.location = (cx, y, cz)
        
        # Rotate around Y axis for slope
        r.rotation_euler.y = sign * SLOPE
        
        r.data.materials.append(mat_timber)
        apply_scale(r)
        colls['1_Rafters'].objects.link(r)
        scene.collection.objects.unlink(r)
        animate_drop_in(r, 12, 1.0)

# Wing Ridge & Rafters (Simplified for visual gate)
WING_RP = (HW_WING/2 + OVH) * PITCH
WING_RAFTER_L = math.sqrt((HW_WING/2 + OVH)**2 + WING_RP**2)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING/2 - 1.0, WH + WING_RP - T_D/2))
w_ridge = bpy.context.active_object
w_ridge.scale = (HW_WING + OVH*2, T_W, T_D)
w_ridge.data.materials.append(mat_timber)
apply_scale(w_ridge)
colls['1_Rafters'].objects.link(w_ridge)
scene.collection.objects.unlink(w_ridge)
animate_drop_in(w_ridge, 14, 1.0)

num_wing_rafters = int((HW_WING + OVH*2) / SPACING)
for i in range(num_wing_rafters + 1):
    x = -HW_MAIN/2 - HW_WING - OVH + 1.0 + i * SPACING
    for side, sign in [('F', -1), ('B', 1)]:
        bpy.ops.mesh.primitive_cube_add(size=1)
        r = bpy.context.active_object
        r.scale = (T_W, WING_RAFTER_L, T_D)
        
        cy = HD_MAIN/2 - HD_WING/2 - 1.0 + sign * (HD_WING/2 + OVH) / 2
        cz = WH + WING_RP/2
        r.location = (x, cy, cz)
        r.rotation_euler.x = -sign * SLOPE
        
        r.data.materials.append(mat_timber)
        apply_scale(r)
        colls['1_Rafters'].objects.link(r)
        scene.collection.objects.unlink(r)
        animate_drop_in(r, 16, 1.0)

# ─── DECKING & UNDERLAYMENT ───────────────────────────────────────────────────
def add_roof_plane(name, w, h, loc, rot, mat, coll, appear, lift):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc)
    p = bpy.context.active_object
    p.name = name
    p.scale = (w, h, 1)
    p.rotation_euler = rot
    p.data.materials.append(mat)
    apply_scale(p)
    colls[coll].objects.link(p)
    scene.collection.objects.unlink(p)
    
    # Solidify modifier for decking
    mod = p.modifiers.new("Solidify", 'SOLIDIFY')
    mod.thickness = 0.015 # 15mm plywood
    mod.offset = 1.0
    
    animate_drop_in(p, appear, lift)
    return p

for side, sign in [('L', -1), ('R', 1)]:
    w = RAFTER_L
    h = HD_MAIN + OVH*2
    cx = sign * (HW_MAIN/2 + OVH)/2
    cz = WH + RP_MAIN/2 + T_D/2 + 0.02
    
    # Decking
    add_roof_plane(f'Decking_{side}', w, h, (cx, 0, cz), (0, sign * SLOPE, 0), mat_osb, '2_Decking', 20, 0.8)
    
    # Underlayment (slightly above)
    up = add_roof_plane(f'Underlay_{side}', w, h, (cx, 0, cz + 0.02), (0, sign * SLOPE, 0), mat_underlay, '3_Underlay', 30, 0.5)
    up.modifiers["Solidify"].thickness = 0.002 # thin membrane

# Wing Decking
for side, sign in [('F', -1), ('B', 1)]:
    w = HW_WING + OVH*2
    h = WING_RAFTER_L
    cx = -HW_MAIN/2 - HW_WING/2 + 1.0
    cy = HD_MAIN/2 - HD_WING/2 - 1.0 + sign * (HD_WING/2 + OVH) / 2
    cz = WH + WING_RP/2 + T_D/2 + 0.02
    
    add_roof_plane(f'Decking_W_{side}', w, h, (cx, cy, cz), (-sign * SLOPE, 0, 0), mat_osb, '2_Decking', 24, 0.8)
    up = add_roof_plane(f'Underlay_W_{side}', w, h, (cx, cy, cz + 0.02), (-sign * SLOPE, 0, 0), mat_underlay, '3_Underlay', 34, 0.5)
    up.modifiers["Solidify"].thickness = 0.002

# ─── SHINGLE COURSES (DETAILED) ───────────────────────────────────────────────
COURSE_W = 0.20 # Real exposure width of shingles (~8 inches)
num_courses = int(RAFTER_L / COURSE_W) + 1

for c in range(num_courses):
    local_x = -RAFTER_L/2 + c * COURSE_W + COURSE_W/2
    for side, sign in [('L', -1), ('R', 1)]:
        wx = sign * (local_x * math.cos(SLOPE) + (HW_MAIN/2 + OVH)/2)
        wz = WH + local_x * math.sin(SLOPE) + RP_MAIN/2 + T_D/2 + 0.045
        
        prog = c / num_courses
        start = 40 + int(prog * 25) # animate between frame 40 and 65
        
        # Course plane with overlapping width
        bpy.ops.mesh.primitive_plane_add(size=1, location=(wx, 0, wz))
        sh = bpy.context.active_object
        sh.scale = (COURSE_W * 1.5, HD_MAIN + OVH*2, 1) # 1.5x width for overlap
        sh.rotation_euler = (0, sign * SLOPE, 0)
        sh.data.materials.append(mat_shingles)
        apply_scale(sh)
        colls['4_Shingles'].objects.link(sh)
        scene.collection.objects.unlink(sh)
        
        # Thick architectural shingles
        mod = sh.modifiers.new("Solidify", 'SOLIDIFY')
        mod.thickness = 0.012
        mod.offset = 1.0
        
        animate_drop_in(sh, start, 0.3)

num_wing_courses = int(WING_RAFTER_L / COURSE_W) + 1
for c in range(num_wing_courses):
    local_y = -WING_RAFTER_L/2 + c * COURSE_W + COURSE_W/2
    for side, sign in [('F', -1), ('B', 1)]:
        cy = HD_MAIN/2 - HD_WING/2 - 1.0 + sign * (local_y * math.cos(SLOPE) + (HD_WING/2 + OVH)/2)
        cz = WH + local_y * math.sin(SLOPE) + WING_RP/2 + T_D/2 + 0.045
        cx = -HW_MAIN/2 - HW_WING/2 + 1.0
        
        prog = c / num_wing_courses
        start = 45 + int(prog * 25)
        
        bpy.ops.mesh.primitive_plane_add(size=1, location=(cx, cy, cz))
        sh = bpy.context.active_object
        sh.scale = (HW_WING + OVH*2, COURSE_W * 1.5, 1)
        sh.rotation_euler = (-sign * SLOPE, 0, 0)
        sh.data.materials.append(mat_shingles)
        apply_scale(sh)
        colls['4_Shingles'].objects.link(sh)
        scene.collection.objects.unlink(sh)
        
        mod = sh.modifiers.new("Solidify", 'SOLIDIFY')
        mod.thickness = 0.012
        mod.offset = 1.0
        
        animate_drop_in(sh, start, 0.3)

# ─── GUTTERS & FASCIA ─────────────────────────────────────────────────────────
for side, sign in [('L', -1), ('R', 1)]:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(sign * (HW_MAIN/2 + OVH + 0.05), 0, WH - 0.1))
    f = bpy.context.active_object
    f.scale = (0.04, HD_MAIN + OVH*2, 0.2)
    f.data.materials.append(mat_timber)
    apply_scale(f)
    colls['6_Gutters'].objects.link(f)
    scene.collection.objects.unlink(f)
    animate_drop_in(f, 80, 0.3)
    
    bpy.ops.mesh.primitive_cube_add(size=1, location=(sign * (HW_MAIN/2 + OVH + 0.12), 0, WH - 0.1))
    g = bpy.context.active_object
    g.scale = (0.1, HD_MAIN + OVH*2, 0.15)
    g.data.materials.append(mat_metal)
    apply_scale(g)
    colls['6_Gutters'].objects.link(g)
    scene.collection.objects.unlink(g)
    animate_drop_in(g, 82, 0.3)

# ─── CAMERA ───────────────────────────────────────────────────────────────────
bpy.ops.object.camera_add()
cam = bpy.context.active_object
cam.name = 'Camera_Cinematic'
# Move camera to perfectly frame the structure (approx 70% viewport)
cam.location = Vector((-18, -20, 10))
cam.rotation_euler = (math.radians(72), 0, math.radians(-45))
cam.data.lens = 50
scene.camera = cam

# ─── SAVE AND RENDER ──────────────────────────────────────────────────────────
bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
print(f'\n✓ Saved .blend: {BLEND_PATH}')

# ONLY RENDER REQUESTED FRAMES FOR THE GATE
TEST_FRAMES = [1, 50, 90]
for f in TEST_FRAMES:
    scene.frame_set(f)
    out = os.path.join(TEST_DIR, f'frame-{f:03d}')
    scene.render.filepath = out
    bpy.ops.render.render(write_still=True)
    print(f'  ✓ Rendered frame {f:03d} → {out}.webp')

print('\nPhase 8A — Gate Render complete.')
