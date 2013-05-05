enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	handlers: {
        onChange: "toggle"
    },
	components:[
		{kind: "onyx.Toolbar", components:[
			{content: "Enyo Earth"},
		]},
		{kind: "FittableColumns", fit: true, components:[
			{kind: "Accordion", style: "width: 300px;", headerHeight: 40, components: [

			    // First item of accordion
			    {kind: "AccordionItem", headerTitle: "Search", maxHeight: 200, contentComponents:[
			   		{style: "padding:10px;", components:[
				    	{kind: "onyx.InputDecorator", setAlwaysLooksFocused: true, components: [
							{name: "input_kml", kind: "onyx.Input", placeholder: "Address or Location"},
							{kind: "Image", src: "assets/search-input-search.png"}
						]},
					]}
			    ]},

			    // Second item of accordion
			    {kind: "AccordionItem", headerTitle: "Places", contentComponents:[
			        {kind: "Scroller", fit: true, components: [
						{kind: "Node", icon: "assets/folder-open.png", content: "My Places", expandable: true, expanded: true, onExpand: "nodeExpand", onNodeTap: "nodeTap", components: [
							{icon: "assets/file.png", content: "Alpha"},
						]},
					]}
			    ]},

			    // Second item of accordion
			    {kind: "AccordionItem", headerTitle: "Layers", contentComponents:[
			        {kind: "Scroller", classes: "enyo-fit", components: [
						{kind: "onyx.Groupbox", classes: "settings", components: [
							{kind: "onyx.GroupboxHeader", content: "Earth Layers"},
							{kind: "LabeledItem", name:'borders', label:"Borders", defaultKind: "onyx.ToggleButton", value: true},
							{kind: "LabeledItem", label:"Buildings", defaultKind: "onyx.ToggleButton"},
							{kind: "LabeledItem", label:"Buildings Low Res", defaultKind: "onyx.ToggleButton"},
							{kind: "LabeledItem", label:"Roads", defaultKind: "onyx.ToggleButton"},
							{kind: "LabeledItem", label:"Terrain", defaultKind: "onyx.ToggleButton"},
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
			    ]}
			]},
			{name: "google_earth", kind: "GoogleEarth", onEarthCreated: "earthLoaded", onKMLObjectLoaded: "KMLObjectLoaded", fit: true},
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Add KML", ontap: "addKMLTap"},
			{kind: "onyx.InputDecorator", components: [
				{name: "input_kml", kind: "onyx.Input", style: "width:300px", placeholder: "Enter kml url here", value: "http://code.google.com/apis/earth/documentation/samples/kml_example.kml"}
			]},
			{kind: "onyx.Button", content: "Tap", ontap: "ontap"},
		]}
	],
	rendered: function() {
		this.inherited(arguments);

		//auto select first accordian panel
		var index = 0;
		this.$.accordion.toggleItem( this.$.accordion.getItems()[ index ] );
	},

	earthLoaded: function(inSender, inEvent) {

		//show nav
		this.$.google_earth.setNavigationVisibilty(this.$.google_earth.getInstance().VISIBILITY_SHOW);

		//show borders
		this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_BORDERS, true);
		
	
	},

	toggle: function(inSender, inEvent) {
	
		if(this.$.google_earth === undefined || this.$.google_earth.getInstance() === undefined)
			return;

		var label = inEvent.originator.parent.getLabel();
		var visibility = inEvent.originator.getValue();

		if(label == "Borders")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_BORDERS, visibility);
		else if( label == "Buildings")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_BUILDINGS, visibility);
		else if( label == "Buildings Low Res")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_BUILDINGS_LOW_RESOLUTION, visibility);
		else if( label == "Roads")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_ROADS, visibility);
		else if( label == "Terrain")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_TERRAIN, visibility);
		else if( label == "Trees")
			this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_TREES, visibility);
		else if( label == "Scale Legend")
			this.$.google_earth.setScaleLegendVisibilty(visibility);
		else if( label == "Status Bar")
			this.$.google_earth.setStatusBarVisibility(visibility);
		else if( label == "Overview Map")
			this.$.google_earth.setOverviewMapVisibility(visibility);
		else if( label == "Grid")
			this.$.google_earth.setGridVisibility(visibility);
		else if( label == "Atmosphere")
			this.$.google_earth.setAtmosphereVisibility(visibility);
	},

	addKMLTap: function(inSender, inEvent) {
		var href = this.$.input_kml.getValue();
		this.$.google_earth.fetchKml(href);
	},

	KMLObjectLoaded: function(inSender, inEvent) {
		console.log(inSender);
	},

	ontap: function(inSender, inEvent) {
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().getLength())
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getType());
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getFeatures().getChildNodes().item(0).getType());

		//	this.$.my_tree.createComponent(	{icon: "assets/file.png", content: "Alpha2"});
		//	this.$.my_tree.render();


	//	console.log(this.$.google_earth.getInstance().getElementByUrl('http://75.80.174.85/kml_example.kml#2').getType());
	
	this.$.accordion.getItems()[ 2 ].$.borders.setValue(false);

	}
});
