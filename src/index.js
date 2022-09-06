import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const lodash = require("lodash.debounce");
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const findInput = document.querySelector('#search-box');
const findDiv = document.querySelector('.country-info')

findInput.addEventListener('input', lodash(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
  evt.preventDefault();
  let text = evt.target.value;
  fetchCountries(text).then(outputCountry);
  console.log(text);
  }

function outputCountry(countries) {
  console.log(countries);
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
