 function initialize() {
 	var inputfieldWidth = document.getElementById('width');
 	var inputfieldHeight = document.getElementById('height');
 	var inputfieldZoom = document.getElementById('zoom');
 	var inputfieldLat = document.getElementById('lat');
 	var inputfieldLng = document.getElementById('lng');

 	var inputfieldS = document.getElementById('S');
 	
 	var previewAreaOnMapList = document.getElementsByClassName("previewAreaOnMap");
 	var mainMenuOptionList = document.getElementsByClassName("mainMenuOption");
 	var embeddingLevel1List = document.getElementsByClassName("embeddingLevel1");

 	var setColorInputList = document.getElementsByClassName("setColor");
 	var setWeightInputList = document.getElementsByClassName("setWeight");
 	var setVisibilityInputList = document.getElementsByClassName("setVisibility");
 	


 	
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

	inputfieldS.onclick = function() {
		var color = document.getElementById("color").value;
		var mapStyle = {
			featureType: 'landscape.natural.terrain',
	    	elementType: 'all',
			stylers: [
			{ color: color }
			]
		};

		originalStyle.push(mapStyle);
		map.set('styles', 
			originalStyle
		);
	};
//customization menu items preview the area which are goung to be effected on hover
	for (var i=0; i < previewAreaOnMapList.length; i++) {
		previewAreaOnMapList[i].onmouseover = function() {
			var area = this.id;
			
			// if (area == "poi" || area=="transit") {
			// 	map.setZoom(11);
			// }
			
			var mapStyle = {
				featureType: area,
		    	elementType: 'all',
				stylers: [
				{ color: "#ff6622" },
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

//extend collapsed submenu on click on main menu
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

//extend customization panel on click on sub menu
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

//function to change areas color/visibility/weight based on user input

function changeMapStyle(stylerType, InputList) {

		for (var i=0; i < InputList.length; i++) {

			    InputList[i].onchange = function() {

			    	//window.alert("we are inside the function, i repeat we are inside the function.");

					var stylerValue = this.value;

					if (stylerType === "color") {
						var stylerObject = {color:stylerValue};
					} else if (stylerType === "weight") {
						var stylerObject = {weight:stylerValue};
					} else if (stylerType === "visibility") {
						var stylerObject = {visibility:stylerValue};
					};
					

					if (this.className.indexOf("fill") > -1) {
						var fillORstroke = "fill";
					} else if (this.className.indexOf("stroke") > -1) {
						var fillORstroke = "stroke";
					}

					if (this.className.indexOf("geometry") > -1) {
						var textORgeometry = "geometry";
					} else if (this.className.indexOf("text") > -1) {
						var textORgeometry = "labels.text";
					}

					var elementType = textORgeometry + "." + fillORstroke;
			
					var mapStyle = {
						featureType: "administrative",
				    	elementType: elementType,
						stylers: [
						stylerObject
						]
					};

					originalStyle.push(mapStyle);
					map.set('styles', 
						originalStyle
					);
		};
	};

}



//change the color of selected area
changeMapStyle("color", setColorInputList);

//change the color of selected area
changeMapStyle("visibility", setVisibilityInputList);

//change the color of selected area
changeMapStyle("weight", setWeightInputList);

	// for (var i=0; i < setColorInputList.length; i++) {

	// 		    setColorInputList[i].onchange = function() {

	// 				var color = this.value;

	// 				if (this.className.indexOf("fill") > -1) {
	// 					var fillORstroke = "fill";
	// 				} else if (this.className.indexOf("stroke") > -1) {
	// 					var fillORstroke = "stroke";
	// 				}

	// 				if (this.className.indexOf("geometry") > -1) {
	// 					var textORgeometry = "geometry";
	// 				} else if (this.className.indexOf("text") > -1) {
	// 					var textORgeometry = "labels.text";
	// 				}

	// 				var elementType = textORgeometry + "." + fillORstroke;
			
	// 				var mapStyle = {
	// 					featureType: "administrative",
	// 			    	elementType: elementType,
	// 					stylers: [
	// 					{ color: color },
	// 					{visibility:'on'}
	// 					]
	// 				};

	// 				originalStyle.push(mapStyle);
	// 				map.set('styles', 
	// 					originalStyle
	// 				);
	// 	};
	// };


	marker = new google.maps.Marker({
        position: new google.maps.LatLng(inputfieldLat.value*1, inputfieldLng.value*1),
        map: map
    });

}

function modify () {
	window.alert("sg");
	var width = document.getElementById('width').value;
	map.style.width = width;
}


window.onload = initialize();


