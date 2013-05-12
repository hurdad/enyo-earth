enyo.kind({
	name: "PlacesItem",
	kind: "AccordionItem",
	events: {
        onSetView: ''
    },
	headerTitle: "Places",
	contentComponents:[
		{kind: "Selection", onSelect: "select", onDeselect: "deselect"},
        {kind: "Scroller", fit: true, components: [
			{kind: "Node", name:"tree", icon: "assets/folder-open.png", content: "My Places", expandable: true, expanded: true, onExpand: "nodeExpand", onNodeTap: "nodeTap", onCheckboxChanged:"checkboxChanged"}
		]}
    ],
    //* @protected
    nodeExpand: function(inSender, inEvent) {
		inSender.setIcon("assets/" + (inSender.expanded ? "folder-open.png" : "folder.png"));
	},
	nodeTap: function(inSender, inEvent) {
	
		var node = inEvent.originator;
		this.$.selection.select(node.id, node);

		//zoom
		if(node.kml !== undefined && node.kml.getAbstractView() !== null)
			this.doSetView({kmlObject: node.kml});
	},
	select: function(inSender, inEvent) {
		inEvent.data.$.caption.applyStyle("background-color", "lightblue");
	},
	deselect: function(inSender, inEvent) {
		inEvent.data.$.caption.applyStyle("background-color", null);
	},
	checkboxChanged: function(inSender, inEvent) {
		var node = inEvent.originator;
		node.kml.setVisibility(inEvent.value);
		console.log(node)
		console.log(inEvent)
		

	},
	traverseKML: function(item, folder){
    	var i;
    	for(i = 0; i < item.getFeatures().getChildNodes().getLength(); i++){

    		//recursively scan folders
    		if(item.getFeatures().getChildNodes().item(i).getType() == 'KmlFolder'){
    			var new_folder = folder.createComponent({icon: "assets/folder.png", content: item.getFeatures().getChildNodes().item(i).getName(), expandable: true, expanded: false, kml: item.getFeatures().getChildNodes().item(i)});
    			this.traverseKML(item.getFeatures().getChildNodes().item(i), new_folder);
    		} else{
    			folder.createComponent({icon: "assets/file.png", checkbox: item.getFeatures().getChildNodes().item(i).getVisibility(), content: item.getFeatures().getChildNodes().item(i).getName(), kml: item.getFeatures().getChildNodes().item(i)});	
    		}
    	}
    },
	//* @public
    addKML: function(kml){
    	this.traverseKML(kml, this.$.tree);
    	this.$.tree.render();
    }
});