# File List
[Multiple Skies Example Blend](https://drive.google.com/file/d/1k55u_cATxIHayTQeFGjXz58tlTpUuCV2/view?usp=sharing) -> A blend file showcasing how to use multiple skies in a level.

[Weather Portals Example Blend](https://drive.google.com/file/d/1Nfjg2E7CP_rxpt9UIshCljRT3pCMkfXD/view?usp=sharing) -> A blend file showcasing how to use the special +weatherpoly material in a level.
<br><br/>

# Multiple skies
It's possible to use multiple skies in your level by adding a digit to the end of your "+sky" material. If we wanted three skies in our level for example we would have...

```
+sky0
+sky1
+sky2
```

It's important that the digit at the end of the material starts at zero. The digit will be used as an index by the cluster to get a sky tag reference from the skies tag block. You'll also have to make sure that a cluster does not use more than one sky or you will get an error on import.

If you were not aware a cluster is a section of a level divided by a portal. In the case of the provided blend file above there are 7 clusters. If a map has no portals then it is one cluster. Be sure to also prevent multiple skies from being able to be seen by the player at once. The player will see a sudden transition otherwise. Tool will output a warning if a sky can see another sky.

Avoid using this on regular shaders. You'll get tool warnings about duplicate shaders otherwise. This means avoiding digits at the end of your material names unless it's a sky material and avoiding numbers in shader tags. Use letters if you need to make variants.
<br><br/>

# Weather Portals
Lets say you wanted to have weather on tutorial. You may notice that either your weather effects go through the walls of your structure or that it instantly disappears the moment you enter the hallway. This can be quite jarring so naturally there is a solution for this that mappers can implement. The +weatherpoly material is assigned to polyhedron geometry to create a volume that deletes any spawned effects that enter the volume. You can see an example of this in blend file provided above.

You can compare the videos below to see the difference.

Here's what the hallway looks like without a weatherpoly volume.

<a href="5B.mp4" target="_blank">
	<video controls>
		<source src="5B.mp4" type="video/mp4">
	</video>
</a>

Here's what the hallway looks like with a weatherpoly volume.

<a href="5C.mp4" target="_blank">
	<video controls>
		<source src="5C.mp4" type="video/mp4">
	</video>
</a>

The weatherpoly geometry in a cluster is used to generate a polyhedron from the area they cover. There can be a max of 8 on screen at any given time. Any weatherpolys that go over this limit will have no effect. Sapien will print a message in the console if you hit this limit.
<br><br/>

# Markers
You can use markers to snap objects to a specific location in a level. You can create a marker object by adding a mesh object to your scene and having the first character of the name use a "#" symbol.

<a href="5D.png" target="_blank">
	<img src="5D.png" title="An example of a marker in a scene." style="max-width: 400px; height: auto; "/>
</a>

Once the level is compiled you can toggle the "Snap to markers" checkbox in the Tool window.

<a href="5E.png" target="_blank">
	<img src="5E.png" title="Here is where you can find the option along with what should show up in the game view once you enable it." style="max-width: 400px; height: auto; "/>
</a>

Once the option is enabled all markers in the BSP will be rendered on screen. Spawning an object and moving it near the marker should snap the object's center of origin to the position of the marker. This can make it must easier to get exact positions for device machines and scenery.
<br><br/>

# Multiple BSPs
Want to have multiple BSPs in your scenario for an SP map? All you have to do is place multiple JMS files in the same models folder. Each JMS will be compiled into it's own unique structure_bsp tag for your scenario to use. Do not attempt to use multiple BSPs in an MP scenario as there is no way for this to properly work.
<br><br/>
