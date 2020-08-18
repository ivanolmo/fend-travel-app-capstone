import './styles/resets.scss';
import './styles/main.scss';
import './styles/card.scss';
import './styles/footer.scss';
import '@babel/polyfill';
import { createTrip } from "./js/app";

export {
  createTrip
};

document.addEventListener('DOMContentLoaded', function () {
  // event listener for submit button on page
  document.getElementById('submit-add-trip').addEventListener('click', createTrip);

  // set calendar minimum date to today
  document.querySelector('#departure-date').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0, 10);
});