import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { MovieRepository } from '../src/Repository/Movie.repository';
import * as TestMovieRepository from '../src/Repository/Movie.repository';
import * as TestRequest from '../src/utilities/Request';
import { MovieManager } from '../src/Managers/Movie.manager';
import { ErrorMessages } from '../src/Constants/ErrorMessages.constant';

describe('Movie Module', () => {
    let mock;
    const ViaplayResponse = require('../MockData/ViaplayResponse.json');
    const IMDBResponse = require('../MockData/IMDBResponse.json');
    const ViaplayErrorResponse = require('../MockData/ViaplayErrorResponse.json');
    const IMDBSuccessResponse = require('../MockData/imdbSuccessResponse.json');
    const IMDBErrorResponse = require('../MockData/imdbErrorResponse.json');

    afterEach(() => {
        mock.restore();
    });

    it('should return correct trailers for the movie', async () => {
        class MockMovieRepository {
            async getMovieDetails(movieURL: string) {  return ViaplayResponse; }
            async getMovieTrailers(movieID: string) {  return IMDBResponse; }
        }

        mock = sinon.stub(TestMovieRepository, 'MovieRepository').callsFake(() => {
            return new MockMovieRepository();
        });

        const movieManager = new MovieManager();
        const trailers = await movieManager.getMovieTrailers('https://content.viaplay.se/pc-se/film/gifted-2017');

        expect(trailers[0]).to.equal('https://www.youtube.com/watch?v=x7CAjpdRaXU');
    });

    it('should return movie Details if movie exist', async () => {
        class MockRequest {
            async promiseRequest(options: any) {  return ViaplayResponse; }
        }

        mock = sinon.stub(TestRequest, 'Request').callsFake(() => {
            return new MockRequest();
        });

        const movieRepository = new MovieRepository();
        const result = await movieRepository.getMovieDetails('https://content.viaplay.se/pc-se/film/gifted-2017');

        expect(result._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id)
        .to.equal('tt4481414');
    });

    it('should return error message if movie not exist', async () => {
        class MockRequest {
            async promiseRequest(options: any) {  return ViaplayErrorResponse; }
        }

        mock = sinon.stub(TestRequest, 'Request').callsFake(() => {
            return new MockRequest();
        });

        const movieRepository = new MovieRepository();
        const result = await movieRepository.getMovieDetails('https://content.viaplay.se/pc-se/film/arrival-2016');

        expect(result).to.equal(ErrorMessages.MOVIE_NOT_FOUND);
    });

    it('should return movie trailers if movie id exist in IMDB', async () => {
        class MockRequest {
            async promiseRequest(options: any) {  return IMDBSuccessResponse; }
        }

        mock = sinon.stub(TestRequest, 'Request').callsFake(() => {
            return new MockRequest();
        });

        const movieRepository = new MovieRepository();
        const result = await movieRepository.getMovieTrailers('tt4481414');

        expect(result[0]).to.equal('https://www.youtube.com/watch?v=x7CAjpdRaXU');
    });

    it('should return error message if movie id not exist in IMDB', async () => {
        class MockRequest {
            async promiseRequest(options: any) {  return IMDBErrorResponse; }
        }

        mock = sinon.stub(TestRequest, 'Request').callsFake(() => {
            return new MockRequest();
        });

        const movieRepository = new MovieRepository();
        const result = await movieRepository.getMovieTrailers('tt4481414');

        expect(result).to.equal(ErrorMessages.MOVIE_NOT_FOUND);
    });


});

