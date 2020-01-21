const mapDons = document.querySelector(".donation-map");
const map = new google.maps.Map(mapDons, {
  zoom: 12.3,
  center: {
    lat: 48.8534,
    lng: 2.3488
  }
});

alldons.forEach(don => {
  console.log(don.donGeoloc);
  new google.maps.Marker({
    position: don.donGeoloc,
    map: map,
    title: don.donNom
  });
});
