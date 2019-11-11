# Movie Trailers

This project to get trailers from IMDB for viafree movies 

## Run Using Docker Compose
`docker-compose up -d`

## Run Local
#### install dependencies

1. install TypeScript globally `npm install typescript -g`
2. install mocha and chai globally `npm install mocha chai ts-node -g`
3. install packages `npm install`

### run project 
1. add your port andimdb api_key in config.json file (already exist test values)
2. `npm start`

#### Run Test
`npm test`

### Run tslint
`npm run lint`

### Example Get Request
```
http://localhost:3000/movie/trailer?movie-url=https://content.viaplay.se/pc-se/film/captain-marvel-2019
```