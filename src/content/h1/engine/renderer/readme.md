---
title: Renderer
keywords:
  - render
thanks:
  Jakey, ConnorDawn: Renderer regressions
  gbMichelle: >-
    Researching how shadow maps work, extreme distance and particle limits
    testing
  Conscars: Extreme distance limits and detail objects testing
---
{% figure src="wireframe.jpg" %}
Using `rasterizer_wireframe 1` demonstrates Halo's portal-based occlusion culling.
{% /figure %}

The **renderer** or **rasterizer** is the system of [Halo's engine](~blam) responsible for drawing the scene to the screen. Each [ported edition](~h1) of Halo has a slightly different renderer in terms of how well it reproduces the classic Xbox appearance.

Gearbox-era Halo uses the DirectX 9 API and shader version 2.0, being an early adopter of programmable shaders. Since support in user hardware was not as widespread as today, the renderer can be configured with [arguments](~arguments#graphics-options) to use older shader versions or even [fixed function][ff] compatibility.

Current versions of H1A use DirectX 11 instead.

# Texture cache
Textures to be rendered are loaded in a texture cache in memory. When a texture must be drawn that is not in this cache, it will be loaded from a [map cache file](~maps) (possibly a shared resource map) or the [tags directory](~tags) depending on the [build type](~blam#build-types) of the engine. This is called a _cache miss_ and, because it takes some time to stream data, the engine may not render the desired effect. This is the reason why weapons will sometimes not produce projectile [decals](~decal) on the first impact.

The [predicted resources](~scenario#tag-field-predicted-resources) block seen in some tag classes are meant to give the engine a hint about what textures (and sounds) should be cached.

# Lighting
Halo's lighting engine benefits from the fact that there is no dynamic time of day. Most dynamic [lights](~light) are small. Similar to other games of the time, Halo uses "baked" global illumination in the form of [lightmaps](~). This lighting information is used on the environment ([BSP](~scenario_structure_bsp)) and encodes localized light directions and tinting to shade [objects](~object).

Dynamic shadows for moving objects like [units](~unit) and [items](~item) are rendered with 128x128 [shadow maps][shadow-mapping] at run-time. An object's _bounding radius_ field, not its _render bounding radius_, is used to calculate the physical width of the shadow canvas. If the bounding radius is too small, the shadow will be cut off.

# Limits
{% figure src="max-light-surfaces.jpg" %}
Dynamic lights cause parts of the BSP to be rendered in another pass, but only 4096 triangles per light. High-poly spaces may reach this limit.
{% /figure %}

Known renderer limits with the _unmodified_ game are:

* [Particle_system](~) particles: 256
* Non-particle system [particles](~particle): 512
* [Objects](~object): 256 (raised to 512 in H1A)
* Maximum dynamic [BSP triangles](~scenario_structure_bsp): 16k (raised to 32k in H1A) -- a BSP can have more triangles than this, but the rendered amount should be managed with portals.
* [Lights](~light): 128
* Surfaces per point light: 4096 -- limits how many triangles can be illuminated by a dynamic light (see figure)
* Surfaces per dynamic [object](~object) shadow: 4096 -- limits how many triangles can be shaded by dynamic object shadows (Highly unlikely scenario)

There are also [game state limits](~game-state#limits) which can appear like renderer limitations (eg. maximum simulated antennas).

Some client mods like [Chimera](~) can raise limits. See mod-specific documentation for details.

At large distances from the [origin][origin-wiki] (starting at approximately 1,000 world units), the effects of low 32-bit floating point precision become apparent in greater [z-fighting][z-fight-wiki] and jittering of moving vertices from the inability to represent small distances. The game is hard-coded to prevent the camera from moving outside of a 10,000-world unit cube centered at the origin (5,000 units along any axis). Game mechanics and mesh rendering begin to break down around 1 million world units.

# Gearbox regressions

{% figure src="glass-bug.jpg" %}
The glass shader with bump-mapped reflections renders incorrectly in Custom Edition.
{% /figure %}

When Halo was ported to PC by Gearbox in 2003 many visual bugs were introduced. Among the challenges were updating H1X's shaders and rendering code to work with DirectX 9 and unlocked framerates in an engine which previously assumed 30 FPS always. The renderer also needed to be adapted for the range of user hardware for the PC port.

_Most_ of these issues have now been corrected in DX11 renderer in MCC or by [Chimera](~) for Custom Edition.

* H1X's [shader_transparent_generic](~) tags were converted to [shader_transparent_chicago](~) (or extended) tags which are less sophisticated.
* The _detail after reflection_ flag of [shader_model](~) is working in reverse of how it should. Enabling the flag should cause detail maps to apply after specularity/cubemaps. The client mod [Chimera](~) has a built-in fix which is disabled for Halo Custom Edition (but enabled in Retail) except in the Vaporeon builds.
* The reflections of [projectile](~) _widgets_ like [light_volumes](~light_volume) in mirrored surfaces are misaligned. _Attachments_ like [contrails](~contrail) are not affected, nor are vehicle widgets. This works correctly on Xbox and MCC only.
* The [fog](~) screen layers effect for simulated volumetric fog does not render at all and fog planes do not render over the skybox.
* HUD shield meters are missing their flash effect when drained.
* Monochrome bitmaps and p8 bump map formats are unsupported.
* Custom Edition skips rendering some effects when they are not loaded yet, such as the engine lens flares in a10's intro or initial bullet hole decals. This is to prevent stuttering since some raw data must be loaded from map files if it is not already in the asset cache.
* Transparent shaders have a host of appearance and sorting problems:
  * Ripple map mipmaps for [shader_transparent_water](~shader_transparent_water#known-issues) are reversed, with smaller mipmaps being used at closer distances. MCC is not affected.
  * [shader_transparent_glass](~) which use bump maps use the wrong tag for cube map reflections in Custom Edition. They should use the shader's referenced cube map, but instead use the rasterizer _vector normalization_ bitmap referenced by [globals](~).
  * Transparent shaders do not sort properly behind [shader_transparent_glass](~); they will shift in front and behind each other. Part indexes allow draw order to be set manually for objects through the [gbxmodel](~), but there is no such method for the [scenario_structure_bsp](~); the best you can do is flag the transparent shader to _draw before water_ since glass shaders seem to render in the same stage as water.
  * [shader_transparent_plasma](~) (energy shields) [does not render correctly](~shader_transparent_plasma#known-issues) on some hardware, and always incorrectly in MCC.
  * Environment decals using the double multiply blend mode, like those on the floor of the mission a10, do not render.
  * Multiply is broken in shader transparent chicago/extended. The _Refined_ mod had to recreate things like the inner shadow of the Halo ring and Cortana's pedestal shaders because it shows as invisible by default with multiply.
  * Weather particles don't draw when near opaque fog. Suspected difference from Xbox but not confirmed.
  * [Atmospheric fog](~sky) appears to have sorting issues with [fog planes](~fog), and is even further compounded by [shader_transparent_water](~) sorting. The levels 343 Guilty Spark and Assault on the Control Room are most impacted by this. The water sorting issue is fixed in MCC.
  * Transparent shaders occasionally Z-fight with BSP geometry due to floating point precision.
* Many effects are still tied to frame rate rather than _tick rate_. Without using mods, and at high frame rates, these effects may break down or progress faster than intended.
  * Camera shake in [damage_effect](~)
  * Point generation of [contrail](~)
  * The fading of radar blips
  * Camera point animation (stops being smooth over 60 FPS)
* [shader_environment](~) is also heavily affected:
  * Using [shader_environment](~) on [gbxmodels](~gbxmodel) does not function properly; specularity isn't masked, and atmospheric fog does not render correctly on such objects. This only affects Custom Edition.
  * Self-illumination animation has inconsistent behavior. Plasma animation does not scale or loop properly on some hardware (working in MCC).
  * The bumped cubemap reflection type does not tint cubemaps. Perpendicular and parallel brightness do not take angle into account.
  * Some specular lighting may be missing, which makes dynamic lights appear smaller in radius (e.g. flashlight).
  * Bump map shadows are only visible when dynamic lights are nearby, but should be visible at all times using [lightmap data](~lightmaps) for light direction and tint.
  * The "normal" _type_ may incorrectly mask primary and secondary detail maps when an alpha is present in the base map, visible in b40 exterior tech wall.
  * The "environment specular lightmap" and "environment specular light" pixel shader effects do not clamp to the [-1, 1] range beyond Xbox's shader model 1.1, which results in incorrect specular appearance on some surfaces in PC and H1A. This is fixed by [Chimera](~).

# H1A regressions
Althoug the H1A MCC renderer is much improved over the original Gearbox port to PC, some new issues exist:

* [Detail objects](~detail_object_collection) with the _screen facing_ type do not render. This affects the fungus detail object in c10, grass_small in a30, and d20_rocks_and_grass on d20.

# Troubleshooting
Some PC hardware configurations may cause problems with the renderer, specifically transparent shaders stretching/exploding, and mirror reflections exploding. If you are experiencing this, try forcing 1 core affinity for the game process.

[ff]: https://en.wikipedia.org/wiki/Fixed-function
[shadow-mapping]: https://en.wikipedia.org/wiki/Shadow_mapping
[origin-wiki]: https://en.wikipedia.org/wiki/Origin_(mathematics)
[z-fight-wiki]: https://en.wikipedia.org/wiki/Z-fighting
