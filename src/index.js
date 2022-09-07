import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const lodash = require("lodash.debounce");
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const findInput = document.querySelector('#search-box');
const findDiv = document.querySelector('.country-info')

findInput.addEventListener('input', lodash(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
  let text = evt.target.value;
   findDiv.innerHTML = '';
  if (text.length === 0) {
    return;
}
  fetchCountries(text.trim()).then(countries => countriesMarch(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function countriesMarch(countries) {
  if (countries.length > 10) {
    Notify.failure('Too many matches found. Please enter a more specific name.');
    return;
  }
  countriesOne(countries);
}

function countriesOne(countries) {
  if (countries.length === 1) {
    outputCountry(countries);
  } else{
             const markup = countries
    .map((country) => {
      return `<div class="country-info">
      <img src ="${country.flags.svg}" width="40px"/>
          <p><b>Name</b>: ${country.name.official}</p>
        </div>`;
    })
       .join("");
  findDiv.innerHTML = markup;
    return;
    }
}

function outputCountry(countries) {
  // console.log(countries);
     const markup = countries
    .map((country) => {
      return `<div class="country-info">
      <img src ="${country.flags.svg}" width="40px"/>
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        </div>`;
    })
       .join("");
  findDiv.innerHTML = markup;
}
