if (navigator.geolocation) {
  // Get current position
  // The permissions dialog will pop up
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // Create an object to match Google's Lat-Lng object format
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("center: ", center);

      // maj les 2 inputs avec center.lat et center.lng
      const $lat = document.querySelector('[name="lat"]');
      const $lng = document.querySelector('[name="lng"]');

      $lat.value = center.lat;
      $lng.value = center.lng;

      // User granted permission
      // Center the map in the position we got
    },
    function() {
      // If something goes wrong
      console.log("Error in the geolocation service.");
    }
  );
} else {
  // Browser says: Nah! I do not support this.
  console.log("Browser does not support geolocation.");
}
