---
title: H2 scripting
keywords:
  - script
  - hsc
  - bsl
---
Like earlier games, Halo 2 supports **scripting** with [HaloScript](~general/scripting). Since H2 documentation is an ongoing work-in-progress, please refer to the more complete [H1 scripting page](~h1/scripting) for info on common functions.

# Advanced scripting
## Controlling "auto-gunner" turrets
At first glance controlling the turrets on a Phantom doesn't seem possible using scripts as the gunner is not a named actor that's part of a squad but instead defined as a property of the turret itself. We can however get a *reference* to the unnamed AI actor using `object_get_ai` on the turret object/vehicle.

```hsc
; CS: get the vehicle the AI actor is in
(script static vehicle cs_vehicle_get
    (ai_vehicle_get ai_current_actor)
)

; CS: get the chin-gun AI  (assuming current actor is driver of a phantom)
(script static ai cs_phantom_chin_gun_get_ai
    (object_get_ai (object_at_marker (cs_vehicle_get) "chin_gun"))
)

(script static ai cs_phantom_left_gun_get_ai
    (object_get_ai (object_at_marker (cs_vehicle_get) "left_gun"))
)

(script static ai cs_phantom_right_gun_get_ai
    (object_get_ai (object_at_marker (cs_vehicle_get) "right_gun"))
)
```

The above static scripts can be used with a command script that's being executed by the driver of the phantom:

```hsc
(script command_script phantom01_guns
  ; disable combat
  (ai_suppress_combat ai_current_actor 1)
  ; stare at the player
  (cs_look_player 1)
  (sleep_forver)
)

(script command_script phantom01_driver
  (cs_run_command_script (cs_phantom_chin_gun_get_ai) phantom01_guns)
  (cs_run_command_script (cs_phantom_left_gun_get_ai) phantom01_guns)
  (cs_run_command_script (cs_phantom_right_gun_get_ai) phantom01_guns)
)

(script dormant d_phantom01_driver
  (ai_place phantom01)
  (cs_run_command_script phantom01/driver phantom01_driver)
)
```

# Reference

## Functions

{% dataTable
  dataPath="hsc/h2/functions/functions"
  linkCol=true
  linkSlugKey="slug"
  rowSortKey="slug"
  columns=[
    {name: "Function", key: "info/en"}
  ]
/%}

## External globals
{% dataTable
  dataPath="hsc/h2/globals/external_globals"
  linkCol=true
  linkSlugKey="slug"
  columns=[
    {name: "Global", key: "info/en"}
  ]
/%}
