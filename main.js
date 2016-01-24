 function initialize() {
 //VARIABLES
 //access input fields in BASIC menu
 	var inputfieldWidth = document.getElementById('width'),
 		inputfieldHeight = document.getElementById('height'),
 		inputfieldZoom = document.getElementById('zoom'),
 		inputfieldLat = document.getElementById('lat'),
 		inputfieldLng = document.getElementById('lng'),
 		inputfieldMarkerON = document.getElementById('markerON'),
 		inputfieldMarkerOFF = document.getElementById('markerOFF'),
 		inputfieldMarkerLat = document.getElementById('markerLat'),
 		inputfieldMarkerLng = document.getElementById('markerLng'),
 		markerLatContainer = document.querySelectorAll('.container.markerLat')[0],
 		markerLngContainer = document.querySelectorAll('.container.markerLng')[0];

 //access multiple level of menu items
 	var previewAreaOnMapList = document.getElementsByClassName('previewAreaOnMap'),
 		mainMenuOptionList = document.getElementsByClassName('mainMenuOption'),
 		subMenuOptionList = document.getElementsByClassName('subMenuOption');

//access input fields in custommization panel
 	var setColorInputList = document.getElementsByClassName('setColor'),
 		setWeightInputList = document.getElementsByClassName('setWeight'),
 		setVisibilityInputList = document.getElementsByClassName('setVisibility'),
 		labels = document.getElementsByTagName('LABEL'),
 		addButtonList = document.getElementsByClassName('add'),
 		subButtonList = document.getElementsByClassName('sub');

 //access code genarating elements
 	var jsCodeContainer =  document.getElementById('jsCodeContainer'),
 		cssCodeContainer =  document.getElementById('cssCodeContainer'),
 		codeContainer =  document.getElementById('codeContainer'),
 		getCode = document.getElementById('getCode'),
 		closeCode = document.getElementById('closeCode');
 		
 
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
	}, {
	    featureType: 'landscape',
	    elementType: 'all',
	    stylers: [
	    	{ color: '#dddddd' }
	    ]
	}, {
	    featureType: 'all',
	    elementType: 'labels.text.stroke',
	    stylers: [
	    	{ visibility: 'off' }
	    ]
	}, {
	    featureType: 'all',
	    elementType: 'labels.text.fill',
	    stylers: [
	    	{  visibility: 'off' }
	    ]
	}, {
	    featureType: 'all',
	    elementType: 'labels.icon',
	    stylers: [
	    	{  visibility: 'off' }
	    ]
	},{
	    featureType: 'water',
	    elementType: 'all',
	    stylers: [
	    	{ color: '#777777' }
	    ]
	}
	];
	
	map.set('styles', originalStyle);
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var myLatLng =  new google.maps.LatLng(47.5403, 19.0463);
	var marker = new google.maps.Marker({
		position: myLatLng
	});

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
    	//marker.setPosition(newCenter);
	};

	inputfieldLng.onchange = function() {
		var lat = map.getCenter().lat();
		var newCenter = new google.maps.LatLng(lat, inputfieldLng.value*1);
    	map.setCenter(newCenter);
    	//marker.setPosition(newCenter);
	};

	inputfieldMarkerON.onclick = function() {
		markerLatContainer.className = markerLatContainer.className.replace("collapse", "expand");
		markerLngContainer.className = markerLngContainer.className.replace("collapse", "expand");
		
		  marker.setMap(map);

		  inputfieldMarkerLng.onchange = function() {
			var newMarkerPosition = new google.maps.LatLng(inputfieldMarkerLat.value*1, inputfieldMarkerLng.value*1);
	    	marker.setPosition(newMarkerPosition);
		  }

		  inputfieldMarkerLat.onchange = function() {
			var newMarkerPosition = new google.maps.LatLng(inputfieldMarkerLat.value*1, inputfieldMarkerLng.value*1);
	    	marker.setPosition(newMarkerPosition);
		  }
	};

	inputfieldMarkerOFF.onclick = function() {
		marker.setMap(null);
		markerLatContainer.className = markerLatContainer.className.replace("expand", "collapse");
		markerLngContainer.className = markerLngContainer.className.replace("expand", "collapse");
	};



	

//preview the area which is going to be effected on hover on CUSTOMIZATION menu items 
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
	for (var i=0; i < subMenuOptionList.length; i++) {
	    subMenuOptionList[i].onclick = function() {
	    	openNextLevelEmbedding("subMenuOption", "embeddingLevel2");
		}
	}


//functions to increment/decrement number input
function incrementWeight(numberInput) {
	if (Number(numberInput.value) < Number(numberInput.max)) {
		numberInput.value = Number(numberInput.value) + 1;
	}
}

function decrementWeight(numberInput) {
	if (Number(numberInput.value) > Number(numberInput.min)) {
		numberInput.value = Number(numberInput.value) - 1;
		}
}

for (var i=0; i < addButtonList.length; i++) {
	addButtonList[i].onclick = function() {
		var numberInputBelongingToClickedAddButton = this.previousElementSibling;
		incrementWeight(numberInputBelongingToClickedAddButton);
		numberInputBelongingToClickedAddButton.onchange();
	}
}

for (var i=0; i < subButtonList.length; i++) {
	subButtonList[i].onclick = function() {
		var numberInputBelongingToClickedSubButton = this.nextElementSibling;
		decrementWeight(numberInputBelongingToClickedSubButton);
		numberInputBelongingToClickedSubButton.onchange();
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
					
//assign value to fillORstroke based on changed input`s class  name ("" is only an option when textORgeometry is labels.icon or just labels)
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
					} else if (this.className.indexOf("labels") > -1) {
						var textORgeometry = "labels";
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
							for (styleListItem in originalStyle[style].stylers){
								//if there is check if they already have the same stylerType(color/weigt/visibility)
								if (originalStyle[style].stylers[styleListItem][stylerType]){
									//if they have, change it to new value
									originalStyle[style].stylers[styleListItem] = stylerObject;
									break
								}
								//if they don't, append new styler object to already existing stylesList
								else if (Number(styleListItem) === originalStyle[style].stylers.length-1) {
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
	if (codeContainer.className.indexOf("codeOut") > -1) {
		codeContainer.className = codeContainer.className.replace("codeOut", "codeIn");
	} else {
		codeContainer.className = codeContainer.className + "codeIn";
	}
	

	var jsCode = "function initialize() {\n";
	jsCode = jsCode + "    var mapCanvas = document.getElementById('map');\n";
	jsCode = jsCode + "    var mapOptions = {\n    center: new google.maps.LatLng(" + inputfieldLat.value*1 + ", " + inputfieldLng.value*1 + "),\n    zoom: " + inputfieldZoom.value * 1 + ",\n    mapTypeId: google.maps.MapTypeId.ROADMAP\n    };\n"
	jsCode = jsCode + "    var map = new google.maps.Map(mapCanvas, mapOptions);\n";
	jsCode = jsCode + "    var style = [\n";
	
	for (style in originalStyle){
		jsCode = jsCode + "    {\n";
		jsCode = jsCode + "        featureType: " +  "'" + originalStyle[style].featureType + "'" + ",\n";
		jsCode = jsCode + "        elementType: " +  "'" + originalStyle[style].elementType + "'" + ",\n";
		jsCode = jsCode + "        stylers: [";

		for (listOfStyles in originalStyle[style].stylers) {
			for (nameOfSTyler in originalStyle[style].stylers[listOfStyles]) {
				jsCode = jsCode + "\n" + "            "+ "{" + nameOfSTyler + ":" + "'" + originalStyle[style].stylers[listOfStyles][nameOfSTyler] + "'" + "}";
			}
			if (Number(listOfStyles) < originalStyle[style].stylers.length-1) {
				jsCode = jsCode + ", ";
			}
		}
		jsCode = jsCode + "\n        ]\n    }";

		if (Number(style) < originalStyle.length-1) {
				jsCode = jsCode + ",\n";
			} else {
				jsCode = jsCode + "\n];";
			}
	}
	

	jsCode = jsCode + "\n    map.set('styles', style);";

	if (inputfieldMarkerON.checked === true) {
		jsCode = jsCode + "\nvar marker = new google.maps.Marker({\nposition:  new google.maps.LatLng(" + inputfieldMarkerLat.value*1 + ", " + inputfieldMarkerLng.value*1 + "),\nmap: map});";

	}

	jsCode = jsCode + "\n}\nwindow.onload = initialize();";
    jsCodeContainer.innerHTML = jsCode;

    var cssCode = "#map {\n    width:" + inputfieldWidth.value*1 + "vw;\n    height: " + inputfieldHeight.value*1 + "vh;\n}\nbody {\n    margin: 0;\n}";

    cssCodeContainer.innerHTML = cssCode;
};

closeCode.onclick = function() {

	codeContainer.className = codeContainer.className.replace("codeIn",  "codeOut");
}
	

}


window.onload = initialize();