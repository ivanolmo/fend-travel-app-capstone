# Front End Nanodegree Capstone Project

## Travel App

## Overview
This project combines what I've learned of HTML, CSS, and Javascript (with build tools, web APIs, and single page web apps mixed in).
This project is a travel application that utilizes 3 APIs. It allows you to enter a location you'll be traveling to, and it will show 
weather for the area and pictures of the general location.

## My Work
The base for this app was borrowed from my previous project [Weather Journal App](https://github.com/ivanolmo/fend-weather-journal-app).

APIs used:
- [Geonames](https://www.geonames.org/)
- [Weatherbit](https://www.weatherbit.io/)
- [Pixabay](https://pixabay.com/)

The Geonames API was used to pull in location data based on the destination input by the user. I utilized the latitude, longitude, destination name, and destination country.
These data were stored in a trip object.

Next, the latitude and longitude were sent to the Weatherbit API. Here is where there are some limitations. The free version of the API doesn't allow future weather forecasts beyond 16 days.
If the user trip is within that timeframe, a current weather forecast is displayed. Beyond that, a weather forecast 2 weeks in the future is displayed. This temperature data is then stored in the trip object.

The final API call is to Pixabay. The first request sends the user destination name (typicall a city). If no data are returned (the location is obscure, for example), a second request is made.
The second request uses the country data stored in the trip object, and Pixabay then returns a general image for the destination country.

Lastly, the trip object is sent to a POST endpoint hosted on the local server. The server then appends that trip object to a trips array, and returns the array back to the client.
The client displays all trips in the array. Each trip 'card' shows the location image, name, weather, and a countdown to the trip date.

I plan to add a few features in the future, such as:
- delete a trip
- display trip duration
- utilize local storage
- expand the view for larger devices