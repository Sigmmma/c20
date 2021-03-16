# Introduction
Recorded animations are a simple way for designers to animate a scene using ingame tools without any need for animating a scene in 3D modeling software. This feature allows you to record your inputs and save them for playback. They can then be invoked through a script to have a unit play out the prerecorded inputs. We will go over how recorded animations in the toolset works.

```.alert danger
Be warned that recordings done after reloading a scenario in Sapien may cause stability issues. Try to keep it to your first scenario load.
```

# Entering Scripted Camera Mode
You will need to set your editor mode so that we can start using recording commands. Find the toolbar in the top left and select the camera icon. This will set your Sapien instance to scripted camera mode.

![](A.png "Make sure you've selected this. You won't be able to use any of the hotkeys said below if you aren't using this mode.")

Some additional notes for this section. There are some new hotkeys you gain access to in this mode.

* <kbd>A</kbd>: Toggle "Attach camera to unit" option.
* <kbd>E</kbd>: Toggle "Edit camera point" option.
* <kbd>C</kbd>: Toggle "Scripted camera control".
* <kbd>Space</kbd>: Current game view camera position is used to create a new camera point if "Edit camera point" is disabled. If "Edit camera point" is enabled then it instead moves the "Active camera point" to the current position of the game view camera.

# Taking Over a Unit
We will need to pick a unit for us to take over. A unit here is typically a biped or a biped in a vehicle placed in your scene. Look over to your game window and look at a biped you wish to take over. Once you've made your choice go ahead and left click on the biped directly. A sphere should encircle the biped and gradually shrink. This indicates that you have selected the unit.

```.alert danger
Do not attempt to select the unit from the hierarchy list. You must select the unit from the game window screen.
```

Once the unit is selected you can press the following keys to take over the unit

* <kbd>Shift + V</kbd>: Some additional notes for this section. There are some new hotkeys you gain access to in this mode.
* <kbd>Backspace</kbd>: Toggle "Camera type". Pressing this key will cycle between 3 modes for your camera.
	* First Person
	* Third Person
	* Flycam

# Begin Recording
Now that you've taken over the unit you should see a view that looks pretty similar to a standard ingame session. Press the following key to begin a recording.

<kbd>Caps lock</kbd>

![](B.png "If you want some flashy effects for your high speed chase.")

Pressing the above key will bring up a simple menu. Here you can type in script functions that will execute when you click ok. No idea for what or if they are recorded. Leave it empty or click cancel if you don't want to run any scripts. Type in a script function and hit ok if you do.

![](C.png "Numbers and stuff")

Once you've moved on past this menu you should notice some new details in output giving you the current information for your recording. Total frames should starting increasing, indicating that the recording is currently in progress. Take a quick walk around the level and join me at the next section when you're ready.

# Saving your Recording
Now that you've done everything you need to you can press the following key to bring up a menu to save it.

<kbd>Caps lock</kbd>

Pressing this key will end the recording and bring up the following menu.

![](D.png "Name it something funny")

Clicking "Don't Save" will throw the recorded animation data away while saving it will place the data under the hierarchy folder named "Recorded animations".

# Playing your Recording
In order to play the recording on a unit you will have to call it through a script function. The script function we will be using in this example is as follows.

recording_play (**INSERT UNIT NAME HERE**) (**INSERT RECORDED ANIMATION NAME HERE**)

e.g., recording_play elite_1_2 jumping
