function startMap() {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: ironhackBCN
  });
}

startMap();

// setting the google-api goes here:
// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET
// });

// // Retrieve an access token
// spotifyApi
//   .clientCredentialsGrant()
//   .then(data => {
//     spotifyApi.setAccessToken(data.body["access_token"]);
//   })
//   .catch(error => {
//     console.log("Something went wrong when retrieving an access token", error);
//   });
// my api key : AIzaSyA3a3zhkAEBIXPnrBSIC1H-nNxQNtu8ljc
