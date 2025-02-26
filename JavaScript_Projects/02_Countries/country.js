// Get country name from URL parameters
const countryName = new URLSearchParams(window.location.search).get('name');

// Select DOM elements
const countryFlagImage = document.querySelector('.country-flag-image');
const countryNameElement = document.querySelector('.country-name');
const countryNativeNameElement = document.querySelector('.country-native-name');
const countryPopulationElement = document.querySelector('.country-population');
const countryRegionElement = document.querySelector('.country-region');
const countrySubRegionElement = document.querySelector('.country-sub-region');
const countryCapitalElement = document.querySelector('.country-capital');
const countryTopLevelDomainElement = document.querySelector('.country-top-level-domain');
const countryCurrenciesElement = document.querySelector('.country-currencies');
const countryLanguagesElement = document.querySelector('.country-languages');
const borderCountriesElement = document.querySelector('.border-countries');
const themeSwitcher = document.querySelector('.theme-switcher');

// Theme switcher event listener
themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeSwitcher.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode';
    } else {
        themeSwitcher.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode';
    }
});

// Set initial theme based on localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitcher.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode';    
} else {
    themeSwitcher.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode';
}

// Back button event listener
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', () => {
    window.history.back();
});

// Fetch and display country details
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        countryFlagImage.src = country.flags.svg;
        countryFlagImage.alt = `${country.name.common} flag`;

        countryNameElement.textContent = country.name.common;

        const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;
        countryNativeNameElement.textContent = nativeName;

        countryPopulationElement.textContent = country.population.toLocaleString('en-IN');

        countryRegionElement.textContent = country.region;

        countrySubRegionElement.textContent = country.subregion ? country.subregion : 'No sub region';

        const capitals = country.capital ? country.capital.join(', ') : 'No Capital';
        countryCapitalElement.textContent = capitals;

        countryTopLevelDomainElement.textContent = country.tld ? country.tld.join(', ') : 'No top level domain';

        const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'No currency';
        countryCurrenciesElement.textContent = currencies;

        const languages = country.languages ? Object.values(country.languages).join(', ') : 'No languages';
        countryLanguagesElement.textContent = languages;

        if (country.borders) {
            country.borders.forEach(borderCountry => {
                fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
                    .then(res => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryElement = document.createElement('a');
                        borderCountryElement.classList.add('border-country');
                        borderCountryElement.href = `/country.html?name=${borderCountry.name.common}`;
                        borderCountryElement.textContent = borderCountry.name.common;
                        borderCountriesElement.append(borderCountryElement);
                    });
            });
        } else {
            borderCountriesElement.textContent = 'No border countries';
        }
    });