import './styles/resets.scss';
import './styles/main.scss';
import './styles/card.scss';
import './styles/footer.scss';
import '@babel/polyfill';
import { createTrip } from "./js/app";
import { DOMLoaded } from "./js/app";

export {
  createTrip,
  DOMLoaded
};