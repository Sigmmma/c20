---
title: projectile
img: rocket.jpg
caption: A projectile (rocket) flying through the air
about: 'tag:h3/projectile'
keywords:
  - bullet
  - bolt
  - rocket
  - blast
  - grenade
  - bomb
thanks:
  odchylanie_uderzenia: writing and research
  gbMichelle: movement from the CE projectile tag
---
**Projectiles** are a type of object fired from [weapons](~weapon) or thrown as grenades that interact with objects or map geometry. Through their parent [object](~) tag they can reference a [model](~) so they may have a visual element and/or a collision box. Projectiles have many properties and can interact with any material specified in the [globals](~) in various ways like bouncing or detonating.

# Movement

Projectile movement is simulated during each game tick (smallest unit of simulated time). According to the projectile's velocity and gravity scale, its next position is calculated by the engine and a "trace" ray between the two points is tested for collisions.

The trace collision test takes advantage of other objects' bounding radii and the collision BSP structures found in [collision models](~collision_model) and [scenario structure bsps](~scenario_structure_bsp). If any collision is detected, it is handled accordingly (e.g. applying effects, damage or playing sound).

If no collision is detected, the projectile is moved to its next position at the end of the trace line. The process continues, tick by tick, until the projectile collides or detonates at its maximum range.

A projectile with sufficiently high velocity behaves like a hitscan, since it will be able to cross a playable space within a single tick, with the game being simulated at 60 ticks per second. Should the projectile not be fast enough to hitscan the playable space, leading on targets may be required.

Projectiles receive a boost to the distance hitscanned on their spawn tick, this boost is very strong at low velocities such as 2, but as velocity increases the boost is reduced until it becomes negligible, like at 700.

Projectile vectors can be changed from all sources of [damage](~damage_effect) when a [collision model](~collision_model) is present by using the "instantaneous acceleration" value, this includes melee, explosions, normal rounds, and other projectiles colliding mid-air. When no collision is present only area of effect damage can effect projectiles

Introduced in H2, the "travels instantaneously" flag is used extensively by many weapons and makes projectiles reach short range targets in a much smaller amount of time, requiring less leading.


# Flags

These are general purpose flags that change the behavior of the projectile, more specific flags for individual parts of the projectile can be found further down in their specific section. This section also contains properties related to projectile detonation behavior.

| Weapon flags | Description
|-------|----------
| oriented along velocity | Orientation of projectile and it's attached [effects](~effect) so they match the direction it is moving, **needed for proper and consistent bouncing behavior**
| AI must use ballistic aiming | Used in conjunction with the [AI](~character) tag to allow the use of ballistic aiming to aim at targets, good for projectiles with a strong arc as otherwise the AI will attempt direct fire.
| detonation max time if attached | When attached to a target, the detonation timer is set to the maximum possible value
| has super combining explosion | Enables supercombine functions on the projectile when attaching to targets
| damage scales based on distance | Causes the **impact** damage to be scaled by the "air damage range" bounds values, needs more research
| travels instantaneously | Upon the projectile being fired from a weapon, its velocity is quadrupled for the first tick of creation, after the first tick it moves at it's assigned speed
| steering adjusts orientation | Unknown, generally causes the projectile when self-guiding onto a target to perform erratic sharp turns on near misses, needs additional research
| don't noise up steering | Unknown, needs additional research
| can track behind itself | Unknown, needs additional research
| ROBOTRON STEERING | When tracking a target, the projectile will perform corkscrew motions, needs more research
| affected by phantom volumes | Projectile can interact with phantom volumes, rather than passing through them with no effect
| expensive chubby test | Unknown, needs additional research
| notifies target units | When firing a locked tracking projectile, notify the target, this means playing a sound to the player to indicate they are being persued by a tracking projectile
| use ground detonation when attached | Uses the ground detonation field when this projectile is attached to [bipeds](~biped), otherwise uses the airborne detonation
| AI minor tracking threat | Used in conjunction with the [AI](~character) tag to allow AI to react to this projectile via diving and dodging away from projectiles
| dangerous when inactive | Unknown, needs additional research
| AI stimulus when attached | Triggers special AI behaviors like fleeing or berserking when this projectile attaches to them
| OverPeneDetonation | Allows projectile to deal detonation damage when overpenetrating targets
| no impact effects on bounce | "impact effect" is disabled on bounce behavior
| RC1 overpenetration fixes | Unknown/Needs additional research, causes the [light_volume_system](~) of projectiles to be frozen in mid-air when the projectile reaches max range

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
| danger radius | real | AI will try to avoid this projectile from this far away in WU
| timer | real | A set of two values in seconds that the projectile will pick randomly between to wait before detonation, timer starts according to the "detonation timer starts" selection
| minimum velocity | real | Projectile detonates when falling below this velocity
| maximum range | real | Projectile detonates after having travelled this distance in world units
| bounce maximum range | real | Unknown, needs additional research
| detonation noise | enum | Same as "impact noise" but applied on projectile detonation instead
| super det. projectile count | short | More than this number of projectiles attached to a target needed to trigger super-combine behavior, needs supercombining flag enabled
| super det. time | real | Time after the above field where the super-combine effect is triggered
| detonation started | [effect](~) | Effect played on the projectile during it's detonation timer countdown
| detonation effect (airborne) | [effect](~) | Effect played on the projectile when it detonates in the air
| detonation effect (ground) | [effect](~) | Effect played on the proejctile when it detonates on the ground
| detonation damage | [damage_effect](~) | Damage effect spawned when the projectile detonates
| attached detonation damage | [damage_effect](~) | Damage effect spawned on the target when this projectile is attached to them
| super detonation | [effect](~) | The effect played when a super-combine is triggered from this projectile attaching to a target
| super detonation damage | [damage_effect](~) | The damage effect spawned on the target the super-combine is being triggered on
| detonation sound | [sound](~) | Sound played when the projectile detonates
| damage reporting type | enum | A dropdown list of various weapon types: unknown use
| super attached detonation damage | [damage_effect](~) | The damage effect spawned on the target the super-combine is being triggered on, cannot harm other units
| material effect radius | real | Unknown/Needs additional research

# Flyby/impact

Defines what happens when the projectile flies past a target without hitting them, or if it hits them.

{% alert %}
projectiles set to detonate when hitting targets will still apply impact damage **before** detonation damage
{% /alert %}

| Fields | Tag type | Description
|-------|----------|--------------
| flyby sound | [sound](~) | Sound played near targets this projectile narrowly misses
| impact effect | [effect](~) | Effect played on all items and geometry when this projectile impacts them
| object impact effect | [effect](~) | Effect played only on objects such as [crates](~crate) or [scenery](~) when this projectile impacts them
| impact damage | [damage_effect](~) | Damage effect played on target the projectile impacts

# Boarding fields

Defines properties when this projectile is planted onto boarded targets, all tags with a [unit](~) tag component such as [vehicles](~vehicle) or [bipeds](~biped) can be set to be boarded

| Fields | Tag/data type | Description
|-------|----------|--------------
| boarding detonation time | real | Time taken in seconds for the projectile to detonate after being planted while boarding
| boarding detonation damage | [damage_effect](~) | Damage effect spawned on the projectile after the above fields time has passed
| boarding attached detonation damage | [damage_effect](~) | Unknown/Needs additional research

# Physics

This section defines the general properties about the projectile and how it travels to its target

{% alert %}
AI velocity scale is broken and **does not** scale the velocity of projectiles down below 1, however AI targeting and leading still acts as if it is and as such AI will overlead targets and miss: **scales above 1 work as intended**

**Forwards and backwards momentum from the player will be added onto the projectiles default velocity vector** (positive or negative). However projectiles cannot inherit momentum that results in backward motion when their velocity is a positive value or 0. **Only projectiles with a negative velocity can inherit momentum to move in both vectors**
{% /alert %}

| Fields | Data type | Description
|-------|----------|--------------
| air gravity scale  | real | This value defines how much drop the projectile experiences during flight, higher numbers mean more drop
| air damage range | real | A set of two values that define how the associated [damage](~damage_effect) is scaled, using the "damage lower bound" value for the air range past the latter bound value, behavior of this field is bugged for the former bound value and "damage upper bound" however.
| water gravity scale | real | Needs additional research
| water damage range | real | Needs additional research
| initial velocity | real | The velocity of the projectile when first spawned
| final velocity | real | The velocity of the projectile after it has passed through it's "acceleration range"
| ai velocity scale (normal) | real | Scale on the projectiles velocity when fired by AI on normal
| ai velocity scale (legendary) | real | Scale on the  projectile velocity when fired by AI on legendary, heroic is the average of both this and the normal difficulty value
| guided angular velocity (lower) | real | The amount of tracking the projectile has when below it's "acceleration range" value, scales towards the upper value during the "acceleration range"
| guided angular velocity (upper) | angle | The amount of tracking the projectile has when over it's "acceleration range" value
| guided angular velocity at rest | angle | Amount of tracking the projectile has when it first begins to track a target, needs additional research
| acceleration range | real | A set of two values that determines at how manu WU's into the projectiles flight it should begin changing velocity, and at what range to have completed this transition
| targeted leading fraction | fraction | A value from 0 to 1 that determines how much leading a tracking projectile will attempt when tracking a moving target
| guided projectile (outer range) error radius| real | A value that determines the magnitude by which a tracking projectile will **track away** from it's target, this magnitude is scaled by the angular velocity values, once this max magnitude has been reached, normal projectile tracking **torwards target** begins: assuming the projectile is close enough to begin tracking, needs additional research
| autoaim aiming max lead time | real | Unknown, needs additional research

# Material Responses

{% alert %}
Projectiles moving **faster than** 1499 WU/s are unable to attach under any conditions and will detonate instead when making contact with target
{% /alert %}

This section defines how the projectile reacts when it comes into contact with specific materials

| Default response | Data type | Description
|-------|----------|--------------
| impact (detonate) | enum | Projectile is deleted when it comes into direct contact with the material
| fizzle | enum | Appears to behave the same as impact
| overpenetrate | enum | Projectile passes through through this material but only on objects and **not** map geometry
| attach | enum | Projectile attaches to specified material, waiting the duration of the "timer" value in the detonation section
| bounce | enum | Projectile bounces off of the specified material, bounce properties are specified further below
| bounce (dud) | enum | Same as above, but the projectile no longer deals impact damage after the bounce, will steal deal detonation damage.
| fizzle (bounce) | enum | 

material name (string): string name of the material you are specifying the behavior for, materials are specified in the [globals](~)

potential response (enum): Same as the default response, but is the first place the game checks on projectile collision, if all conditions fail for potential, use default

| Response flags | Description
|-------|----------
| only against units (except giants) | Run potential response if velocity and angle conditions pass when making contact with [bipeds](~biped) or [vehicles](~vehicle)
| never against units (except giants) | Never run potential response if projectile makes contact with [bipeds](~biped) or [vehicles](~vehicle)
| never against wuss players | Unknown, needs testing

| Fields | Data type | Description
|-------|----------|--------------
| chance fraction | fraction | A value between 0 and 1 that determines the chance for the "potential response" to be chosen, assuming below conditions are also true, else use "default response"
| between | bounds | A set of values that determines at what impact angle the projectile must meet to continue with the "potential response", 0 being parallel and 90 being perpendicular, else use "default response"
| and | bounds | A set of values that determines at what speed the projectile needs to be traveling at when it makes contact to continue with the "potential response", else use "default response"

## Misc, penetration and reflection

{% alert %}
Parallel and perpendicular friction act as a bounds where the closer to impact angle 0 a projectile makes contact, the closer it's velocity fraction lost gets to the "parallel friction" value, and vice versa with impact angles closer to 90 causing the velocity fraction lost to skew closer to the "perpendicular friction" value
{% /alert %}

| Fields | Data type | Description
|-------|----------|--------------
| scale effects by | enum | Angle **or** damage, unknown
| angular noise | angle | Unknown, presumably the maximum number of degrees the projectile can be randomly offset by when bouncing off a surface (in addition to the natural offset from the bounce itself)
| velocity noise | real | Unknown, presumably the the velocity of the projectile changed randomly when bouncing off a surface (in addition to velocity lost from parallel and perpendicular friction values)
| initial friction | real | Unknown, needs additional research
| maximum distance | real | Unknown, needs additional research
| parallel friction | real | The fraction of projectile velocity lost when bouncing off a surface at a parallel (closer to 0 degree) angle
| perpendicular friction | real | The fraction of projectile velocity lost when bouncing off a surface at a perpendicular (closer to 90 degree) angle

# Brute Grenade

| Fields | Data type | Description
|-------|----------|--------------
| minimum angular vel | angle | Unknown, needs additional research
| maximum angluar vel | angle | Unknown, needs additional research
| spin angular vel | angle | Unknown, needs additional research
| angular damping | real | Unknown, needs additional research
| drag angle k | real | Unknown, needs additional research
| drag speed k | real | Unknown, needs additional research
| drag exponent | real | Unknown, needs additional research
| attach sample radius | real | Unknown, needs additional research
| attach acc k | real | Unknown, needs additional research
| attach acc s | real | Unknown, needs additional research
| attach acc e | real | Unknown, needs additional research
| attach acc damping | real | Unknown, needs additional research

# Firebomb Grenade
projection offset (real): Unknown, needs additional research

# Conical Spread

{% figure src="distribution0.jpg" %}
Pictured: 15 projectiles with a spread angle of 5 degrees and a distribution exponent of 0
{% /figure %}

{% figure src="distribution1.2.jpg" %}
Pictured: Now with the distribution exponent set to 1.2 with no other changes
{% /figure %}

This section can be used for weapons that fire a high volume of projectiles in a single shot, like shotguns: it defines the size and spread of the entire blast and allows more control compared to the error fields in the [weapon](~weapon#error-spread-bloom) tag.

Conical spread requires the "travels instantaneously" flag to be enabled and for the projectile velocity to be of suffiencitly high enough velocity to reach any target (map geo included) in a single tick *within* a desired range, this range is determined by the projectile velocity and still follows the ["maximum range" field](~projectile#detonation).

The bonus projectiles of conical spread will *only* be created if they can reach a target instantly, otherwise they will not spawn at all, regardless of this, the initial projectile will still be spawned. It will adhere to conical spreads spread fields.

The math for determining the range for the bonus projectiles will be to take your projectile velocity and divide it by the games tick rate (60) and then to double the value by 2 because of the "travels instantaneously" flag mentioned earlier, this final value is the distance the bonus projectiles can reach within a single tick.

| Fields | Data type | Description
|-------|----------|--------------
| yaw count | short | This value and the "pitch count" value are multiplied together to get the total number of projectiles created for conical spread, unknown if any other effects
| pitch count | short | See above
| distribution exponent | real | Defines the distribution of projectiles within the "spread" angle, a value of 0 means all projectiles are set along the max of the spread value, higher velues make this distribution closer to center
| spread | angle | Defines the max spread in degrees from center