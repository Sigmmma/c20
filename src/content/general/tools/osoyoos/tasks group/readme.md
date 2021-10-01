This group lets you run various commands for your selected profile directly from the UI. You can find this at the middle of the UI window.

# Import & Light Level
This section will cover the various settings found in the **Import & Light Level** tab. 

## Halo 1 level settings

![](halo_one_level.jpg "A Gearbox Halo 1 profile on the left and an MCC Halo 1 profile on the right")

| Halo 1 Settings    | Description                                                                                                                                                               | Notes
|------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------
| FBX                | Converts an FBX file to a JMS file that Tool can then read to convert to a level.                                                                                         | This option only applies to an MCC profile
| Browse             | Pressing this button will ask the user to browse for a JMS to import with tool. The user can also select a scenario tag to light a level without the need for a JMS file. | If a scenario is selected then the only option for the user will be to light it.
| Import Only        | This is one option in a set of 3. If this option is set then only the level importing process will be started.                                                            |
| Light Only         | This is one option in a set of 3. If this option is set then only the level lighting process will be started.                                                             |
| Import and Light   | This is one option in a set of 3. If this option is set then the JMS will first be imported and then lit.                                                                 |
| Light Threshold    | A slider that sets how long the lightmapper should go for because it calls the job done. Values on the right take longer than values on the left.                         |
| Draft              | The lightmapper will run in draft mode. Takes less total time to complete than final.                                                                                     |
| Light              | The lightmapper will run in final mode. Takes more total time to complete than draft.                                                                                     |
| Apply Phantom Fix  | This will set the phantom fix arg to true during level importing. This will attempt to fix any possible invisible walls generated during import at the cost of tag space. | This option only applies to an MCC profile
| Disable Asserts    | This will set the -NoAssert arg during level lighting. Should grant some additional speed ups by disabling error checking. Only use if you know the tag has no issues.    | This option only applies to an MCC profile
| Import/Light level | Pressing this will run either level import and lighting commands with the settings set above.                                                                             |

## Halo 2 level settings

![](halo_two_level.jpg "A Halo 2 Vista profile on the left, a Halo 2 Vista profile with community extensions in the middle, and an MCC Halo 2 profile on the right")

| Halo 2 Settings    | Description                                                                                                                                                                              | Notes
|------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------
| FBX                | Converts an FBX file to an ASS file that Tool can then read to convert to a level.                                                                                                       | This option only applies to an MCC profile
| Browse             | Pressing this button will ask the user to browse for a ASS or JMS to import with tool. The user can also select a scenario tag to light a level without the need for an ASS or JMS file. | If a scenario is selected then the only option for the user will be to light it.
| Import Only        | This is one option in a set of 3. If this option is set then only the level importing process will be started.                                                                           |
| Light Only         | This is one option in a set of 3. If this option is set then only the level lighting process will be started.                                                                            |
| Import and Light   | This is one option in a set of 3. If this option is set then the ASS or JMS will first be imported and then lit.                                                                         |
| Light Quality      | A dropdown the sets the quality to run the lightmapper at. First value takes the least amount of time while the last value takes the most time.                                          | See the **Halo 2 Light Quality Settings** table for more details.
| Light Config       | Sets some settings for the lightmapper                                                                                                                                                   | This option only applies to Halo 2 Vista profiles using community extensions.
| Use Tool Fast      | Run importing and lighting on tool_fast.exe for speedups                                                                                                                                 | This option only applies to an MCC profile
| Instance Output    | Enabling this option will keep instance windows open for debugging purposes.                                                                                                             | This option only applies to Halo 2 Vista profiles using community extensions.
| Instance Count     | Set the number of instances to run in a multi farm setup. Faster than running a single instance of Tool for lightmapping                                                                 | This option only applies to Halo 2 Vista profiles using community extensions.
| Import/Light level | Pressing this will run either level import and lighting commands with the settings set above.                                                                                            |

| Halo 2 Light Quality Settings | Notes                                                                                                                                                                              
|------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------
| Checkerboard                  |                                                                        
| Cuban                         | This option only applies to an MCC profile. Named after a Halo 2 dev who worked on lightmapping. Slightly better than checkerboard but not by much. 
| Draft Low                     |                                                                       
| Draft Medium                  |                                                                          
| Draft High                    |                                                      
| Draft Super                   |                                           
| Direct Only                   |                                                                                                                                           
| Low                           |                                                                                                                          
| Medium                        |                                                                               
| High                          |                                                                 
| Super                         | 
| Custom                        | This option only applies to Halo 2 Vista profiles using community extensions. Uses options set by the user to customize how the lightmapper runs.

## Halo 3 level settings

![](halo_three_level.jpg "An MCC Halo 3 profile")

| Halo 3 Settings    | Description                                                                                                                                                                              | Notes
|------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------
| FBX                | Converts an FBX file to an ASS file that Tool can then read to convert to a level.                                                                                                       |
| Browse             | Pressing this button will ask the user to browse for a ASS or JMS to import with tool. The user can also select a scenario tag to light a level without the need for an ASS or JMS file. | If a scenario is selected then the only option for the user will be to light it.
| Import Only        | This is one option in a set of 3. If this option is set then only the level importing process will be started.                                                                           |
| Light Only         | This is one option in a set of 3. If this option is set then only the level lighting process will be started.                                                                            |
| Import and Light   | This is one option in a set of 3. If this option is set then the ASS or JMS will first be imported and then lit.                                                                         |
| Light Quality      | A dropdown the sets the quality to run the lightmapper at. First value takes the least amount of time while the last value takes the most time.                                          | See the **Halo 3 Light Quality Settings** table for more details.
| Light Group        | A name for a region in a level. The lightmapper will only run on this section.                                                                                                           |
| Use Tool Fast      | Run importing and lighting on tool_fast.exe for speedups                                                                                                                                 |
| Instance Output    | Enabling this option will keep instance windows open for debugging purposes.                                                                                                             |
| Instance Count     | Set the number of instances to run in a multi farm setup. Faster than running a single instance of Tool for lightmapping                                                                 |
| Import/Light level | Pressing this will run either level import and lighting commands with the settings set above.                                                                                            |

| Halo 3 Light Quality Settings | Notes                                                                                                                                                                              
|------------------------------ | -----------------------------------------------
| Checkerboard                  | This option does not work in multi farm setups.
| Direct Only                   |    
| Draft                         |     
| Debug                         |                                                                                                                                       
| Low                           |                                                                                                                          
| Medium                        |                                                                               
| High                          |                                                                 
| Super                         | 
