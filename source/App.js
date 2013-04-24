enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Enyo Earth"},
		{kind: "FittableColumns", fit: true, components:[
			{kind: "Accordion", style: "width: 300px;", headerHeight: 40, onViewChange: "viewChanged", onInit: "onInit", components: [

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
			        {name: "info", kind: "Scroller", classes: "enyo-fit", components: [
					
						{kind: "onyx.Groupbox", style: "padding: 10px;", classes: "settings", components: [
							{kind: "onyx.GroupboxHeader", style: "padding: 10px;",content: "Layers"},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Borders"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{ style: "float: right;display: inline-block;", content:"Buildings"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Buildings Low Res"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Roads"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Terrain"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Trees"}
							]}
						]},
						{kind: "onyx.Groupbox", style: "padding: 10px;", classes: "settings", components: [
							{kind: "onyx.GroupboxHeader", style: "padding: 10px;",content: "Overlays"},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Scale Legend"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Status Bar"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Overview Map"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Grid"}
							]},
							{components:[
								{kind: "onyx.ToggleButton", onChange: "toggleChangedHandler", classes: "labeled-item-icon"},
								{style: "float: right;display: inline-block;", content:"Atmosphere"}
							]},
						]},
					]}
			    ]}

			]},
			{name: "google_earth", kind: "GoogleEarth", fit: true},
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Add KML", ontap: "addKMLTap"},
			{kind: "onyx.InputDecorator", components: [
				{name: "input_kml", kind: "onyx.Input", style: "width:300px", placeholder: "Enter kml url here"}
			]},
			{kind: "onyx.Button", content: "Tap", ontap: "ontap"},

		]}
	],
	rendered: function() {
		this.inherited(arguments);
console.log('test');
		//var index = 0;
		//this.$.accordion.toggleItem( this.$.accordion.getItems()[ index ] );
	},
	addKMLTap: function(inSender, inEvent) {
		var href = this.$.input_kml.getValue();
		//console.log(this.$.google_earth);
		this.$.google_earth.setOverviewMapVisibility(true);
	
		this.$.google_earth.setNavigationVisibilty(this.$.google_earth.getInstance().VISIBILITY_AUTO);


		this.$.google_earth.fetchKml('http://75.80.174.85/kml_example.kml');

		//console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().getLength())
	},
	ontap: function(inSender, inEvent) {
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().getLength())
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getType());
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getFeatures().getChildNodes().item(0).getType());

		//	this.$.my_tree.createComponent(	{icon: "assets/file.png", content: "Alpha2"});
		//	this.$.my_tree.render();


		console.log(this.$.google_earth.getInstance().getElementByUrl('http://75.80.174.85/kml_example.kml#2').getType());
	

	}
});
