---
title: style
about: 'tag:h3/style'
img: 
caption: 
keywords:
  - AI
  - Style
thanks:
  odchylanie_uderzenia: writing and research
---     
In Halo 3, all AI behaviors are hard-coded, but Bungie needed a way to dynamically determine which of these behaviors (which may contradict each other) are active on specific units, this need gave us the style tag.

The style tag allows us to enable or disable behaviors entirely, allowing us to customize [character](~) tags with their own style tags to make each unit type distinct from each other.

# General
| General flags | Index | Description
|-------|-------|---------   
| GENERAL | 0 | Requires research
| root | 1 | Requires research  
| null | 2 | Requires research
| null_discrete | 3 | Requires research  
| obey | 4 | Requires research       
| guard | 5 | Requires research
| follow | 6 | Requires research
| ready | 7 | Requires research  
| smash_obstacle | 8 | Requires research  
| destroy_obstacle | 9 | Requires research
| perch | 10 | Requires research
| cover_friend | 11 | Requires research 
| blind_panic | 12 | When enabled, AI will panic and run around in terror when stuck with any attaching projectile with the [_AI stimulus when attached_ flag](~projectile#flags),
| combat | 13 | Requires research

# Broken

Behaviors relating to the underlings in a squad when their leader is killed

| Broken flags | Index | Description
|-------|-------|---------
| BROKEN | 14 | Requires research
| broken | 15 | Requires research
| huddle_impulse | 16 | Requires research
| huddle | 17 | Requires research
| kamikaze | 18 | When enabled, and the [_broken kamikaze chance_](~character) passes, charge at the enemy and blow them up!
| broken kamikaze impulse | 19 | When enabled, allows the [_broken kamikaze chance_](~character) value to play when leader is killed
| broken berserk impulse | 20 | Requires research
| broken flee impulse | 21 | Requires research
| broken scatter impulse | 22 | Requires research

# Engage
| Engage flags | Index | Description
|-------|-------|---------
| ENGAGE | 23 | Requires research
| equipment | 24 | Enables AI to use [equipment](~equipment) in combat
| engage | 25 | Requires research
| fight | 26 | Requires research
| melee_charge | 27 | Requires research
| melee_leaping_charge | 28 | Requires research
| surprise | 29 | When enabled, allows AI to sneak up on unaware enemies with their crouch mode animations
| grenade_impulse | 30 | When enabled, allows grenade throwing behavior, character tag still controls chances and conditions to throw
| anti_vehicle_grenade | 31 | Requires research
| stalk | 32 | Requires research
| flank | 33 | When enabled, forces AI to try and flank to the sides of enemies, avoiding combat until on the flank
| berserk_wander_impulse | 34 | Requires research
| stalker_camo_control | 35 | Requires research
| leader_abandoned_berserk | 36 | Requires research
| unassailable grenade impulse | 37 | Requires research
| perimeter | 38 | Requires research
| perimeter@timeout_morph | 39 | Requires research
| perimeter@infection_spew | 40 | Requires research

# Berserk 
| Berserk flags | Index | Description
|-------|-------|---------
| BERSERK | 41 | Requires research
| shield_depleted_berserk | 42 | When enabled, forces AI to berserk upon shield depletion
| last_man_berserk | 43 | When enabled, the last man standing in a squad will berserk
| stuck_with_grenade_berserk | 44 | When enabled, AI will berserk when stuck with any attaching projectile with the [_AI stimulus when attached_ flag](~projectile#flags), make sure the _blind_panic_ flag is disabled

# Presearch    
| Presearch flags | Index | Description
|-------|-------|---------
| PRESEARCH | 45 | Requires research
| presearch | 46 | Requires research
| presearch uncover | 47 | Requires research
| destroy_cover | 48 | Requires research
| suppressing fire | 49 | When enabled, allows AI to suppress a target who has recently entered cover and whos position we are confident of
| grenade_uncover | 50 | Requires research
| leap_on_cover | 51 | Requires research

# Leader
| Leader flags | Index | Description
|-------|-------|---------
| LEADER | 52 | Requires research
| search_sync | 53 | Requires research
| engage_sync | 54 | Requires research

# Search
| Search flags | Index | Description
|-------|-------|---------
| SEARCH | 55 | Requires research
| search | 56 | Requires research
| uncover | 57 | Requires research
| investigate | 58 | Requires research
| pursuit_sync | 59 | Requires research
| pursuit | 60 | Requires research
| refresh_target | 61 | Requires research
| sense_target | 62 | When enabled, allows the AI to magically sense the true location of a target under [certain conditions](~ai#perception), needs research
| postsearch | 63 | Requires research
| coverme_investigate | 64 | Requires research

# Self-Defense

Behaviors relating to cover and self-preservation when fighting a foe, closely tied to the cover properties in the [character](~)

| Self-defense flags | Index | Description
|-------|-------|---------
| SELF-DEFENSE | 65 | Requires research
| self_preservation | 66 | Requires research
| cover | 67 | Requires research
| cover peek | 68 | When enabled, allows AI units to use cover stances that let them peek around cover to fire while partially protected
| avoid | 69 | Requires research
| evasion_impulse | 70 | Requires research
| dive_impulse | 71 | When enabled, allows AI to perform a dive animation to avoid danger such as grenades, if disabled simply try to walk/run from the danger instead
| danger cover impulse | 72 | Requires research
| danger crouch impulse | 73 | Requires research
| proximity_melee | 74 | When enabled and a target gets within our [_proximity melee distance_](~character) while we are trying to back away or get into cover, smack them
| proximity_self_preservation | 75 | When enabled, causes AI to avoid targets when they get within their [_proximity self-preserve_](~character) distance
| unreachable_enemy_cover | 76 | Requires research
| unassailable_enemy_cover | 77 | Requires research
| scary_target_cover | 78 | Requires research
| group_emerge | 79 | Requires research
| shield_depleted_cover | 80 | Requires research

# Retreat

behaviors relating to how AI determines when to retreat from a foe, closely tied to the retreat properties in the [character](~) tag

| Retreat flags | Index | Description
|-------|-------|---------
| RETREAT | 81 | Unknown, perhaps no function
| retreat | 82 | Enables/disables all retreat behavior
| retreat_grenade | 83 | Enables AI to throw a grenade right before beginning a retreat, uses [_retreat grenade chance_](~character) value, needs additional research
| flee | 84 | When enabled and a retreat stimulus is received, lower weapons and run away
| cower | 85 | Requires research
| low_shield_retreat | 86 | Requires research
| scary_target_retreat | 87 | When enabled, will cause retreat behavior if a target matches or surpasses our [_scary target threshold_](~character) value
| leader_dead_retreat | 88 | Requires research
| peer_dead_retreat | 89 | Requires research
| danger_retreat | 90 | When enabled, will cause retreat behavior if a target surpasses our [_danger threshold_](~character) value
| proximity_retreat | 91 | When enabled, will cause retreat behavior if a target enters our [_proximity threshold_](~character) radius
| charge when cornered | 92 | Requires research
| surprise_retreat | 93 | Requires research
| overheated_weapon_retreat | 94 | Requires research
        
# Ambush

Behaviors related to the AI being able to engage an enemy they are fleeing from under special circumstances

| Ambush flags | Index | Description
|-------|-------|---------
| AMBUSH | 95 | Requires research
| ambush | 96 | Requires research
| coordinated_ambush | 97 | Requires research
| proximity_ambush | 98 | Requires research
| vulnerable_enemy_ambush | 99 | Enables AI to cease fleeing from a target if the target falls under the [_awareness ambush threshold_](~character), and instead turn around and attack
| nowhere_to_run_ambush | 100 | Enables AI to cease fleeing from a target if they reach a dead-end, and instead turn around and attack
        
# Vehicle

Behaviors related to vehicle combat and usage

| Vehicle flags | Index | Description
|-------|-------|---------
| VEHICLE | 101 | Requires research
| enter_vehicle | 102 | Requires research
| enter_friendly_vehicle | 103 | Requires research
| vehicle_enter_impulse | 104 | Requires research
| vehicle_entry_engage_impulse | 105 | Requires research
| vehicle_board | 106 | Requires research
| vehicle_fight | 107 | Requires research
| vehicle_fight@boost | 108 | Requires research
| vehicle_charge | 109 | Requires research
| vehicle_ram_ | 110 | Requires research
| vehicle_cover | 111 | Requires research
| damage_vehicle_cover | 112 | Requires research
| exposed_rear_cover_impulse | 113 | Requires research
| player_endagered_cover_impulse | 114 | Requires research
| vehicle_avoid | 115 | Requires research
| vehicle_pickup | 116 | Requires research
| vehicle_player_pickup | 117 | Requires research
| vehicle_exit_impulse | 118 | Requires research
| danger_vehicle_exit_impulse | 119 | Requires research
| vehicle_flip_impulse | 120 | Requires research
| vehicle_flip | 121 | Requires research
| vehicle_turtle | 122 | Requires research
| vehicle_engage_patrol_impulse | 123 | Requires research
| vehicle_engage_wander_impulse | 124 | Requires research

# Postcombat

Behaviors used when combat has ceased and the AI returns to idle/active 

| Postcombat flags | Index | Description
|-------|-------|---------
| POSTCOMBAT | 125 | Requires research
| postcombat | 126 | Requires research
| post_postcombat | 127 | Requires research
| check_friend | 128 | Requires research
| shoot_corpse | 129 | Requires research
| postcombat_approach | 130 | Requires research
        
# Alert
| Alert flags | Index | Description
|-------|-------|---------
| ALERT | 131 | Requires research
| alert | 132 | Requires research

# Idle  
| Idle flags | Index | Description
|-------|-------|---------
| IDLE | 133 | Unknown, perhaps no function
| idle | 134 | Enables/disables all further idle behaviors when the AI is not active
| wander behavior | 135 | Idle AI will wander between firing points, uses idle animation mode
| flight_wander | 136 | Requires research
| patrol | 137 | Allows idle AI to use the patrol system to navigate between point sets regardless of assigned zone/area
| fall_sleep | 138 | Enables AI to be put into the sleep state, does not require sleep mode animations but will use them if available

# Buggers  
| Bugger flags | Index | Description
|-------|-------|---------
| BUGGERS | 139 | Requires research
| bugger_ground_uncover | 140 | Requires research
        
# Swarms
| Swarm flags | Index | Description
|-------|-------|---------
| SWARMS | 141 | Requires research
| swarm_root | 142 | Requires research
| swarm_attack | 143 | Requires research
| support_attack | 144 | Requires research
| infect | 145 | Requires research
| scatter | 146 | Requires research

# Combatforms

Behaviors relating to flood combatforms

| Combatform flags | Index | Description
|-------|-------|---------
| COMBATFORMS | 147 | Requires research
| combat form berserk control | 148 | Enables the AI to use the combatform [_berserk distance_ and _berserk chance_ fields](~character), causes the unit to berserk at a target under the given condition
| eject parasite | 149 | Requires research

# Sentinels
| Sentinel flags | Index | Description
|-------|-------|---------
| SENTINELS | 150 | Requires research
| enforcer weapon control | 151 | Requires research
| grapple | 152 | Requires research
        
# Guardians
| Guardian flags | Index | Description
|-------|-------|---------
| GUARDIANS | 153 | Requires research
| guardian_surge | 154 | Requires research
| guardian_proximity_surge | 155 | Requires research
| guardian_danger_surge | 156 | Requires research
| guardian_isolation_surge | 157 | Requires research

# Pureforms

Behaviors related to flood pureforms, including their ability to morph into different [characters](~character) on the fly based on the current combat situation

| Pureform flags | Index | Description
|-------|-------|---------
| PUREFORMS | 158 | Requires research
| group_morph_impulse | 159 | Requires research
| arrival_morph_impulse | 160 | Requires research
| pureform_default_impulse | 161 | Requires research
| search_morph | 162 | Requires research
| stealth_active_camo_control | 163 | Requires research
| stealth_damage_morph | 164 | Requires research
| stealth_stalk | 165 | Requires research
| stealth_stalk@thwarted | 166 | Requires research
| stealth_stalk_group | 167 | Requires research
| stealth_charge_recover | 168 | Requires research
| ranged_proximity_morph | 169 | Requires research
| tank_distance_damage_morph | 170 | Requires research
| tank_throttle_control | 171 | Enables following the [_throttle distance_](~character) fields in the character tag where the AI will slow their movement as they gain on a target
| stealth_morph | 172 | Requires research
| tank_morph | 173 | Requires research
| ranged_morph | 174 | Requires research
| ranged_turtle | 175 | Requires research
| ranged_uncover | 176 | Requires research

# Scarab
| Scarab flags | Index | Description
|-------|-------|---------
| SCARAB | 177 | Requires research
| scarab_root | 178 | Requires research
| scarab_cure_isolation | 179 | Requires research
| scarab_combat | 180 | Requires research
| scarab_fight | 181 | Requires research
| scarab_target_lock | 182 | Requires research
| scarab_search | 183 | Requires research
| scarab_search_pause | 184 | Requires research

# ATOMS
| ATOMS flags | Index | Description
|-------|-------|---------
| ATOMS | 185 | Requires research
| go_to | 186 | Requires research

# Activities
| Activity flags | Index | Description
|-------|-------|---------
| ACTIVITIES | 187 | Requires research
| activity | 188 | Requires research
| posture | 189 | Requires research
| activity_default | 190 | Requires research

# Special
| Special flags | Index | Description
|-------|-------|---------
| SPECIAL | 191 | Requires research
| formation | 192 | Requires research
| grunt scared by elite | 193 | Requires research
| stunned | 194 | Enables stunned behavior, causing units to play stunned animations and disengage in combat until their [stunned timer](~character) expires
| cure_isolation | 195 | Requires research
| deploy_turret | 196 | Enables AI to automatically deploy equiped turret weapons onto [turret deployment areas](~pathfinding#areas)