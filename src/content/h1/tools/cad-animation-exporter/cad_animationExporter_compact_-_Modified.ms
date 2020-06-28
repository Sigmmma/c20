maxVer = undefined
lastPath = "C:\\Program Files\\Microsoft Games\\Halo Custom Edition\\data\\"
outputPath = undefined
outputFile = undefined

frameCount = 0
nodeListChecksum = 0
nodeNames = #()
nodeArray = #()
nodeArraySorted = #()
nodeChildIndices = #()
nodeFirstChildIndices = #()
nodeNextSiblingIndices = #()
rootSceneNode = undefined

rollout animExport "Anim Exporter" width:150 height:125
(
	groupBox groupMethod "Max Version: " pos:[7,2] width:136 height:68
	label methodLbl "Method" pos:[16,17] width:37 height:13
	radioButtons methodSel "" pos:[16,32] width:108 height:32 labels:#("Export to File", "Stream to Listener") columns:1 visible:true
	radioButtons methodSelEx "" pos:[16,32] width:108 height:32 labels:#("Export to File") columns:1 visible:false
	radioButtons methodSelSt "" pos:[16,47] width:108 height:32 labels:#("Stream to Listener") columns:1 visible:false
	button exportAnim "Export Animation" pos:[7,77] width:136 height:25
	label credits "Zteam - CtrlAltDestroy" pos:[7,107] width:103 height:13 enabled:false
	
	fn calcNodeListChecksum =
	(
		nodeListCheck = 0
		for i = 1 to nodeArraySorted.count do
		(
			nodeCheck = 0
			for j = 1 to nodeArraySorted[i].name.count do (nodeCheck += bit.charAsInt nodeArraySorted[i].name[j])
			nodeCheck *= (nodeArraySorted.count * (nodeFirstChildIndices[i] + nodeNextSiblingIndices[i]))
			nodeListCheck += nodeCheck
		)
		return nodeListCheck
	)
	
	fn flushInstances =
	(
		frameCount = 0
		nodeListChecksum = 0
		nodeNames = #()
		nodeArray = #()
		nodeArraySorted = #()
		nodeChildIndices = #()
		nodeFirstChildIndices = #()
		nodeNextSiblingIndices = #()
		rootSceneNode = undefined
	)
	
	fn indexNodes =
	(
		failed = false
		
		try
		(
			nodeArray = (($'frame*' as array) + ($'bip01*' as array))
			nodeArray = for i in nodeArray where (not i.isHidden) collect i
			for w = 1 to nodeArray.count do
			(
				if (nodeArray[w].parent != undefined) then
				(
					if (((substring nodeArray[w].parent.name 1 5 as name) != ("frame" as name)) and ((substring nodeArray[w].parent.name 1 5 as name) != ("bip01" as name))) then
					(
						failed = true
						exit
					)
				)
			)
			if not failed then
			(
				for i = 1 to nodeArray.count do
				(
					if (nodeArray[i].parent == undefined) then
					(
						if (rootSceneNode != undefined) then
						(
							failed = true
							exit
						)
						else
						(
							rootSceneNode = nodeArray[i]
							nodeArray[i].name = ("01" + nodeArray[i].name)
						)
					)
					else
					(
						tempParentNode = nodeArray[i].parent
						n = 1
						do
						(
							tempRootSceneNode = tempParentNode
							tempParentNode = tempParentNode.parent
							n += 1
						)
						while (tempParentNode != undefined)
						
						if (tempRootSceneNode != rootSceneNode) then
						(
							failed = true
							exit
						)
						else
						(
							if n < 10 then (nodeArray[i].name = ("0" + (n as string) + nodeArray[i].name))
							else (nodeArray[i].name = ((n as string) + nodeArray[i].name))
						)
					)
				)
				if not failed then
				(
					nodeNames = for j in nodeArray collect j.name
					sort nodeNames
					for k = 1 to nodeArray.count do (nodeArraySorted[k] = getNodeByName nodeNames[k])
					for h = 1 to nodeArray.count do (nodeArray[h].name = (substring nodeArray[h].name 3 -1))
					nodeNames = for j in nodeArray collect j.name
					
					for b = 1 to nodeArraySorted.count do
					(
						tempNodeChildIndices = #()
						for c = 1 to nodeArraySorted[b].children.count do
						(
							tempNodeChild = nodeArraySorted[b].children[c]
							if (tempNodeChild != undefined) then
							(
								tempChildIndex = findItem nodeArraySorted tempNodeChild
								if	(tempChildIndex != 0) then (append tempNodeChildIndices tempChildIndex)
							)
						)
						nodeChildIndices[b] = tempNodeChildIndices
						if (nodeChildIndices[b].count == 0) then (nodeFirstChildIndices[b] = 0)
						else
						(
							sort nodeChildIndices[b]
							nodeFirstChildIndices[b] = nodeChildIndices[b][1]
						)
					)
					
					nodeNextSiblingIndices[1] = 0
					for s = 1 to nodeChildIndices.count do
					(
						if ((nodeChildIndices[s].count < 2) and (nodeChildIndices[s][1] != undefined)) then (nodeNextSiblingIndices[nodeChildIndices[s][1]] = 0)
						else
						(
							for f = 1 to nodeChildIndices[s].count do
							(
								if (f == nodeChildIndices[s].count) then (nodeNextSiblingIndices[nodeChildIndices[s][f]] = 0)
								else (nodeNextSiblingIndices[nodeChildIndices[s][f]] = nodeChildIndices[s][f + 1])
							)
						)
					)
				)
			)
			if failed then
			(
				for i in nodeArray do
				(
					if (((substring i.name 1 5 as name) != ("frame" as name)) and ((substring i.name 1 5 as name) != ("bip01" as name))) then (i.name = (substring i.name 3 -1))
					nodeNames = #()
					nodeArraySorted = #()
				)
			)
			
		)
		catch
		(
			failed = true
		)
		
		return failed
	)
	
	fn writeAnim target =
	(
		frameCount = ((animationRange.end as integer)/160) + 1
		nodeListChecksum = calcNodeListChecksum()
		
		format "%\n" 16392 to:target
		format "%\n" frameCount to:target
		format "%\n" frameRate to:target
		format "%\n" 1 to:target
		format "%\n" "unnamedActor" to:target
		format "%\n" nodeArraySorted.count to:target
		format "%\n" nodeListChecksum to:target
		
		for i = 1 to nodeArraySorted.count do
		(
			format "%\n" nodeArraySorted[i].name to:target
			format "%\n" (nodeFirstChildIndices[i] - 1) to:target
			format "%\n" (nodeNextSiblingIndices[i] - 1) to:target
		)
		
		tempNodes = #()
		for a = 1 to nodeArraySorted.count do
		(
			tempNode = Box length:0.5 width:0.5 height:0.5
			tempNode.name = ("temp__" + nodeArraySorted[a].name)
			tempNode.wirecolor = color 255 0 0
			tempNodes[a] = tempNode
		)
		for b = 1 to tempNodes.count do
		(
			try (tempNodes[b].parent = tempNodes[(findItem nodeArraySorted nodeArraySorted[b].parent)])
			catch ()
		)
		
		max tool animmode
		set animate on
		
		sliderTime = 0
		for j = 1 to frameCount do
		(
			for d = 1 to tempNodes.count do (tempNodes[d].transform = nodeArraySorted[d].transform)
			for k = 1 to nodeArraySorted.count do
			(
				in coordsys parent nodePosition = tempNodes[k].pos
				in coordsys parent tempNodeRotation = tempNodes[k].rotation
				nodeRotation = quat -tempNodeRotation.x -tempNodeRotation.y -tempNodeRotation.z tempNodeRotation.w
				in coordsys parent nodeScale = (tempNodes[k].scale.x + tempNodes[k].scale.y + tempNodes[k].scale.z)/3
				
				format "%\t%\t%\n" nodePosition.x nodePosition.y nodePosition.z to:target
				format "%\t%\t%\t%\n" nodeRotation.x nodeRotation.y nodeRotation.z nodeRotation.w to:target
				format "%\n" nodeScale to:target
			)
			if (j != frameCount) do (sliderTime += 1)
		)
		format "\n// exported with zteam animation exporter\n\n" to:target
		
		max tool animmode
		set animate off
		try (delete tempNodes)
		catch ()
		tempNodes = #()
		
		sliderTime = 0
	)
	
	on animExport open do
	(
		maxVer = maxVersion ()
		maxVer = maxVer[1]/1000.0
		maxVerStr = maxVer as string
		if (maxVer == 4.2) then (maxVerStr += " (gmax)")
		
		groupMethod.caption += maxVerStr
		if (maxVer <= 4.2) then
		(
			methodSel.visible = false
			methodSelEx.visible = true
			methodSelEx.enabled = false
			methodSelEx.state = 0
			methodSelSt.visible = true
			methodSelSt.enabled = true
			methodSelSt.state = 1
		)
	)
	
	on exportAnim pressed do
	(
		flushInstances ()
		if ((maxVer <= 4.2) or (methodSel.state == 2)) then
		(
			failed = indexNodes ()
			if failed then (messageBox "Node indexing failed" title:"Error")
			else
			(
				try
				(
					clearListener ()
					format "-----animation starts here---------------------------------------------\n\n" to:listener
					writeAnim listener
					format "-----animation ends here---------------------------------------------\n\n" to:listener
					messageBox "Done" title:"Done"
				)
				catch (messageBox "Animation export failed" title:"Error")
			)
			flushInstances ()
		)
		else
		(
			outputPath = getSaveFileName	caption:"Save Animation Source File" \
											filename:lastPath \
											types:"JMA file (*.JMA)|*.JMA|JMO file (*.JMO)|*.JMO|JMR file (*.JMR)|*.JMR|JMM file (*.JMM)|*.JMM|JMT file (*.JMT)|*.JMT|JMW file (*.JMW)|*.JMW|JMZ file (*.JMZ)|*.JMZ|All files (*.*)|*.*|"
			if (outputPath != undefined) then
			(
				lastPath = getFilenamePath outputPath
				outputFile = createFile outputPath
				if (outputFile != undefined) then
				(
					failed = indexNodes ()
					if failed then (messageBox "Node indexing failed" title:"Error")
					else
					(
						try
						(
							writeAnim outputFile
							messageBox "Done" title:"Done"
						)
						catch (messageBox "Animation export failed" title:"Error")
					)
					flushInstances ()
					try (close outputFile)
					catch ()
				)
				else (messageBox "File creation failed" title:"Error")
			)
		)
	)
)

createDialog animExport