import bpy
import bmesh
import os
import math
from mathutils import Vector

# --- CONFIGURATION ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
ASSETS_DIR = os.path.join(PROJECT_DIR, 'assets', '3d')
OUT_DIR = os.path.join(PROJECT_DIR, 'public', 'images', 'construction', 'test')
os.makedirs(OUT_DIR, exist_ok=True)
HERO_OUT = os.path.join(OUT_DIR, 'hero-preview.webp')

# Clean scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 128
scene.cycles.use_denoising = True
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.image_settings.file_format = 'WEBP'

# --- PBR MATERIAL HELPER ---
def load_pbr_material(name, folder_name, scale=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")
    
    tex_coord = nodes.new('ShaderNodeTexCoord')
    mapping = nodes.new('ShaderNodeMapping')
    mapping.inputs['Scale'].default_value = (scale, scale, scale)
    links.new(tex_coord.outputs['Generated'], mapping.inputs['Vector']) # Use Generated for Box Mapping
    
    folder_path = os.path.join(ASSETS_DIR, folder_name)
    if os.path.exists(folder_path):
        for f in os.listdir(folder_path):
            img_path = os.path.join(folder_path, f)
            if 'Color' in f:
                tex = nodes.new('ShaderNodeTexImage')
                tex.image = bpy.data.images.load(img_path)
                tex.projection = 'BOX'
                tex.projection_blend = 0.2
                links.new(mapping.outputs['Vector'], tex.inputs['Vector'])
                links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
            elif 'Roughness' in f:
                tex = nodes.new('ShaderNodeTexImage')
                tex.image = bpy.data.images.load(img_path)
                tex.image.colorspace_settings.name = 'Non-Color'
                tex.projection = 'BOX'
                tex.projection_blend = 0.2
                links.new(mapping.outputs['Vector'], tex.inputs['Vector'])
                links.new(tex.outputs['Color'], bsdf.inputs['Roughness'])
            elif 'Normal' in f:
                tex = nodes.new('ShaderNodeTexImage')
                tex.image = bpy.data.images.load(img_path)
                tex.image.colorspace_settings.name = 'Non-Color'
                tex.projection = 'BOX'
                tex.projection_blend = 0.2
                normal_map = nodes.new('ShaderNodeNormalMap')
                links.new(mapping.outputs['Vector'], tex.inputs['Vector'])
                links.new(tex.outputs['Color'], normal_map.inputs['Color'])
                links.new(normal_map.outputs['Normal'], bsdf.inputs['Normal'])
    return mat

mat_stucco = load_pbr_material("Stucco", "house", scale=2.0)
mat_wood = load_pbr_material("WoodSiding", "timber", scale=1.5)
mat_shingle = load_pbr_material("Shingles", "shingles", scale=4.0)
mat_metal = load_pbr_material("Metal", "metal", scale=1.0)
mat_osb = load_pbr_material("OSB", "osb", scale=2.0)
mat_underlay = load_pbr_material("Underlayment", "underlayment", scale=2.0)

mat_glass = bpy.data.materials.new(name="Glass")
mat_glass.use_nodes = True
bsdf_glass = mat_glass.node_tree.nodes.get("Principled BSDF")
bsdf_glass.inputs['Base Color'].default_value = (0.01, 0.01, 0.01, 1)
bsdf_glass.inputs['Roughness'].default_value = 0.1
bsdf_glass.inputs['Metallic'].default_value = 0.9 # Dark reflective glass

# --- GEOMETRY: HOUSE BASE ---
bm = bmesh.new()
verts = [
    bm.verts.new((-7, -3, 0)),
    bm.verts.new(( 7, -3, 0)),
    bm.verts.new(( 7, -7, 0)),
    bm.verts.new(( 11, -7, 0)),
    bm.verts.new(( 11, 7, 0)),
    bm.verts.new((-7, 7, 0))
]
face = bm.faces.new(verts)
geom = bmesh.ops.extrude_face_region(bm, geom=[face])
for v in geom['geom']:
    if isinstance(v, bmesh.types.BMVert):
        v.co.z = 6.0

mesh_base = bpy.data.meshes.new("House_Structural_Base")
bm.to_mesh(mesh_base)
bm.free()
base = bpy.data.objects.new("House_Structural_Base", mesh_base)
bpy.context.collection.objects.link(base)
base.data.materials.append(mat_stucco)

# Add Windows (cut holes and add glass panes)
def create_window(x, y, z, sx, sy, sz):
    # The cutter
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    cutter = bpy.context.active_object
    cutter.scale = (sx, sy, sz)
    cutter.hide_render = True
    cutter.display_type = 'WIRE'
    
    # Boolean on base
    mod = base.modifiers.new(name="Win", type='BOOLEAN')
    mod.object = cutter
    mod.operation = 'DIFFERENCE'
    
    # The actual glass plane inside the hole
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))
    glass = bpy.context.active_object
    glass.scale = (sx*0.9, sy*0.1 if sy > sx else sx*0.1, sz*0.9)
    glass.data.materials.append(mat_glass)

create_window(-3, -3, 1.5, 2, 0.5, 2)
create_window(3, -3, 1.5, 2, 0.5, 2)
create_window(9, -7, 1.5, 2, 0.5, 2)
create_window(-3, -3, 4.5, 2, 0.5, 1.5) # Upper floor
create_window(3, -3, 4.5, 2, 0.5, 1.5)
create_window(9, -7, 4.5, 2, 0.5, 1.5)

# --- GEOMETRY: ROOF ---
bm_roof = bmesh.new()
overhang = 0.8
z_base = 6.0
z_ridge = 9.5

p_bl = Vector((-7 - overhang, -3 - overhang, z_base))
p_bc = Vector(( 7 - overhang, -3 - overhang, z_base))
p_cl = Vector(( 7 - overhang, -7 - overhang, z_base))
p_cr = Vector(( 11 + overhang, -7 - overhang, z_base))
p_tr = Vector(( 11 + overhang, 7 + overhang, z_base))
p_tl = Vector((-7 - overhang, 7 + overhang, z_base))
p_in = Vector(( 7 + overhang, -3 + overhang, z_base)) # inner corner

r_main_l = Vector((-7 + 3, 2, z_ridge))
r_main_r = Vector(( 11 - 3, 2, z_ridge))
r_wing = Vector(( 9, -7 + 3, z_ridge))
r_intersect = Vector((9, 2, z_ridge))

v_bl = bm_roof.verts.new(p_bl)
v_bc = bm_roof.verts.new(p_bc)
v_cl = bm_roof.verts.new(p_cl)
v_cr = bm_roof.verts.new(p_cr)
v_tr = bm_roof.verts.new(p_tr)
v_tl = bm_roof.verts.new(p_tl)
v_in = bm_roof.verts.new(p_in)
v_rml = bm_roof.verts.new(r_main_l)
v_rmr = bm_roof.verts.new(r_main_r)
v_rw = bm_roof.verts.new(r_wing)
v_ri = bm_roof.verts.new(r_intersect)

bm_roof.faces.new((v_tl, v_rml, v_ri, v_tr))
bm_roof.faces.new((v_bl, v_bc, v_in, v_rml))
bm_roof.faces.new((v_tl, v_bl, v_rml))
bm_roof.faces.new((v_in, v_cl, v_rw, v_ri))
bm_roof.faces.new((v_cl, v_cr, v_rw))
bm_roof.faces.new((v_cr, v_tr, v_ri, v_rw))

mesh_roof = bpy.data.meshes.new("Roof_Base_Planes")
bm_roof.to_mesh(mesh_roof)
bm_roof.free()

def create_roof_layer(name, material, thickness, offset):
    obj = bpy.data.objects.new(name, mesh_roof.copy())
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    mod = obj.modifiers.new(name="Solidify", type='SOLIDIFY')
    mod.thickness = thickness
    mod.offset = offset
    return obj

roof_deck = create_roof_layer("Roof_Decking", mat_osb, 0.05, 1)
roof_underlay = create_roof_layer("Roof_Underlayment", mat_underlay, 0.01, 1)
roof_underlay.modifiers["Solidify"].thickness = 0.06
roof_shingles = create_roof_layer("Roof_Shingles", mat_shingle, 0.02, 1)
roof_shingles.modifiers["Solidify"].thickness = 0.08

# Fascia
bpy.ops.mesh.primitive_cube_add(size=1)
fascia = bpy.context.active_object
fascia.name = "Fascia"
fascia.data = mesh_roof.copy()
mod = fascia.modifiers.new(name="Wireframe", type='WIREFRAME')
mod.thickness = 0.15
mod.use_boundary = True
mod.use_replace = True
fascia.data.materials.append(mat_wood)

# Gutters
bpy.ops.mesh.primitive_cube_add(size=1)
gutters = bpy.context.active_object
gutters.name = "Gutters"
gutters.data = mesh_roof.copy()
mod2 = gutters.modifiers.new(name="Wireframe", type='WIREFRAME')
mod2.thickness = 0.08
mod2.offset = 2.0
gutters.data.materials.append(mat_metal)

# Chimney
bpy.ops.mesh.primitive_cube_add(size=1, location=(-3, 2, z_ridge + 1))
chimney = bpy.context.active_object
chimney.name = "Chimney"
chimney.scale = (1, 1.5, 3)
chimney.data.materials.append(mat_stucco)

# --- LIGHTING ---
world = bpy.data.worlds.new('World')
scene.world = world
try:
    world.use_nodes = True
except AttributeError:
    pass
w_nodes = world.node_tree.nodes
w_bg = w_nodes.new('ShaderNodeBackground')
w_out = w_nodes.new('ShaderNodeOutputWorld')
world.node_tree.links.new(w_bg.outputs['Background'], w_out.inputs['Surface'])

def find_map(cat_dir):
    if not os.path.isdir(cat_dir): return None
    for f in os.listdir(cat_dir):
        if f.lower().endswith(('.hdr', '.exr')):
            return os.path.join(cat_dir, f)
    return None

hdr_path = find_map(os.path.join(ASSETS_DIR, 'hdr'))
if hdr_path:
    w_env = w_nodes.new('ShaderNodeTexEnvironment')
    w_env.image = bpy.data.images.load(hdr_path)
    world.node_tree.links.new(w_env.outputs['Color'], w_bg.inputs['Color'])
    w_bg.inputs['Strength'].default_value = 1.0

# Bright Key Sun
bpy.ops.object.light_add(type='SUN', align='WORLD', location=(0, 0, 10))
sun = bpy.context.active_object
sun.data.energy = 5.0
sun.data.angle = math.radians(2.0)
sun.rotation_euler = (math.radians(45), math.radians(10), math.radians(130))

# Soft Fill Sun
bpy.ops.object.light_add(type='SUN', align='WORLD', location=(0, 0, 10))
fill = bpy.context.active_object
fill.data.energy = 1.0
fill.rotation_euler = (math.radians(60), math.radians(-10), math.radians(-50))

# --- CAMERA ---
bpy.ops.object.camera_add()
cam = bpy.context.active_object
cam.name = "Camera_Hero"
cam.data.lens = 50
cam.location = (-16, -24, 10)
cam.rotation_euler = (math.radians(75), 0, math.radians(-30))
scene.camera = cam

bpy.ops.object.empty_add(type='PLAIN_AXES', location=(2, 0, 4))
target = bpy.context.active_object
ttc = cam.constraints.new(type='TRACK_TO')
ttc.target = target
ttc.track_axis = 'TRACK_NEGATIVE_Z'
ttc.up_axis = 'UP_Y'

# --- RENDER ---
print(f"Rendering hero preview to {HERO_OUT}...")
scene.render.filepath = HERO_OUT
bpy.ops.render.render(write_still=True)
print("Hero preview rendered successfully.")
