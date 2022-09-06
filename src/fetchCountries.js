
export function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/${name}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(
        response => {
            return response.json();
        }
    );
}
