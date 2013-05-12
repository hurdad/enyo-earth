/**
 * The maps api is loaded using the Google Loader. Include
 * <script type="text/javascript" src="https://www.google.com/jsapi"></script>
 * in your index.html to use this component.
 */
enyo.kind({
	name: 'GoogleEarth',
	kind: 'Control',
	published: {
		apiVersion: '1',
		otherMapParams: ''
	},
	events: {
		onEarthCreated: '',
		onKMLObjectLoaded: ''
	},
	constructor: function () {
		this.inherited(arguments);
	},
	components: [{
			name: 'earth',
			classes: 'enyo-google-earth'
		}
	],
	//* @protected
	create: function () {
		this.inherited(arguments);
		this.load();
	},
	load: function () {
		google.load('earth', this.apiVersion, {
			other_params: this.otherMapParams
		});

		google.setOnLoadCallback(enyo.bind(this, 'init'));
	},
	init: function () {
		if (this.$.earth.hasNode()) 
      		google.earth.createInstance(this.$.earth.node, enyo.bind(this, 'initCB'), enyo.bind(this, 'failureCB'));
    },
    initCB: function(instance) {
		this.ge = instance;
		this.ge.getWindow().setVisibility(true);
		this.doEarthCreated();
    },
    failureCB: function(errorCode) {
    	console.log('google earth create instance failure: ' + errorCode)
    },
    fetchKmlCB: function(kmlObject){
   		if (kmlObject)
          this.ge.getFeatures().appendChild(kmlObject);
       	if (kmlObject.getAbstractView() !== null)
          this.ge.getView().setAbstractView(kmlObject.getAbstractView());

      	this.doKMLObjectLoaded({kml: kmlObject});
    },
    //* @public
    getInstance: function(){
    	return this.ge;
    },
    fetchKml: function(href){
        google.earth.fetchKml(this.ge, href, enyo.bind(this, 'fetchKmlCB'));
    },
    networkLinkKML: function(href, refreshVisibility, flyToView){
    	var link = ge.createLink('');
		link.setHref(href);
		var networkLink = ge.createNetworkLink('');
		networkLink.set(link, refreshVisibility, flyToView); // Sets the link, refreshVisibility, and flyToView
		ge.getFeatures().appendChild(networkLink);
    },
    toggleLayers: function(layer_name, visiblity){
		this.ge.getLayerRoot().enableLayerById(layer_name, visiblity);
    },
    setNavigationVisibilty: function(visiblity){
    	this.ge.getNavigationControl().setVisibility(visiblity);
    },
    setNavigationPosition: function(x_units, y_units){
    	this.ge.getNavigationControl().getScreenXY().setXUnits(x_units);
  		this.ge.getNavigationControl().getScreenXY().setYUnits(y_units);
    },
    setScaleLegendVisibilty: function(visiblity){
		this.ge.getOptions().setScaleLegendVisibility(visiblity);
    },
    setStatusBarVisibility: function(visiblity){
    	this.ge.getOptions().setStatusBarVisibility(visiblity);
    },
    setOverviewMapVisibility: function(visiblity){
    	this.ge.getOptions().setOverviewMapVisibility(visiblity);
    },
    setGridVisibility: function(visiblity){
    	this.ge.getOptions().setGridVisibility(visiblity);
    },
    setAtmosphereVisibility: function(visiblity){
    	this.ge.getOptions().setAtmosphereVisibility(visiblity);
    },
    setTerrainExaggeration: function(value){
    	this.ge.getOptions().setTerrainExaggeration(value);
	},
	setFlyToSpeed: function(value){
		this.ge.getOptions().setFlyToSpeed(value);
	},
	setFadeInOutEnabled: function(value){
		this.ge.getOptions().setFadeInOutEnabled(value);
	},
	panCamera: function(latitude, longitude, range){
		var lookAt = this.ge.createLookAt('');
		lookAt.setLatitude(latitude);
		lookAt.setLongitude(longitude);
		lookAt.setRange(range); 
		this.ge.getView().setAbstractView(lookAt);
	},
	removePlacemark: function(placemark){
		this.ge.getFeatures().removeChild(placemark);
	},
	addPlacemark: function(name, latitude, longitude, icon_href){
		//placemark
		var placemark = this.ge.createPlacemark('');  
		placemark.setName(name);
		//icon
		var icon = this.ge.createIcon('');
		icon.setHref(icon_href);
		var style = this.ge.createStyle(''); //create a new style
		style.getIconStyle().setIcon(icon); //apply the icon to the style
		placemark.setStyleSelector(style); //apply the style to the placemark
		//point
		var point = this.ge.createPoint('');
		point.setLatitude(latitude);
		point.setLongitude(longitude);
		placemark.setGeometry(point);
		this.ge.getFeatures().appendChild(placemark);
		//return
		return placemark;
	},
	addGroundOverlay: function(href, north, south, east, west, rotation){
		var groundOverlay = ge.createGroundOverlay('');
		var icon = ge.createIcon('');
		icon.setHref(href);
		groundOverlay.setIcon(icon);
		var latLonBox = ge.createLatLonBox('');
		latLonBox.setBox(north, south, east, west, rotation);
		groundOverlay.setLatLonBox(latLonBox);
		ge.getFeatures().appendChild(groundOverlay);
		return groundOverlay;
	},
	getCurrentView: function(){
		return this.ge.getView().copyAsLookAt(this.ge.ALTITUDE_RELATIVE_TO_GROUND);
	}
});