"""
Ideal Solutions — Phase 8A Visual Fidelity Test
build_hero_renders.py

Generates two static hero renders (Exposed Structure & Finished House).
Focuses entirely on architectural realism, lighting, and material fidelity.
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
BLEND_PATH   = os.path.join(SCRIPT_DIR, 'IdealSolutions_HeroRenders.blend')
os.makedirs(TEST_DIR, exist_ok=True)

# ─── SCENE INIT ───────────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = 'IdealSolutions_HeroRenders'

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 128
scene.cycles.use_denoising = True
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.quality = 95

# Photographic color management
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - High Contrast'
scene.view_settings.exposure = -0.3

# ─── HELPERS ──────────────────────────────────────────────────────────────────
def find_map(cat_dir, *keywords):
    if not os.path.isdir(cat_dir): return None
    for f in sorted(os.listdir(cat_dir)):
        fl = f.lower()
        if not fl.endswith(('.jpg', '.jpeg', '.png', '.exr', '.hdr')): continue
        for kw in keywords:
            if kw in fl: return os.path.join(cat_dir, f)
    return None

def load_img(path, color_space='sRGB'):
    if not path: return None
    img = bpy.data.images.load(path)
    cs = {'Linear': 'Linear Rec.709', 'sRGB': 'sRGB', 'Non-Color': 'Non-Color'}.get(color_space, color_space)
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

    tc = nodes.new('ShaderNodeTexCoord')
    mp = nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (scale, scale, scale)
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

    c_path = find_map(os.path.join(ASSETS_DIR, cat), 'color', 'col', 'diff')
    r_path = find_map(os.path.join(ASSETS_DIR, cat), 'roughness', 'rough')
    n_path = find_map(os.path.join(ASSETS_DIR, cat), 'normal', 'nor')

    ct = tex_node(c_path, 'sRGB', -800, 200)
    rt = tex_node(r_path, 'Non-Color', -800, 0)
    nt = tex_node(n_path, 'Non-Color', -800, -200)

    if ct: links.new(ct.outputs['Color'], bsdf.inputs['Base Color'])
    if rt: links.new(rt.outputs['Color'], bsdf.inputs['Roughness'])
    if nt:
        nm = nodes.new('ShaderNodeNormalMap')
        nm.location = (-400, -200)
        links.new(nt.outputs['Color'], nm.inputs['Color'])
        links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])

    return mat

def apply_scale(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.select_set(False)

def create_box(name, scale, loc, mat, coll, hide=False):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    if mat: obj.data.materials.append(mat)
    apply_scale(obj)
    
    # Smooth edges slightly to catch highlights (realism)
    bpy.ops.object.modifier_add(type='BEVEL')
    obj.modifiers["Bevel"].width = 0.005
    obj.modifiers["Bevel"].segments = 2
    
    if obj.name in scene.collection.objects:
        scene.collection.objects.unlink(obj)
    coll.objects.link(obj)
    
    if hide:
        obj.hide_render = True
        obj.hide_viewport = True
    return obj

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
    # Rotate HDRI for good ambient light direction
    w_mp.inputs['Rotation'].default_value = (0, 0, math.radians(140))
    w_links.new(w_tc.outputs['Generated'], w_mp.inputs['Vector'])
    w_links.new(w_mp.outputs['Vector'], w_env.inputs['Vector'])
    w_links.new(w_env.outputs['Color'], w_bg.inputs['Color'])
    w_bg.inputs['Strength'].default_value = 1.0

# Dramatic architectural sunlight
bpy.ops.object.light_add(type='SUN')
sun = bpy.context.active_object
sun.rotation_euler = (math.radians(50), math.radians(20), math.radians(-60))
sun.data.energy = 2.5
sun.data.angle = math.radians(1.5)

# ─── MATERIALS ────────────────────────────────────────────────────────────────
mat_wall     = pbr_material('Wall_Mat',     'house',       scale=0.5)
mat_timber   = pbr_material('Timber_Mat',   'timber',      scale=0.6) # Tighter scale for grain
mat_osb      = pbr_material('OSB_Mat',      'osb',         scale=0.3)
mat_underlay = pbr_material('Underlay_Mat', 'underlayment',scale=1.0)
mat_shingles = pbr_material('Shingles_Mat', 'shingles',    scale=0.8) # Asphalt granule scale
mat_metal    = pbr_material('Metal_Mat',    'metal',       scale=1.0, metallic=0.9)

# Dark architectural glass
mat_glass = bpy.data.materials.new(name="Glass")
mat_glass.use_nodes = True
mat_glass.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.01, 0.01, 0.01, 1)
mat_glass.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.05
mat_glass.node_tree.nodes['Principled BSDF'].inputs['Metallic'].default_value = 0.9

# Grass/Ground
mat_ground = bpy.data.materials.new(name="Ground")
mat_ground.use_nodes = True
mat_ground.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.08, 0.1, 0.06, 1)
mat_ground.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.9

# ─── COLLECTIONS ──────────────────────────────────────────────────────────────
coll_base = bpy.data.collections.new('1_Base')
coll_roof = bpy.data.collections.new('2_FinishedRoof')
scene.collection.children.link(coll_base)
scene.collection.children.link(coll_roof)

# ─── BASE ARCHITECTURE ────────────────────────────────────────────────────────
# Ground
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -0.05))
ground = bpy.context.active_object
ground.data.materials.append(mat_ground)
if ground.name in scene.collection.objects: scene.collection.objects.unlink(ground)
coll_base.objects.link(ground)

# L-Shaped House Dimensions
WH = 3.0    # Wall Height
HW_MAIN = 8.0  
HD_MAIN = 12.0 
HW_WING = 6.0   
HD_WING = 6.0   
OVH = 0.6   # Roof overhang
PITCH = 6.0 / 12.0
RP_MAIN = (HW_MAIN / 2 + OVH) * PITCH

# Main Walls
create_box('Wall_Main', (HW_MAIN, HD_MAIN, WH), (0, 0, WH/2), mat_wall, coll_base)

# Side Wing
create_box('Wall_Wing', (HW_WING, HD_WING, WH), (-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING/2 - 1.0, WH/2), mat_wall, coll_base)

# Architectural Windows (Frames with inset glass)
def add_window(loc, w, h, d):
    frame = create_box('Win_Frame', (w, d, h), loc, mat_metal, coll_base)
    glass = create_box('Win_Glass', (w - 0.15, d - 0.05, h - 0.15), loc, mat_glass, coll_base)

# Front Door & Windows
add_window((2.0, -HD_MAIN/2, 1.2), 1.2, 1.8, 0.25)
add_window((-2.0, -HD_MAIN/2, 1.2), 1.2, 1.8, 0.25)
add_window((-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING - 1.0, 1.2), 2.4, 0.25, 1.8)
add_window((0, -HD_MAIN/2, 1.2), 1.6, 2.4, 0.2) # Door

# ─── REAL ROOF FRAMING (EXPOSED TIMBER) ───────────────────────────────────────
T_W = 0.038  # 1.5"
T_D = 0.184  # 7.25"
SPACING = 0.609 # 24" O.C.

RAFTER_L = math.sqrt((HW_MAIN/2 + OVH)**2 + RP_MAIN**2)
SLOPE = math.atan(PITCH)

# Main Ridge Board
create_box('Ridge_Main', (T_W, HD_MAIN + OVH*2, T_D), (0, 0, WH + RP_MAIN - T_D/2), mat_timber, coll_base)

# Common Rafters
num_main_rafters = int((HD_MAIN + OVH*2) / SPACING)
for i in range(num_main_rafters + 1):
    y = -HD_MAIN/2 - OVH + i * SPACING
    for side, sign in [('L', -1), ('R', 1)]:
        if side == 'L' and y > (HD_MAIN/2 - HD_WING - 1.0 - OVH) and y < (HD_MAIN/2 - 1.0 + OVH):
            continue
        cx = sign * (HW_MAIN/2 + OVH) / 2
        cz = WH + RP_MAIN/2
        r = create_box(f'Rafter_{i}_{side}', (T_W, RAFTER_L, T_D), (cx, y, cz), mat_timber, coll_base)
        r.rotation_euler.y = sign * SLOPE

# Wing Ridge
WING_RP = (HW_WING/2 + OVH) * PITCH
WING_RAFTER_L = math.sqrt((HW_WING/2 + OVH)**2 + WING_RP**2)
create_box('Ridge_Wing', (HW_WING + OVH*2, T_W, T_D), (-HW_MAIN/2 - HW_WING/2 + 1.0, HD_MAIN/2 - HD_WING/2 - 1.0, WH + WING_RP - T_D/2), mat_timber, coll_base)

# Wing Rafters
num_wing_rafters = int((HW_WING + OVH*2) / SPACING)
for i in range(num_wing_rafters + 1):
    x = -HW_MAIN/2 - HW_WING - OVH + 1.0 + i * SPACING
    for side, sign in [('F', -1), ('B', 1)]:
        cy = HD_MAIN/2 - HD_WING/2 - 1.0 + sign * (HD_WING/2 + OVH) / 2
        cz = WH + WING_RP/2
        r = create_box(f'Rafter_W_{i}_{side}', (T_W, WING_RAFTER_L, T_D), (x, cy, cz), mat_timber, coll_base)
        r.rotation_euler.x = -sign * SLOPE

# Fascia Boards
create_box('Fascia_L', (T_W, HD_MAIN + OVH*2, T_D), (-HW_MAIN/2 - OVH, 0, WH - 0.05), mat_timber, coll_base)
create_box('Fascia_R', (T_W, HD_MAIN + OVH*2, T_D), (HW_MAIN/2 + OVH, 0, WH - 0.05), mat_timber, coll_base)

# ─── FINISHED ROOF (DECKING, UNDERLAYMENT, SHINGLES) ──────────────────────────
# We group these in coll_roof so we can hide/show them for the two hero states.

def build_shingled_plane(name, w, h, loc, rot, coll):
    # 1. Decking
    deck = create_box(f'{name}_Deck', (w, h, 0.015), loc, mat_osb, coll)
    deck.rotation_euler = rot
    
    # 2. Underlayment (thin plane directly on top)
    ul_loc = (loc[0], loc[1], loc[2] + 0.01)
    ul = create_box(f'{name}_UL', (w, h, 0.002), ul_loc, mat_underlay, coll)
    ul.rotation_euler = rot
    
    # 3. Shingle Courses (The Hero Feature)
    COURSE_H = 0.25 # 10 inches exposure
    num_courses = int(w / COURSE_H) + 1 if rot[1] != 0 else int(h / COURSE_H) + 1
    
    for c in range(num_courses):
        # We need overlapping strips working their way up the slope
        # This requires calculating the local offset along the slope
        
        offset_dist = -w/2 + c * COURSE_H + COURSE_H/2 if rot[1] != 0 else -h/2 + c * COURSE_H + COURSE_H/2
        
        if rot[1] != 0: # Main roof (sloped along X)
            sign = 1 if rot[1] > 0 else -1
            sw = COURSE_H * 1.5 # Overlapping width
            sx = loc[0] + sign * offset_dist * math.cos(SLOPE)
            sz = loc[2] + 0.015 + offset_dist * math.sin(SLOPE)
            sh_loc = (sx, loc[1], sz)
            sh_dim = (sw, h, 0.01) # Thick asphalt geometry
        else: # Wing roof (sloped along Y)
            sign = 1 if rot[0] < 0 else -1
            sh = COURSE_H * 1.5
            sy = loc[1] + sign * offset_dist * math.cos(SLOPE)
            sz = loc[2] + 0.015 + offset_dist * math.sin(SLOPE)
            sh_loc = (loc[0], sy, sz)
            sh_dim = (w, sh, 0.01)
            
        shingle = create_box(f'{name}_Shingle_{c}', sh_dim, sh_loc, mat_shingles, coll)
        shingle.rotation_euler = rot
        
        # Add bevel for highlight on the shingle edge
        bpy.ops.object.modifier_add(type='BEVEL')
        shingle.modifiers["Bevel"].width = 0.003
        shingle.modifiers["Bevel"].segments = 2

# Main roof planes
cz = WH + RP_MAIN/2 + T_D/2 + 0.01
build_shingled_plane('Main_L', RAFTER_L, HD_MAIN + OVH*2, (-(HW_MAIN/2 + OVH)/2, 0, cz), (0, -SLOPE, 0), coll_roof)
build_shingled_plane('Main_R', RAFTER_L, HD_MAIN + OVH*2, ((HW_MAIN/2 + OVH)/2, 0, cz), (0, SLOPE, 0), coll_roof)

# Wing roof planes
cz_w = WH + WING_RP/2 + T_D/2 + 0.01
cx_w = -HW_MAIN/2 - HW_WING/2 + 1.0
build_shingled_plane('Wing_F', HW_WING + OVH*2, WING_RAFTER_L, (cx_w, HD_MAIN/2 - HD_WING/2 - 1.0 - (HD_WING/2 + OVH)/2, cz_w), (SLOPE, 0, 0), coll_roof)
build_shingled_plane('Wing_B', HW_WING + OVH*2, WING_RAFTER_L, (cx_w, HD_MAIN/2 - HD_WING/2 - 1.0 + (HD_WING/2 + OVH)/2, cz_w), (-SLOPE, 0, 0), coll_roof)

# Flashing / Ridge Caps
create_box('RidgeCap', (0.3, HD_MAIN + OVH*2, 0.05), (0, 0, WH + RP_MAIN + T_D/2 + 0.05), mat_shingles, coll_roof)

# Gutters
create_box('Gutter_L', (0.1, HD_MAIN + OVH*2, 0.15), (-(HW_MAIN/2 + OVH + 0.1), 0, WH - 0.1), mat_metal, coll_roof)
create_box('Gutter_R', (0.1, HD_MAIN + OVH*2, 0.15), ((HW_MAIN/2 + OVH + 0.1), 0, WH - 0.1), mat_metal, coll_roof)

# ─── CAMERA ───────────────────────────────────────────────────────────────────
bpy.ops.object.camera_add()
cam = bpy.context.active_object
cam.name = 'Camera_Cinematic'
cam.location = Vector((-18, -20, 11))
cam.rotation_euler = (math.radians(72), 0, math.radians(-45))
cam.data.lens = 45 # Slightly wider to capture the dramatic rooflines
scene.camera = cam

# ─── SAVE AND RENDER ──────────────────────────────────────────────────────────
bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
print(f'\n✓ Saved .blend: {BLEND_PATH}')

# 1. RENDER EXPOSED HERO (Hide finished roof collection)
coll_roof.hide_render = True
coll_roof.hide_viewport = True
out_exposed = os.path.join(TEST_DIR, 'hero_exposed')
scene.render.filepath = out_exposed
bpy.ops.render.render(write_still=True)
print(f'  ✓ Rendered Exposed Hero → {out_exposed}.webp')

# 2. RENDER FINISHED HERO (Show finished roof collection)
coll_roof.hide_render = False
coll_roof.hide_viewport = False
out_finished = os.path.join(TEST_DIR, 'hero_finished')
scene.render.filepath = out_finished
bpy.ops.render.render(write_still=True)
print(f'  ✓ Rendered Finished Hero → {out_finished}.webp')

print('\nPhase 8A — Hero Render complete.')
