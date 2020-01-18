const mapDons = document.querySelector(".donation-map");
const map = new google.maps.Map(mapDons, {
  zoom: 12.3,
  center: {
    lat: 48.8534,
    lng: 2.3488
  }
});

//

// for each sur alldons
// créer un nouveau marker pour chaque en accédant aux données
const myMarker = new google.maps.Marker({
  position: {
    lat: 48.8534,
    lng: 2.3488
  },
  map: map,
  title: "I'm here"
});
