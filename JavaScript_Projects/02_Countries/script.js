// Select DOM elements
const countriesContainer = document.querySelector('.countries-container');
const searchInput = document.getElementById('search');
const filterRegion = document.getElementById('region');
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

// Fetch and render all countries data
const allCountriesData = []
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then((data) => {
        renderCountries(data);
        allCountriesData.push(...data);
    });

// Search input event listener
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(searchValue));
    renderCountries(filteredCountries);
});

// Filter region event listener
filterRegion.addEventListener('change', () => {
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
        .then(response => response.json())
        .then(renderCountries);
});

// Function to render countries
function renderCountries(data) {
    countriesContainer.innerHTML = '';
    data.toSorted((a, b) => a.name.common.localeCompare(b.name.common)).forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`;
        countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
                <div class="card-text">
                    <h3 class="card-title">${country.name.common}</h3>
                    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital?.[0] || "No Capital"}</p>
                </div>
        `;
        countriesContainer.append(countryCard);
    });
}