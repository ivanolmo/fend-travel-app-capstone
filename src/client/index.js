import './styles/resets.scss';
import './styles/main.scss';
import './styles/footer.scss';
import "@babel/polyfill";
import { geonames } from './js/geonames';
import { getLocation, getWeather, getImage } from "./js/helpers";

document.getElementById('submit-add-trip').addEventListener('click', geonames);

export { getLocation, getWeather, getImage };