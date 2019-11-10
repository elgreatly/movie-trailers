import { IMovieManager } from '../Interfaces/IMovieManager.interface';
import { MovieRepository } from '../Repository/Movie.repository';
import { StatusCode } from '../Constants/StatusCode.constant';
import { ErrorMessages } from '../Constants/ErrorMessages.constant';
import { HttpError } from 'routing-controllers';

export class MovieManager implements IMovieManager {
    async getMovieTrailers(movieURL: string): Promise<any> {
        const movieRepository = new MovieRepository();

        const movieDetails = await movieRepository.getMovieDetails(movieURL);

        if (typeof movieDetails === 'string') {
            throw new HttpError(StatusCode.BAD_REQUEST, movieDetails);
        }

        if (!movieDetails._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb) {
            throw new HttpError(StatusCode.BAD_REQUEST, ErrorMessages.NOT_EXIST_IN_IMDB);
        }

        const MovieID = movieDetails._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;

        return await movieRepository.getMovieTrailers(MovieID);
    }
}
