 function initialize() {
 	var inputfieldWidth = document.getElementById('width');
 	var inputfieldHeight = document.getElementById('height');
 	var inputfieldZoom = document.getElementById('zoom');
 	var inputfieldLat = document.getElementById('lat');
 	var inputfieldLng = document.getElementById('lng');


 	
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(47.5403, 19.0463),
        zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP, SATELLITE, HYBRID, or TERRAIN
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	map.set('styles', [
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
	},

	{
	    featureType: 'all',
	    elementType: 'labels.text',
	    stylers: [
	    { hue: '#ff0000' },
	    { lightness: -15 },
	    { saturation: 50 }
	    ]
	}
	]);
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var myLatLng =  new google.maps.LatLng(47.5403, 19.0463);
var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: iconBase + 'schools_maps.png'
});

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


