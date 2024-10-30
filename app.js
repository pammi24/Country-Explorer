
const apiUrl = 'https://restcountries.com/v3.1/all';
const countryList = document.getElementById('country-list');
const searchInput = document.getElementById('search');
const suggestions = document.getElementById('suggestions');
const countryDetails = document.getElementById('country-details');
const countryNameElement = document.getElementById('country-name');
const tldElement = document.getElementById('tld');
const capitalElement = document.getElementById('capital');
const regionElement = document.getElementById('region');
const populationElement = document.getElementById('population');
const areaElement = document.getElementById('area');
const languagesElement = document.getElementById('languages');
const backButton = document.getElementById('back');
const favoritesContainer = document.getElementById('favorites-box');
const showMoreButton = document.getElementById('show-more');
const regionFilter = document.getElementById('region-filter');
const languageFilter = document.getElementById('language-filter');

let countries = [];
let displayedCountries = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentPage = 0;
const pageSize = 10;

async function fetchCountries() {
    const response = await fetch(apiUrl);
    countries = await response.json();
    displayCountries(countries.slice(0, pageSize));
    populateFilters(); 
}

function populateFilters() {
    const regions = [...new Set(countries.map(country => country.region))];
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });

    const languages = [...new Set(countries.flatMap(country => Object.values(country.languages || {})))];
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });
}

function displayCountries(countriesToDisplay) {
    countryList.innerHTML = '';
    countriesToDisplay.forEach(country => {
        const isFavorite = favorites.some(fav => fav.name.common === country.name.common);
        const heartIcon = isFavorite ? '❤️' : '🤍';
        
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
            <button class="favorite-button" data-country="${country.name.common}">${heartIcon}</button>
        `;
        
        card.querySelector('.favorite-button').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(country, e.target);
        });

        card.addEventListener('click', () => showCountryDetails(country));
        countryList.appendChild(card);
    });
    displayedCountries = countriesToDisplay;
}

function showCountryDetails(country) {
    countryDetails.classList.remove('hidden');
    countryNameElement.textContent = country.name.common;
    tldElement.textContent = country.tld ? country.tld[0] : 'N/A';
    capitalElement.textContent = country.capital ? country.capital[0] : 'N/A';
    regionElement.textContent = country.region;
    populationElement.textContent = country.population ? country.population.toLocaleString() : 'N/A';
    areaElement.textContent = country.area ? country.area.toLocaleString() : 'N/A';
    languagesElement.textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
}

function toggleFavorite(country, button) {
    const isFavorite = favorites.some(fav => fav.name.common === country.name.common);

    if (isFavorite) {
        favorites = favorites.filter(fav => fav.name.common !== country.name.common);
        button.textContent = '🤍';
    } else {
        favorites.push(country);
        button.textContent = '❤️';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavoriteCountries();
}

function displayFavoriteCountries() {
    favoritesContainer.innerHTML = '';
    favorites.forEach(fav => {
        const favItem = document.createElement('div');
        favItem.textContent = fav.name.common;
        favoritesContainer.appendChild(favItem);
    });
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country => 
        country.name.common.toLowerCase().includes(query)
    );
    applyFilters(filteredCountries); 
}

function applyFilters(filteredCountries) {
    const selectedRegion = regionFilter.value;
    const selectedLanguage = languageFilter.value;

    const finalFilteredCountries = filteredCountries.filter(country => {
        const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
        const matchesLanguage = selectedLanguage === 'all' || (country.languages && Object.values(country.languages).includes(selectedLanguage));
        return matchesRegion && matchesLanguage;
    });

    displayCountries(finalFilteredCountries.slice(0, pageSize));
    showSuggestions(finalFilteredCountries);
}

function showSuggestions(filteredCountries) {
    suggestions.innerHTML = '';
    
    if (filteredCountries.length > 0) {
        suggestions.style.display = 'block';
        filteredCountries.slice(0, 5).forEach(country => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = country.name.common;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = country.name.common;
                suggestions.innerHTML = '';
                suggestions.style.display = 'none';
                showCountryDetails(country);
            });
            suggestions.appendChild(suggestionItem);
        });
    } else {
        suggestions.style.display = 'none';
    }
}

function backToSearch() {
    countryDetails.classList.add('hidden');
    displayCountries(countries.slice(0, pageSize));
}

function showMoreCountries() {
    currentPage++;
    const start = currentPage * pageSize;
    const end = start + pageSize;
    displayCountries(countries.slice(0, end));
}

searchInput.addEventListener('input', handleSearch);
regionFilter.addEventListener('change', handleSearch);
languageFilter.addEventListener('change', handleSearch);
backButton.addEventListener('click', backToSearch);
showMoreButton.addEventListener('click', showMoreCountries);
fetchCountries();