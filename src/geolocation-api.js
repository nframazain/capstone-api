if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    alert("Geolocation is not supported by this browser.");
}

function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Lakukan sesuatu dengan latitude dan longitude, misalnya menampilkannya pada sebuah elemen
    document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

function error() {
    alert("Unable to retrieve your location");
}

function initMap() {
    var myLatLng = {lat: -5.395512338172377, lng: 105.2894940149432}; // Ganti dengan koordinat awal
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });
}