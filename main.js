 function initialize() {
 //access input fields in BASIC menu
 	var inputfieldWidth = document.getElementById('width');
 	var inputfieldHeight = document.getElementById('height');
 	var inputfieldZoom = document.getElementById('zoom');
 	var inputfieldLat = document.getElementById('lat');
 	var inputfieldLng = document.getElementById('lng');
 	var inputfieldMarkerON = document.getElementById("markerON");
 	var inputfieldMarkerOFF = document.getElementById("markerOFF");
 	var inputfieldMarkerLat = document.getElementById('markerLat');
 	var inputfieldMarkerLng = document.getElementById('markerLng');


 //access multiple level of menu items
 	var previewAreaOnMapList = document.getElementsByClassName("previewAreaOnMap");
 	var mainMenuOptionList = document.getElementsByClassName("mainMenuOption");
 	var embeddingLevel1List = document.getElementsByClassName("embeddingLevel1");

//access input fields in custommization panel
 	var setColorInputList = document.getElementsByClassName("setColor");
 	var setWeightInputList = document.getElementsByClassName("setWeight");
 	var setVisibilityInputList = document.getElementsByClassName("setVisibility");
 	var labels = document.getElementsByTagName("LABEL")
 
 //

    var colorLabelInputConnection = {},
    label;

for (var i = 0; i < labels.length; i++) {
    label = labels[i];
    if (document.getElementById(label.htmlFor)) {
        colorLabelInputConnection[label.htmlFor] = label;
    }
}	

//setup the original styles and values for the map
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(47.5403, 19.0463),
        zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP, SATELLITE, HYBRID, or TERRAIN
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	var originalStyle = [
		{
		featureType: 'road', //administrative, landscape, poi, road, transit, water
		elementType: 'geometry', //geometry(.icon, .text), labels(.stroke, .fill), all 
		stylers: [
		{ color: '#FF7700' }//weight, visibility, color, hue, lightness, saturation
		]
	}, {
	    featureType: 'water',
	    elementType: 'geometry',
	    stylers: [
	    { color: '#022B30'  }
	    ]
	}, {
	    featureType: 'landscape',
	    elementType: 'geometry',
	    stylers: [
	    { color: '#F09E56' }

	    ]
	}, {
	    featureType: 'administrative.country',
	    elementType: 'geometry.stroke',
	    stylers: [
	    { hue: '#ff0000' },
	    { lightness: -15 },
	    { saturation: 50 }
	    ]
	}, {
	    featureType: 'all',
	    elementType: 'labels.text',
	    stylers: [
	    { hue: '#ff0000' },
	    { lightness: -15 },
	    { saturation: 50 }
	    ]
	}
	];

	var originalStyle = [
		{
	    featureType: 'all',
	    elementType: 'all',
	    stylers: [
	    	{ color: '#bbbbbb' }
	    ]
	},
	{
	    featureType: 'all',
	    elementType: 'labels.text.stroke',
	    stylers: [
	    	{ visibility: 'off' }
	    ]
	},
	{
	    featureType: 'administrative',
	    elementType: 'labels.text.fill',
	    stylers: [
	    	{  visibility: 'off' }
	    ]
	},  
	{
	    featureType: 'water',
	    elementType: 'all',
	    stylers: [
	    	{ color: '#eeeeee' }
	    ]
	}
	];
	
	map.set('styles', originalStyle);
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var myLatLng =  new google.maps.LatLng(47.5403, 19.0463);

//functions that change map when user changes BASIC map settings
	var mapCSS = document.getElementById("map");

	inputfieldWidth.onchange = function() {
		mapCSS.style.width = inputfieldWidth.value + "vw";
		google.maps.event.trigger(map, 'resize');
	};

	inputfieldHeight.onchange = function() {
		mapCSS.style.height = inputfieldHeight.value + "vh";
		google.maps.event.trigger(map, 'resize');
	};

	inputfieldZoom.onchange = function() {
		var zoom = inputfieldZoom.value * 1;
    	map.setZoom(zoom);
	};

	inputfieldLat.onchange = function() {
		var lng = map.getCenter().lng();
		var newCenter = new google.maps.LatLng(inputfieldLat.value*1, lng);
    	map.setCenter(newCenter);
    	marker.setPosition(newCenter);
	};

	inputfieldLng.onchange = function() {
		var lat = map.getCenter().lat();
		var newCenter = new google.maps.LatLng(lat, inputfieldLng.value*1);
    	map.setCenter(newCenter);
    	marker.setPosition(newCenter);
	};

	inputfieldMarkerON.onchange = function() {
		inputfieldMarkerLat.disabled = false;
		inputfieldMarkerLng.disabled = false;
	};

	inputfieldMarkerOFF.onchange = function() {
		inputfieldMarkerLat.disabled = true;
		inputfieldMarkerLng.disabled = true;
	};

	

//preview the area which is goung to be effected on hover on CUSTOMIZATION menu items 
	for (var i=0; i < previewAreaOnMapList.length; i++) {
		previewAreaOnMapList[i].onmouseover = function() {
			var area = this.id;
			
			var mapStyle = {
				featureType: area,
		    	elementType: 'all',
				stylers: [
				{ color: "#087F6A" },
				{visibility:'on'}
				]
			};

			originalStyle.push(mapStyle);
			map.set('styles', 
				originalStyle
			);
	    };

	    previewAreaOnMapList[i].onmouseleave = function() {
			originalStyle.pop();
			map.set('styles', 
				originalStyle
			);
	    };
	}

//expand collapsed submenu on click on main menu
	for (var i=0; i < mainMenuOptionList.length; i++) {

	    mainMenuOptionList[i].onclick = function() {

	    	var mainMenuOption = this.id;

			var embeddingLevel1 = document.querySelectorAll(".mainMenuOption:hover+.embeddingLevel1")[0];

			if (embeddingLevel1.className.indexOf("collapse") > -1) {

				var expandedItem = document.querySelectorAll(".embeddingLevel1.expand");

				if (expandedItem.length>0) {
					expandedItem[0].className = "embeddingLevel1 collapse"
				}
				embeddingLevel1.className = "embeddingLevel1 expand";
			} else {
				embeddingLevel1.className = "embeddingLevel1 collapse";
			};

//expand customization panel on click on submenu
			var embeddingLevel1List = document.querySelectorAll(".subMenuOption");
			for (var i=0; i < embeddingLevel1List.length; i++) {


			    embeddingLevel1List[i].onclick = function() {

					var embeddingLevel2 = document.querySelectorAll(".subMenuOption:hover+.embeddingLevel2")[0];

					if (embeddingLevel2.className.indexOf("collapse") > -1) {

						var expandedItem = document.querySelectorAll(".embeddingLevel2.expand");

						if (expandedItem.length>0) {
							expandedItem[0].className = "embeddingLevel2 collapse"
						}
						embeddingLevel2.className = "embeddingLevel2 expand";
					} else {
						embeddingLevel2.className = "embeddingLevel2 collapse";
					};
				};
		}
		};
	}

//function to change area`s color/visibility/weight based on user input

function changeMapStyle(stylerType, InputList) {

		for (var i=0; i < InputList.length; i++) {

			    InputList[i].onchange = function() {

//create styler object based on function`s input (styler type) and on input value given by the user
					var stylerValue = this.value;
					
					if (stylerType === "color") {
						var stylerObject = {color:stylerValue};
						var associatedLabel = colorLabelInputConnection[this.id];
						associatedLabel.style.backgroundColor = stylerValue;
					} else if (stylerType === "weight") {
						var stylerObject = {weight:stylerValue};
					} else if (stylerType === "visibility") {
						var stylerObject = {visibility:stylerValue};
					};
					
//assign value to fillORstroke based on changed input`s class  name ("" is only an option when textORgeometry is labels.icon)
					if (this.className.indexOf("fill") > -1) {
						var fillORstroke = ".fill";
					} else if (this.className.indexOf("stroke") > -1) {
						var fillORstroke = ".stroke";
					} else {
						var fillORstroke = "";
					}

//assign value to textORgeometry based on changed input`s class  name 
					if (this.className.indexOf("geometry") > -1) {
						var textORgeometry = "geometry";
					} else if (this.className.indexOf("text") > -1) {
						var textORgeometry = "labels.text";
					} else if (this.className.indexOf("icon") > -1) {
						var textORgeometry = "labels.icon";
					}

//assign value to elementType by concatenating textORgeometry with fillORstroke
					var elementType = textORgeometry + fillORstroke;

//assign value to featureType based on changed input`s class name starting with "featureType"		
					var origFeatureType = this.className.match(/featureType(\w*)/)[1];
					var featureType = "";
					for (n in origFeatureType) {
						if (origFeatureType[n] === origFeatureType[n].toUpperCase()  && n>0 && origFeatureType[n] !== "_") {
							featureType = featureType + "." + origFeatureType[n].toLowerCase()
						}
						else {
							featureType = featureType + origFeatureType[n];
						}
					}

//create new map style 
					var mapStyle = {
						featureType: featureType,
				    	elementType: elementType,
						stylers: [
						stylerObject
						]
					};

//change map styling
					originalStyle.push(mapStyle);
					map.set('styles', 
						originalStyle
					);
		};
	};

}

//change the color of selected area
changeMapStyle("color", setColorInputList);

//change the visibility of selected area
changeMapStyle("visibility", setVisibilityInputList);

//change the weight of selected area
changeMapStyle("weight", setWeightInputList);


	

}

function modify () {
	window.alert("sg");
	var width = document.getElementById('width').value;
	map.style.width = width;
}


window.onload = initialize();