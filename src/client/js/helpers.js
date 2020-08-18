// utility function to retrieve data from the 3 APIs being used
const getData = async (url = '') => {
  const response = await fetch(url);
  try {
    return await response.json();
  } catch (error) {
    console.log(`getData error is ${error}`)
  }
};

// send post data to server trips object
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    return await response.json();
  } catch (error) {
    console.log('error', error)
  }
};

// function to clear input forms
const clearForms = () => {
  document.getElementById('city-entry').value = '';
  document.getElementById('departure-date').value = '';
}

// append trip information to index.html as a div element
const appendTrip = (trip) => {
  const tripDate = trip.date;

  const remaining = daysLeft(tripDate);

  let tripContainer = document.getElementById('existing-trips');
  let newTrip = document.createElement('div');

  newTrip.className = 'trip-card';

  newTrip.innerHTML =
    `<img src="${trip.image}" class="trip-image" alt="trip image">
    <p class="trip-name">Your upcoming trip to ${trip.name}</p>
    <p class="trip-temp">The current weather is ${trip.temp}&#8457;</p>
    <p class="trip-days">Your trip is in <span class="days-left">${remaining}</span> days!</p>`

  tripContainer.appendChild(newTrip);
  clearForms();
}

// calculate days left until trip
const daysLeft = (date) => {
  const todayLocal = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
  const tripDate = new Date(date).toISOString().substr(0, 10);
  const differenceInTime = new Date(tripDate).getTime() - new Date(todayLocal).getTime();
  return differenceInTime / (1000 * 3600 * 24)
}

export { getData, postData, appendTrip };