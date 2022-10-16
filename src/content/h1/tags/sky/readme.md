---
title: sky
about: tag:h1/sky
img: sky.jpg
caption: >-
  The skybox is a fully 3D object at a much larger scale than the
  [BSP](~scenario_structure_bsp) itself
thanks:
  Galap: Researching the purpose of _affects interiors_
---
The **sky** tag, often called a **skybox**, models the environment outside the [BSP](~scenario_structure_bsp). It contains radiosity parameters that affect [lightmaps](~) like ambient light and directional lights, defines general atmospheric fog (not to be confused with [planar fog](~fog)), and can have a 3D model that draws behind level geometry.

The sky is not responsible for [weather effects](~weather_particle_system), which are instead assigned to clusters in [Sapien](~).

# Indoor skies
Even fully indoor levels can use a sky. Sky tags contain both outdoor/exterior and indoor/interior options for ambient light, fog, and directional light. The first sky in the [scenario's skies block](~scenario#tag-field-skies) (sky `0`) has special meaning and its indoor options are used for any [indoor clusters](~scenario_structure_bsp#indoor-vs-outdoor-clusters) the BSP has. A fully indoor level with no visible sky faces will only have indoor clusters.

However, it is not mandatory that indoor levels use a sky. Without any skies in the scenario the space outside the BSP will simply be black and there will be no interior fog or ambient light, as is the case with _Chiron TL34_. Indoor levels can still be lit using light-emitting shaders in the BSP and objects that affect [lightmaps](~).

# Multiple skies
Scenarios can reference up to 8 skies. This is mostly useful for long singleplayer levels where the artist wants to portray a change in weather, time of day, or lighting in a different BSP. This is accomplished by using the `+sky0` and `+sky1` [special material names](~h1-materials), for example. Tool will not permit any [cluster](~scenario_structure_bsp#clusters-and-cluster-data) to have a mix of these special materials.

The scenario _should_ reference a sky in the [skies block](~scenario#tag-field-skies) for each sky index used in special materials. For example, if you used `+sky0`, `+sky1`, and `+sky2` then the skies block should contain 3 sky references. The game and lightmapping process is tolerant if this is not the case, however. Any missing skies block entries or empty/null sky references will simply result in black being seen through those sky faces and those clusters receiving no sky lighting and fog.

When the game changes to a different sky the fog colour will smoothly transition over cumulative camera movement of approximately 20 world units. In other words, the fog doesn't change if the camera isn't moving and it needs to move about 20 units (even back and forth) to fully transition. The model itself does not transition in any way and changes instantly. Transitions can happen as the camera/player moves between clusters with different skies, between [indoor and outdoor clusters](~scenario_structure_bsp#indoor-vs-outdoor-clusters), or during a BSP switch. An example of the latter can be seen in _Assault on the Control Room_ when the player reaches the first chasm and Cortana says "the weather patterns here seem natural"; look up and you should see the fog transition as you move.

# Animation
The model of a skybox can be rigged and animated with an overlay (JMO) [model_animations](~). Don't forget to set an animation period in the sky's [_animations_ block](#tag-field-animations). By animating the skybox you can have moving moons, ships, clouds, and even moving sun markers. This cannot be used to achieve dynamic time of day lighting for your map because [lightmaps](~) and dynamic object shadow directions are precomputed based on the sky's rest position and cannot be animated.

You can also animate the sky's shaders for things like sliding cloud textures or a twinkling star effect.

# Ray of Buddha

{% figure src="buddha.jpg" %}
Sunlight shining through an alpha-tested texture
{% /figure %}

The "Ray of Buddha" effect is a glowing disk of light that simulates light beams when obstructed by the BSP and objects within it (even by alpha-tested transparent textures like foliage). This effect will appear automatically for any [sky light](#tag-field-lights) which has a lens flare referenced. Halo supports multiple Rays of Buddha drawing simultaneously if there are multiple sky lights with lens flares. It will always render over any other part of the skybox.

The referenced [lens_flare](~) tag itself is not responsible for this effect but rather creates the faint circular rings of light across the screen. The appearance of Ray of Buddha is hard-coded into the engine and you cannot change its size or colour.

# Related debug globals
The following are related [debug globals](~scripting#external-globals) that you can enter into the [developer console](~developer-console) for troubleshooting.

{% relatedHsc
  game="h1"
  only="globals"
  id="globals"
  tagFilter="sky"
/%}

# Structure and fields

{% tagStruct "h1/sky" /%}
