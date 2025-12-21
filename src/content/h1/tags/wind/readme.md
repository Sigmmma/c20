---
title: wind
about: 'tag:h1/wind'
img: wind.gif
caption: Flags and other point_physics are affected by a level's assigned wind.
thanks:
  Kavawuvi: Invader tag definitions
  MosesOfEgypt: Tag structure research
  Conscars: Testing and documenting tag features
keywords:
  - wind
---
**Wind** tags describe the base speed and directional variability of wind in a [BSP cluster](~scenario_structure_bsp#clusters-and-cluster-data) as a part of its assigned weather palette. Wind affects the movement of [point_physics](~) such as [flags](~flag), [weather_particle_systems](~weather_particle_system), [contrails](~contrail), and more. The base wind direction in your level is not specified by this tag, but rather in your weather palette entries in Sapien which you must assign to clusters.

You can think of wind as being built up with layers:
- The general wind direction and strength is defined in your palette entry.
- Variability in the speed and angle are defined in this tag.
- Local variation (wiggle) may be ratio-blended _or_ added after.
- For weather particle systems, there is [added motion](~weather_particle_system#added-motion) unrelated to wind.

All elements of variability and random weather motion are framerate-dependent so your custom wind and weather should be tested at typical playing framerates to ensure they look realistic. It can be easier to see the effects of wind settings by setting `framerate_throttle 1` in the console.

# Variation area
You can vary the overall wind direction over time within an angular range defined by the [_variation area_](#tag-field-variation-area), relative to the weather palette entry's direction. This is a global variation that applies to all particles.

Unfortunately, the rate of change is hard-coded and _framerate-dependent_ rather than tied to the 30 Hz simulation rate. This means the wind direction will change faster the higher your framerate is, affecting Gearbox and later editions of the game. Regardless, using this variation feature allows your wind to look more natural even at high FPS. Values around 30-60 and 10-20 degrees are recommended for yaw and pitch respectively.

![](variation_area.gif "Variation area only, at uncapped FPS and yaw range 180 degrees.")

# Local variation
Local variation applies smaller-scale changes to particle directions variation. This can be imagined like a vibrating wiggly field that all the particles are embedded in, stretching and squeezing locally to give the impression of turbulence. Like variation area, this is framerate-dependent so higher FPS means faster local variation.

Local variation also has a roughly +x -y +z directionality bias which is hard-coded. The bias is similar to the _weather_particle_system_ [added motion](~weather_particle_system#added-motion) but does not depend on particle count. A higher local variation weight causes particles to blow in this upward angled direction, especially at high FPS, which may be undesirable and needs to be counteracted by adjusting the weather palette wind direction. Test your weather at expected framerates.

![](local_variation.gif "Local variation only, at 30 FPS with rate 1 and velocity 2.")

Weakly weighted local variation is generally not very noticeable on small groups of particles or short lived particles. If you want to have a strong local variation weight while also maintaining overall directionality, increase your wind palette entry's [wind magnitude](~scenario_structure_bsp#tag-field-weather-palette-wind-magnitude). However, this also results in scaling local variation magnitude for particles using [_simple wind_](~point_physics#tag-field-flags-uses-simple-wind)!

# Structure and fields

{% tagStruct "h1/wind" /%}
