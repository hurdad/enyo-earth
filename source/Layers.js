enyo.kind({
	name: "LayersItem",
	kind: "AccordionItem",
	handlers: {
        onChange: "toggle"
    },
    events:{
    	onGetGoogleEarth: ''
    },
	headerTitle: "Layers",
	contentComponents:[
	    {kind: "Scroller", classes: "enyo-fit", components: [
			{kind: "onyx.Groupbox", classes: "settings", components: [
				{kind: "onyx.GroupboxHeader", content: "Earth Layers"},
				{kind: "LabeledItem", name:'borders', label:"Borders", defaultKind: "onyx.ToggleButton", value: true},
				{kind: "LabeledItem", label:"Buildings", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Buildings Low Res", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Roads", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Terrain", defaultKind: "onyx.ToggleButton", value: true},
				{kind: "LabeledItem", label:"Trees", defaultKind: "onyx.ToggleButton"}
			]},
			{kind: "onyx.Groupbox", classes: "settings", components: [
				{kind: "onyx.GroupboxHeader", content: "Overlays"},
				{kind: "LabeledItem", label:"Scale Legend", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Status Bar", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Overview Map", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Grid", defaultKind: "onyx.ToggleButton"},
				{kind: "LabeledItem", label:"Atmosphere", defaultKind: "onyx.ToggleButton", value: true}
			]},
		]}
	],
	toggle: function(inSender, inEvent) {
		this.label = inEvent.originator.parent.getLabel();
		this.visibility = inEvent.originator.getValue();
		this.doGetGoogleEarth();
	},
	updateGoogleEarth: function(google_earth){

		if(google_earth === undefined || google_earth.getInstance() === undefined)
			return;

		var label = this.label;
		var visibility =  this.visibility

		if(label == "Borders")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_BORDERS, visibility);
		else if( label == "Buildings")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_BUILDINGS, visibility);
		else if( label == "Buildings Low Res")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_BUILDINGS_LOW_RESOLUTION, visibility);
		else if( label == "Roads")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_ROADS, visibility);
		else if( label == "Terrain")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_TERRAIN, visibility);
		else if( label == "Trees")
			google_earth.toggleLayers(google_earth.getInstance().LAYER_TREES, visibility);
		else if( label == "Scale Legend")
			google_earth.setScaleLegendVisibilty(visibility);
		else if( label == "Status Bar")
			google_earth.setStatusBarVisibility(visibility);
		else if( label == "Overview Map")
			google_earth.setOverviewMapVisibility(visibility);
		else if( label == "Grid")
			google_earth.setGridVisibility(visibility);
		else if( label == "Atmosphere")
			google_earth.setAtmosphereVisibility(visibility);

	}
});