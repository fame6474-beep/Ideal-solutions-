"""
Ideal Solutions — Phase 8A Asset Validation Pipeline
validate_asset.py

Usage:
Detects an external architectural model (.blend, .fbx, .obj) in the assets/3d directory,
imports it into a clean scene with the project's HDRI and Camera, and generates a 960x540 preview render.
Also outputs asset metadata (poly count, materials) for the visual quality gate review.
"""

import bpy
import os
import math
from mathutils import Vector

# ─── PATHS ────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR  = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
ASSETS_DIR   = os.path.join(PROJECT_DIR, 'assets', '3d')
TEST_DIR     = os.path.join(PROJECT_DIR, 'public', 'images', 'construction', 'test')
BLEND_PATH   = os.path.join(SCRIPT_DIR, 'IdealSolutions_AssetValidation.blend')
os.makedirs(TEST_DIR, exist_ok=True)

# ─── SCENE INIT ───────────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = 'IdealSolutions_AssetValidation'

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 64
scene.cycles.use_denoising = True
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.quality = 90

scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - High Contrast'
scene.view_settings.exposure = 0.0

# ─── ENVIRONMENT (HDRI) ───────────────────────────────────────────────────────
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
    try:
        w_env.image.colorspace_settings.name = 'Linear Rec.709'
    except TypeError:
        pass
    w_links.new(w_env.outputs['Color'], w_bg.inputs['Color'])
    w_bg.inputs['Strength'].default_value = 1.0

# ─── CAMERA ───────────────────────────────────────────────────────────────────
bpy.ops.object.camera_add()
cam = bpy.context.active_object
cam.name = 'Camera_Cinematic'
# Default cinematic angle (will likely need tuning per-model bounds)
cam.location = Vector((-18, -20, 10))
cam.rotation_euler = (math.radians(72), 0, math.radians(-45))
cam.data.lens = 50
scene.camera = cam

# ─── ASSET DETECTION & IMPORT ─────────────────────────────────────────────────
print("\n--- ASSET VALIDATION START ---")
target_model = None
model_ext = None

for f in os.listdir(ASSETS_DIR):
    if f.lower().endswith(('.blend', '.fbx', '.obj')) and 'IdealSolutions' not in f:
        target_model = os.path.join(ASSETS_DIR, f)
        model_ext = f.lower().split('.')[-1]
        break

if not target_model:
    print("ERROR: No suitable .blend, .fbx, or .obj architectural asset found in assets/3d/")
    import sys
    sys.exit(1)

print(f"Detecting Asset: {target_model}")

# Import based on format
if model_ext == 'obj':
    bpy.ops.import_scene.obj(filepath=target_model)
elif model_ext == 'fbx':
    bpy.ops.import_scene.fbx(filepath=target_model)
elif model_ext == 'blend':
    # Link/Append collections from the blend file
    with bpy.data.libraries.load(target_model, link=False) as (data_from, data_to):
        data_to.objects = data_from.objects
    for obj in data_to.objects:
        if obj is not None:
            scene.collection.objects.link(obj)

# ─── METADATA EXTRACTION ──────────────────────────────────────────────────────
total_polys = 0
materials = set()
objects = 0

for obj in scene.objects:
    if obj.type == 'MESH':
        objects += 1
        total_polys += len(obj.data.polygons)
        for slot in obj.material_slots:
            if slot.material:
                materials.add(slot.material.name)

print("\n--- ASSET METADATA ---")
print(f"Filename: {os.path.basename(target_model)}")
print(f"Total Mesh Objects: {objects}")
print(f"Total Polygons: {total_polys:,}")
print(f"Total Materials: {len(materials)}")
print("Materials List:")
for m in list(materials)[:10]:
    print(f"  - {m}")
if len(materials) > 10:
    print(f"  ... and {len(materials) - 10} more.")

# ─── AUTO-FRAME CAMERA ────────────────────────────────────────────────────────
# Try to loosely frame the imported geometry
bpy.ops.object.select_all(action='SELECT')
bpy.context.view_layer.objects.active = cam
# We can't trivially auto-frame a complex scene perfectly without context,
# but we will try to make sure it's visible.

# ─── SAVE AND RENDER ──────────────────────────────────────────────────────────
bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
out = os.path.join(TEST_DIR, 'hero_asset_preview')
scene.render.filepath = out
print("\nRendering 960x540 preview...")
bpy.ops.render.render(write_still=True)
print(f"✓ Saved Preview: {out}.webp")
print("--- ASSET VALIDATION COMPLETE ---\n")
