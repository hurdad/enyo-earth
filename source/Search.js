enyo.kind({
	name: "SearchItem",
	kind: "AccordionItem",
	headerTitle: "Search",
	events:{
		onCreatePlacemark: '',
		onRemovePlacemark: '',
		onPanCamera: ''
	},
	published:{
		placemark: '',
		google_places_api_key: ''
	},
	maxHeight: 200, 
	contentComponents:[
    	{kind: "onyx.InputDecorator", setAlwaysLooksFocused: true, classes: "search-input", components: [
			{kind: "onyx.Input", name: "searchinput", placeholder: "Address or Place", oninput: "searchChange"},
			{kind: "Image", style: "float:right", src: "assets/search-input-search.png"}
		]},
		{name: "list", kind: "List", classes: "list", fit: true, onSetupItem: "setupItem", components: [
        	{name: "item", ontap: "itemTap", classes: "item enyo-border-box", components: [
            	{name: "description", tag: "span"}
            ]},
        ]}
	],
	searchChange:  function(inRequest, inResponse) {

		//google autocomplete api
		var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + this.$.searchinput.getValue().replace(' ', '+') + "&key=" + this.google_places_api_key + "&sensor=false"

	    var request = new enyo.Ajax({
	        url: "proxy.php"
	    });

	    request.response(enyo.bind(this, "processAutoComplete"));

		request.go({
			url: encodeURIComponent(url)
		});

	},
	processAutoComplete: function(inRequest, inResponse) {

		//get results and save
		if(inResponse && inResponse.status === "OK"){
        	this.results = inResponse.predictions;

	        //force setupItem
	        this.$.list.setCount(this.results.length);
	        this.$.list.reset();
		}else{
			console.log('google autocomplete api error: ' + inResponse.status)
		}
	},
	setupItem: function(inSender, inEvent) {

    	//init vars
    	var i = inEvent.index;
        var item = this.results[i];

        //set content
        this.$.description.setContent(item.description);

        //color on select
        this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));

    },
    itemTap: function(inSender, inEvent) {
	
    	if(this.placemark)
    		this.doRemovePlacemark({placemark: this.placemark});

		//get item
		var item = this.results[inEvent.index];

		//get latlong via reference
		var url = "https://maps.googleapis.com/maps/api/place/details/json?reference=" + item.reference + "&key=" + this.google_places_api_key + "&sensor=false";

	    var request = new enyo.Ajax({
	        url: "proxy.php"
	    });

	    request.response(enyo.bind(this, "processPlaceReference"));

		request.go({
			url: encodeURIComponent(url)
		});
	},
	processPlaceReference: function(inRequest, inResponse) {
	
		//get results place placemark and pan
		if(inResponse && inResponse.status === "OK"){
			this.doCreatePlacemark({name: inResponse.result.formatted_address, latitude: inResponse.result.geometry.location.lat, longitude: inResponse.result.geometry.location.lng});
			this.doPanCamera({latitude: inResponse.result.geometry.location.lat, longitude: inResponse.result.geometry.location.lng,  range:10000});
		}else{
			this.console.log('google place api error: ' + inResponse.status)
		}
	}
});