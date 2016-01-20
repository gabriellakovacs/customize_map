 function initialize() {
 //VARIABLES
 //access input fields in BASIC menu
 	var inputfieldWidth = document.getElementById('width'),
 		inputfieldHeight = document.getElementById('height'),
 		inputfieldZoom = document.getElementById('zoom'),
 		inputfieldLat = document.getElementById('lat'),
 		inputfieldLng = document.getElementById('lng'),
 		inputfieldMarkerON = document.getElementById("markerON"),
 		inputfieldMarkerOFF = document.getElementById("markerOFF"),
 		inputfieldMarkerLat = document.getElementById('markerLat'),
 		inputfieldMarkerLng = document.getElementById('markerLng');

 //access multiple level of menu items
 	var previewAreaOnMapList = document.getElementsByClassName("previewAreaOnMap"),
 		mainMenuOptionList = document.getElementsByClassName("mainMenuOption"),
 		embeddingLevel1List = document.getElementsByClassName("embeddingLevel1");

//access input fields in custommization panel
 	var setColorInputList = document.getElementsByClassName("setColor"),
 		setWeightInputList = document.getElementsByClassName("setWeight"),
 		setVisibilityInputList = document.getElementsByClassName("setVisibility"),
 		labels = document.getElementsByTagName("LABEL"),
 		weightAddList = document.getElementsByClassName("add"),
 		weightSubList = document.getElementsByClassName("sub");

 //access code genarating elements
 	var codeContainer =  document.getElementById("codeContainer"),
 		getCode = document.getElementById("getCode");
 
 //the change/click event on some items should trigger a change on another, related item. for ease of access collect these related items together
 //put color labels with their belonging color inputs together

    var colorLabelInputDict = {},
    label;

	for (var i = 0; i < labels.length; i++) {
	    label = labels[i];
	    if (document.getElementById(label.htmlFor)) {
	        colorLabelInputDict[label.htmlFor] = label;
	    }
	}

/*------------------------------------------------------------------------------------------------------------*/
//setup the original styles and values for the map
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(47.5403, 19.0463),
        zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	var originalStyle = [
		{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
		{ color: '#FF7700' }
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
//function to open next level of embedding in main menu
	function openNextLevelEmbedding(classNameOfClickedElement, classNameOfElementToBeOpened) {

		var elementToBeOpened = document.querySelectorAll("." + classNameOfClickedElement + ":hover+." + classNameOfElementToBeOpened)[0];
		if (elementToBeOpened.className.indexOf("collapse") > -1) {

				var expandedItem = document.querySelectorAll("." + classNameOfElementToBeOpened + ".expand");

				if (expandedItem.length>0) {
					expandedItem[0].className =  expandedItem[0].className.replace("expand", "collapse");
				}
				elementToBeOpened.className = elementToBeOpened.className.replace("collapse", "expand");
			} else {
				elementToBeOpened.className = elementToBeOpened.className.replace("expand", "collapse");
			}
	}

//expand collapsed 1st level embeddings on click on main menu
	for (var i=0; i < mainMenuOptionList.length; i++) {
	    mainMenuOptionList[i].onclick = function() {
	    	openNextLevelEmbedding("mainMenuOption", "embeddingLevel1");
		}
	}

//expand collapsed 2nd level embeddings on click on submenu
	for (var i=0; i < embeddingLevel1List.length; i++) {
	    embeddingLevel1List[i].onclick = function() {
	    	openNextLevelEmbedding("subMenuOption", "embeddingLevel2");
		}
	}


//functions to increment/decrement weight input
function incrementWeight(weightInstance) {
	if (Number(weightInstance.value) < 11) {
		weightInstance.value = Number(weightInstance.value) + 1;
	}
}

function decrementWeight(weightInstance) {
	if (Number(weightInstance.value) > 1) {
		weightInstance.value = Number(weightInstance.value) - 1;
		}
}

for (var i=0; i < weightAddList.length; i++) {
	weightAddList[i].onclick = function() {
		var weightInstBelongingToChangedAdd = this.previousElementSibling;
		incrementWeight(weightInstBelongingToChangedAdd);
		weightInstBelongingToChangedAdd.onchange();
	}
}

for (var i=0; i < weightSubList.length; i++) {
	weightSubList[i].onclick = function() {
		var weightInstBelongingToChangedSub = this.nextElementSibling;
		decrementWeight(weightInstBelongingToChangedSub);
		weightInstBelongingToChangedSub.onchange();
	}
}



//function to change area`s color/visibility/weight based on user input

function changeMapStyle(stylerType, InputList) {

		for (var i=0; i < InputList.length; i++) {

			    InputList[i].onchange = function() {

//create styler object based on function`s input (styler type) and on input value given by the user
					var stylerValue = this.value;

					if (stylerType === "color") {
						var stylerObject = {color:stylerValue};
						var associatedLabel = colorLabelInputDict[this.id];
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
//check if there is already a styling with same featureType and elementType
					for (style in originalStyle) {
						if (originalStyle[style].featureType === featureType && originalStyle[style].elementType === elementType) {
							window.alert("found same feature type");
							for (styleListItem in originalStyle[style].stylers){
								//if there is check if they already have the same stylerType(color/weigt/visibility)
								if (originalStyle[style].stylers[styleListItem][stylerType]){
									//if they have, change it to new value
									originalStyle[style].stylers[styleListItem] = stylerObject;
									break
								}
								//if they don't, append new styler object to already existing stylesList
								else if (Number(styleListItem) === originalStyle[style].stylers.length-1) {
									window.alert("we have to append it to stylers");
									originalStyle[style].stylers.push(stylerObject);
								}
							}
							break	
						}
						// if there is not yet a styling with same featureType and elementType, than create a new style
						else if (Number(style) === originalStyle.length-1) {
							
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
							
						}
					}
					//update map
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

//function that generates code based on user input

 

getCode.onclick = function(){
	openNextLevelEmbedding("mainMenuOption", "embeddingLevel1");
	var code ="var mapCanvas = document.getElementById('map');\nvar mapOptions = {\n    center: new google.maps.LatLng(" + inputfieldLat.value*1 + "," + inputfieldLng.value*1 + " ),\n    zoom: " + inputfieldZoom.value * 1 + ",\n    mapTypeId: google.maps.MapTypeId.ROADMAP\n}\nvar map = new google.maps.Map(mapCanvas, mapOptions);\nvar style = [\n";
	
	for (style in originalStyle){
		code = code + "{";
		
		for (styleElement in originalStyle[style]){

			if (styleElement == "stylers") {
				code = code + "\n" + "    " + styleElement + ": [";
				for (listOfStyles in originalStyle[style][styleElement]) {
					for (nameOfSTyler in originalStyle[style][styleElement][listOfStyles]) {
						code = code + "\n" + "        "+ "{" + nameOfSTyler + ":" + originalStyle[style][styleElement][listOfStyles][nameOfSTyler] + "}";
					}
				}
				code = code + "\n" + "    " + "]";
			} else {
				code = code + "\n" + "    " + styleElement + ": " + "'" + originalStyle[style][styleElement] + "'" + ",";
			}
		}
		code = code + "\n}";
		if (style < originalStyle.length-1) {
			code = code + ", "
		}
	}
    codeContainer.innerHTML = code;
};
	

}

function modify () {
	window.alert("sg");
	var width = document.getElementById('width').value;
	map.style.width = width;
}


window.onload = initialize();