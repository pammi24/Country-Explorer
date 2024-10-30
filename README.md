# Country-ExplorerCountry Explorer

Country Explorer is a web application designed to provide detailed information about countries worldwide. Users can search for countries, filter results by region or language, view country details, and save favorites for quick access.

Features



Search by Name: Search for countries by typing in the country’s name.
Region and Language Filters: Narrow down results by selecting a specific region or language.
Country Details: Access detailed information such as capital, population, area, official languages, and top-level domain.
Favorites: Save countries to a favorites list for easy reference.
Pagination: Load more countries with the "Show More" button to explore additional results.



Project Structure



HTML: Defines the structure and layout of the app, including sections for search, filters, favorites, and country details.
CSS: Styles the user interface, including cards, buttons, and layout elements.
JavaScript: Manages the app's functionality, including fetching data, handling search and filters, displaying details, and managing favorites.


Getting Started


Prerequisites
A modern web browser that supports ES6 features like the fetch API is required to run this application.




Setup



Clone or download the project files.
Open the index.html file in your browser to launch the application.



Functionality


Data Fetching
Country data is sourced from the REST Countries API, which provides a comprehensive dataset including flags, names, and regional information.



Search and Filter Options


Search Function: Type in a country’s name to see matching results.
Region and Language Filtering: Refine search results by choosing specific regions or languages to view a more tailored list of countries.



Managing Favorites



Add/Remove Favorites: Click the heart icon on any country card to add or remove it from the favorites list.
Viewing Favorites: Favorite countries are displayed in a dedicated sidebar for quick access, and they persist even after closing the browser thanks to local storage.


Country Details View


Select a country card to view more detailed information, such as:

Capital city
Population
Area
Official languages
Top-level domain



Show More Functionality



The "Show More" button dynamically loads additional countries, allowing users to explore the full list in manageable portions.

CSS and Design


The design features a simple, user-friendly layout:

A vibrant header with a background image.
Styled country cards with flags and names.
Responsive layout for easy viewing on both desktop and mobile screens.




Local Storage



The app uses local storage to save the favorites list, ensuring that the user’s selected countries are preserved even when the browser is closed or refreshed.

API Source




This project uses the REST Countries API for real-time data on country information.

Future Improvements



Potential future enhancements could include:

Enhanced filtering options, such as by population range or area.
Adding additional country statistics or details.
Providing multi-language support within the app interface.





Acknowledgements
REST Countries API
