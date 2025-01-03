﻿# pokedex-lite-web-app
Installation and Setup:
Steps:
1)Clone the Repository
2)Install Dependencies: This app uses vanilla JavaScript, HTML, and CSS, so no additional libraries are required.
3)Run the App: Open the index.html file in your browser to run the app.

Technologies and Libraries Used:
HTML: Structuring the web page and app layout.
CSS: Styling and ensuring responsiveness across devices (desktop, tablet, mobile).
JavaScript:
Fetch API: To make asynchronous requests to the PokéAPI.
Local Storage: To save and retrieve user preferences (favorites).
DOM Manipulation: Dynamically rendering Pokemon cards and details.
PokeAPI: A RESTful API providing Pokémon data

Challenges Faced and Solutions:
1)Challenge: Handling a large dataset of Pokemon efficiently.
Solution: Implemented pagination to load Pokemon in batches of 24 instead of fetching all 120 at once, improving performance.
2)Challenge: Making the app fully responsive.
Solution: Used CSS Flexbox and media queries to ensure the layout adapts to different screen sizes, including mobile and tablets.
3)Challenge: Managing favorites with unique Pokemon identifiers.
Solution: Utilized localStorage to persist user preferences and ensured proper mapping between Pokemon IDs and names.

