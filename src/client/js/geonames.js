import { getLocation } from "./helpers";

const baseURL = 'http://api.geonames.org/searchJSON?q=';
const username = '&username=udacity_fend';

document.getElementById('submit-add-trip').addEventListener('click', geonames);

async function geonames(event) {
  event.preventDefault();

  const city = document.getElementById('city-entry').value;
  if (!city) {
    alert('Please enter a city name!')
  } else {
    try {
      await getLocation(baseURL + city + username)
        .then(
          data => {
            const cityCoord = {};
            cityCoord.name = data.geonames[0].name;
            cityCoord.lat = data.geonames[0].lat;
            cityCoord.lng = data.geonames[0].lng;

            return cityCoord;
          }
        )
    } catch (error) {
      console.log(`geonames error is ${error}`)
    }
  }
}

export { geonames };