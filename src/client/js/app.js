import { getData, postData, appendTrip, validateTripDate, daysLeft } from "./helpers";

// include all env variables in repo so project works for reviewers
const geonamesAPIKey = 'udacity_fend';
const weatherbitAPIKey = '1803b41fd39740a598cda6e56c0e0385';
const pixabayKey = '17865085-386fa11634c67495661bdf2c0';

const weatherbitPredictedURL = 'http://api.weatherbit.io/v2.0/history/daily?lat=';

const createTrip = async (event) => {
  event.preventDefault();

  // primary object
  const trip = {};

  // get user input for travel location and trip date
  const city = document.getElementById('city-entry').value;
  const date = document.getElementById('departure-date').value;

  // simple input validation
  if (!city || !date || validateTripDate(date)) {
    alert('Please check your input and try again!')
  } else {
    try {
      // get location coords, append name and date to primary object, pass coords to weather function
      await getData(`http://api.geonames.org/searchJSON?q=${city}&username=${geonamesAPIKey}`)
        .then(
          data => {
            const destInfo = {};
            trip.name  = data.geonames[0].name;
            trip.country = data.geonames[0].countryName;
            trip.date = document.getElementById('departure-date').value;
            destInfo.lat = data.geonames[0].lat;
            destInfo.lng = data.geonames[0].lng;

            return destInfo;
          }
        )
        // get weather for location and append to primary object
        .then(
          async data => {
            const lat = data.lat;
            const lng = data.lng;

            // if trip is less than 7 days away
            if (!(daysLeft(trip.date) > 7)) {
            await getData(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=I&key=${weatherbitAPIKey}`)
              .then(
                data => {
                  trip.temp = data.data[0].temp;
                }
              )
          } else {
              // if trip is greater than 7 days away, return projected 2 week weather due to weatherbit API limitation
              await getData(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=I&key=${weatherbitAPIKey}`)
                .then(
                  data => {
                    trip.temp = data.data[14].temp;
                  }
                )
            }
          }
          )
        // get location image, checks first for specific results and displays picture, else displays country picture
        .then(
          async () => {
            let results = await getData(`http://pixabay.com/api/?key=${pixabayKey}&q=${city}&category=places`);
            if (results.total === 0) {
              results = await getData(`http://pixabay.com/api/?key=${pixabayKey}&q=${trip.country}&category=places`);
              trip.image = results.hits[0].webformatURL;
            } else {
              trip.image = results.hits[0].webformatURL;
            }
            return trip;
          }
        )
        // post data to server side JS object
        .then(
          async () => {
            await postData('/api/post', {
              name: trip.name,
              temp: trip.temp,
              image: trip.image
            })
          }
        );

      // append trip to DOM
      appendTrip(trip);

    } catch (error) {
      console.log(`app error is ${error}`)
    }
  }
}

// event listeners for page load and submit button
const DOMLoaded = document.addEventListener('DOMContentLoaded', function () {
  // event listener for submit button on page
  document.getElementById('submit-add-trip').addEventListener('click', createTrip);

  // set calendar minimum date to today
  document.querySelector('#departure-date').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0, 10);
});

export {
  createTrip,
  DOMLoaded
};