 function initialize() {
 	var inputfieldWidth = document.getElementById('width');
 	var inputfieldHeight = document.getElementById('height');
 	var inputfieldZoom = document.getElementById('zoom');
 	var inputfieldLat = document.getElementById('lat');
 	var inputfieldLng = document.getElementById('lng');
 	var inputfieldS = document.getElementById('S');
 	var mainAreaList = document.getElementsByClassName("mainArea");


 	
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

	
	for (var i=0; i < mainAreaList.length; i++) {

		mainAreaList[i].onmouseover = function() {
			var mainArea = this.id;
			
			if (mainArea == "poi" || mainArea=="transit") {
				map.setZoom(11);
			}
			
			var mapStyle = {
				featureType: mainArea,
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

	    mainAreaList[i].onmouseleave = function() {
			originalStyle.pop();
			map.set('styles', 
				originalStyle
			);

			map.setZoom(5);
	    };

	    mainAreaList[i].onclick = function() {
			window.alert("finallllly");
	};
	}

	

	




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


