---
title: projectile
stub: true
noSearch: false
img:
caption:
about: 'tag:h3/projectile'
keywords:
  - bullet
  - bolt
  - rocket
  - shell
  - blast
thanks:
  odchylanie_uderzenia: writing and research
  gbMichelle: movement from the CE projectile tag
---
**Projectiles** are a type of object fired from [weapons](~weapon) or thrown as grenades that interact with objects or map geometry. Through their parent [object](~) tag they can reference a [model](~) so they may have a visual element and/or a collision box. Projectiles have many properties and can interact with any material specified in the [globals](~) in various ways like bouncing or detonating.

# Movement

Projectile movement is simulated during each game tick (smallest unit of simulated time). According to the projectile's velocity and gravity scale, its next position is calculated by the engine and a "trace" ray between the two points is tested for collisions.

The trace collision test takes advantage of other objects' bounding radii and the collision BSP structures found in [collision models](~collision_model) and [scenario structure bsps](~scenario_structure_bsp). If any collision is detected, it is handled accordingly (e.g. applying effects, damage or playing sound).

If no collision is detected, the projectile is moved to its next position at the end of the trace line. The process continues, tick by tick, until the projectile collides or detonates at its maximum range

A sufficiently high velocity projectile is effectively hitscan if it can cross a playable space within a single tick, with the game being simulated at 60 ticks per second. Otherwise, ballistic leading will be required to hit a moving target.


# Flags

These are general purpose flags that change the behavior of the projectile, more specific flags for individual parts of the projectile can be found further down in their specific section. This section also contains properties related to projectile detonation behavior.

| Weapon flags | Description
|-------|----------
| oriented along velocity | Orientation of projectile and it's attached [effects](~effect) so they match the direction it is moving, **needed for proper and consistent bouncing behavior**
| AI must use ballistic aiming | Used in conjunction with the [AI](~character) tag to allow the use of ballistic aiming to aim at targets, good for projectiles with a strong arc as otherwise the AI will attempt direct fire.
| detonation max time if attached | When attached to a target, the detonation timer is set to the maximum possible value
| has super combining explosion | Enables supercombine functions on the projectile when attaching to targets
| damage scales based on distance | WIP
| travels instantaneously | Upon the projectile being fired from a weapon, it's velocity is **doubled** for the first (1 or 2?) game ticks
| steering adjusts orientation | WIP 
| don't noise up steering | WIP
| can track behind itself | WIP
| ROBOTRON STEERING | When tracking a target, the projectile will perform corkscrew motions
| affected by phantom volumes | Projectile can interact with phantom volumes, rather than passing through them with no effect
| expensive chubby test | WIP
| notifies target units | WIP
| use ground detonation when attached | WIP 
| AI minor tracking threat | Used in conjunction with the [AI](~character) tag to allow AI to react to this projectile via diving and dodging away from projectiles
| dangerous when inactive | WIP
| AI stimulus when attached | Triggers special AI behaviors like fleeing or berserking when this projectile attaches to them
| OverPeneDetonation | Allows projectile to deal detonation damage when overpenetrating targets
| no impact effects on bounce | WIP
| RC1 overpenetration fixes | Unknown/Needs additional research

{% alert %}
Is it not currently understood what defines a floor from a wall or ceiling, so far through testing a plane with an angle of 0 to 61 degrees is considered a floor and 90 degrees a wall
{% /alert %}

| Detonation timer starts | Description
|-------|----------
| immediatly | The moment the projectile is created it's detonation timer begins counting down
| after first bounce | Projectiles detonation timer counts down after first bounce off a floor
| when at rest | Detonation timer begins counting down after the projectile comes to a full stop on a surface, timer does not stop if the projectile moves again after starting
| after first bounce of any surface | Projectiles detonation timer counts down after first bounce off any surface

| Impact noise | Description
|-------|----------
| silent | Unknown/Needs additional research
| medium | Unknown/Needs additional research
| loud | Unknown/Needs additional research
| shout | Unknown/Needs additional research
| quiet | Unknown/Needs additional research

| Fields | Description
|-------|----------
| collision radius (real) | Unknown/Needs additional research

# Detonation

| Fields | Tag/data type | Description
|-------|----------|--------------
| arming time | real | Projectile cannot detonate before this time: like preventing projectiles from blowing each other up too fast
| danger radius | real | WIP
| timer | real | A set of two values in seconds that the projectile will pick randomly between to wait before detonation, timer starts according to the "detonation timer starts" selection
| minimum velocity | real | Projectile detonates when falling below this velocity
| maximum range | real | Projectile detonates after having travelled this distance in world units
| bounce maximum range | real | WIP
| detonation noise | enum | Same as "impact noise" but applied on projectile detonation instead
| super det. projectile count | short | Number of projectiles attached to a target needed to trigger super-combine behavior, needs supercombining flag enabled
| super det. time | real | Time after the above field where the super-combine effect is triggered
| detonation started | [effect](~) | Effect played on the projectile during it's detonation timer countdown
| detonation effect (airborne) | [effect](~) | Effect played on the projectile when it detonates in the air
| detonation effect (ground) | [effect](~) | Effect played on the proejctile when it detonates on the ground
| detonation damage | [damage_effect](~) | Damage effect spawned when the projectile detonates
| attached detonation damage | [damage_effect](~) | Damage effect spawned on the target when this projectile is attached to them
| super detonation | [effect](~) | The effect played when a super-combine is triggered from this projectile attaching to a target
| super detonation damage | [damage_effect](~) | The damage effect spawned around the target the super-combine is being triggered on
| detonation sound | [sound](~) | Sound played when the projectile detonates
| damage reporting type | enum | A dropdown list of various weapon types: unknown use
| super attached detonation damage | [damage_effect](~) | The damage effect spawned on the target the super-combine is being triggered on
| material effect radius | real | Unknown/Needs additional research

# Flyby/impact

Defines what happens when the projectile flies past a target without hitting them, or if it hits them.

{% alert %}
projectiles set to detonate when hitting targets will still apply impact damage **before** detonation damage.
{% /alert %}

| Fields | Tag type | Description
|-------|----------|--------------
| flyby sound | [sound](~) | Sound played near targets this projectile narrowly misses
| impact effect | [effect](~) | Effect played on map geometry when this projectile impacts them
| object impact effect | [effect](~) | Effect played on objects such as [crates](~crate) or [scenery](~) when this projectile impacts them
| impact damage | [damage_effect](~) | Damage effect played on target the project impacts

# Boarding fields

| Fields | Tag/data type | Description
|-------|----------|--------------
| boarding detonation time | real | Time taken in seconds for the projectile to detonate after being planted while boarding
| boarding detonation damage | [damage_effect](~) | Damage effect spawned on the projectile after the above fields time has passed
| boaring attached detonation damage | [damage_effect](~) | Unknown/Needs additional research

# Physics

# Material Responses

# Brute Grenade

# Firebomb Grenade

# Conical Spread
