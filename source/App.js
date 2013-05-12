enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", components:[
			{content: "Enyo Earth"},
		]},
		{kind: "FittableColumns", fit: true, components:[
			{kind: "Accordion", style: "width: 300px;", headerHeight: 40, components: [

			    // First item of accordion
			    {kind: "SearchItem", name: "search", google_places_api_key: 'AIzaSyBSvrkeApSPIZ5hSU9F7nJrSv2kYqzMmFc', onCreatePlacemark: "createSearchPlacemark", onRemovePlacemark: "removeSearchPlacemark", onPanCamera: "panCamera"},

			    // Second item of accordion
			    {kind: "PlacesItem", name: "places", onSetView: "setView"},
			    
 				// Third item of accordion
			    {kind: "LayersItem", name: "layers", onGetGoogleEarth: 'getGoogleEarth'},

			]},
			{name: "google_earth", kind: "GoogleEarth", onEarthCreated: "earthLoaded", onKMLObjectLoaded: "KMLObjectLoaded", fit: true},
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", name: 'kmlbutton', content: "Add KML", ontap: "addKMLTap"},
			{kind: "onyx.InputDecorator", components: [
				{name: "input_kml", kind: "onyx.Input", style: "width:500px", placeholder: "Enter kml url here", value: "http://75.80.174.85/enyo-earth/kml/KML_Samples.kml"}
			]}
		]}
	],
	rendered: function() {
		this.inherited(arguments);

		//auto select first accordian panel
		var index = 0;
		this.$.accordion.toggleItem( this.$.accordion.getItems()[ index ]);
	},

	earthLoaded: function(inSender, inEvent) {

		//show nav
		this.$.google_earth.setNavigationVisibilty(this.$.google_earth.getInstance().VISIBILITY_SHOW);

		//show borders
		this.$.google_earth.toggleLayers(this.$.google_earth.getInstance().LAYER_BORDERS, true);

		//pan camera
		this.$.google_earth.panCamera(40, -90, 9000000);


		this.$.google_earth.setFlyToSpeed(0.4);
	},

	addKMLTap: function(inSender, inEvent) {
		//disable button
		this.$.kmlbutton.disabled = true;

		//get url
		var href = this.$.input_kml.getValue();

		//fetch kml
		this.$.google_earth.fetchKml(href);
	},

	KMLObjectLoaded: function(inSender, inEvent) {

		//enable button
		this.$.kmlbutton.disabled = false;

		//update place
		this.$.places.addKML(inEvent.kml);

		//show places accordian item
		this.$.accordion.toggleItem( this.$.accordion.getItems()[ 1 ]);
	},

	removeSearchPlacemark: function(inSender, inEvent) {
		this.$.google_earth.removePlacemark(inEvent.placemark);
	},
	
	createSearchPlacemark: function(inSender, inEvent) {
		var placemark = this.$.google_earth.addPlacemark(inEvent.name, inEvent.latitude, inEvent.longitude, 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
		this.$.search.placemark = placemark;
	},

	panCamera: function(inSender, inEvent) {
		this.$.google_earth.panCamera(inEvent.latitude, inEvent.longitude, inEvent.range);
	},

	getGoogleEarth: function(inSender, inEvent) {
		this.$.layers.updateGoogleEarth(this.$.google_earth);
	},

	setView:  function(inSender, inEvent) {
 		this.$.google_earth.getInstance().getView().setAbstractView(inEvent.kmlObject.getAbstractView());
	}



/*
	ontap: function(inSender, inEvent) {

var cam = this.$.google_earth.getCurrentView();

		console.log(cam.getLatitude());

		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().getLength())
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getType());
		//	console.log(this.$.google_earth.getInstance().getFeatures().getChildNodes().item(0).getFeatures().getChildNodes().item(0).getType());

		//	this.$.my_tree.createComponent(	{icon: "assets/file.png", content: "Alpha2"});
		//	this.$.my_tree.render();


	//	console.log(this.$.google_earth.getInstance().getElementByUrl('http://75.80.174.85/kml_example.kml#2').getType());
	
		//this.$.accordion.getItems()[ 2 ].$.borders.setValue(false);

	}*/
});
