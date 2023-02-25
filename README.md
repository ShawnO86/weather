
# Application for weather forcast for most places around the world.

--Will recieve weather data for user specified location with a 7-day forcast and image of the location as the background. 

--Styles change based on time of day. Day = light mode, Night = dark mode

--APIs used:

--geonames.org for latatude, longitude, population, state or region name, and country of destination

--weatherbit.io (requires geonames lat & long) for 7-day forcast data

--pixabay.com (also requires geonames result) for an image of the destination or country if no specific image exist


--Install Package - NPM install
\
--Start server - NPM run start
\
--Start dev-environment - NPM run dev
\
--Build for deployment - NPM run build


Technology being used : \
Fetch \
Async/await \
Node \
Express.js \
Webpack

Deployed at https://weather-app-frontend-9s8u.onrender.com/

--Using free version, will go into sleep mode after 15 minutes if there are no requests for the application. This means it takes some time to load when the next request comes.
