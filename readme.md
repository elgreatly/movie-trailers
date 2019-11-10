# Movie Trailers

## Run Using Docker Compose
`docker-compose up -d`

## Run Local
#### install dependencies

1. install TypeScript globally `npm install typescript -g`
2. install mocha and chai globally `npm install mocha chai ts-node -g`
3. install packages `npm install`

### run project 
1. add your port in config.json
2. `npm start`

#### Run Test
`npm test`

### Run tslint
`npm run lint`

### Example Get Request
1. add port and imdb api_key in config.json file (already exist test values) 
2. 
```
http://localhost:3000/movie/trailer?movie-url=https://content.viaplay.se/pc-se/film/captain-marvel-2019
```