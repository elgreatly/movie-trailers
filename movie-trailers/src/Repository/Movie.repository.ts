import { VideoModel } from '../Models/Video.model';
import { IMovieRepository } from '../Interfaces/IMovieRepository.interface';
import { Request } from '../utilities/Request';
import { ErrorMessages } from '../Constants/ErrorMessages.constant';
import { ApplicationSettings } from '../Settings/ApplicationSettings';
import { HttpError } from 'routing-controllers';
import { StatusCode } from '../Constants/StatusCode.constant';

export class MovieRepository implements IMovieRepository {
    public async getMovieDetails(movieURL: string): Promise<any> {
        const options = {
            url: movieURL
        };

        const request = new Request();
        const movieDetails = await request.promiseRequest(options);
        if (movieDetails.code === 5100) {
            return ErrorMessages.MOVIE_NOT_FOUND;
        }
        return movieDetails;
    }

    public async getMovieTrailers(movieID: string): Promise<string[] | string> {
        const options = {
            url: `http://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${ApplicationSettings.Current.api_key}`
        };

        const request = new Request();
        const trailers = await request.promiseRequest(options);

        if (trailers.status_code === 34) {
            return ErrorMessages.MOVIE_NOT_FOUND;
        }

        const movieTrailers: string[] = trailers.results.map((trailer: VideoModel) => {
            if (trailer.site === 'YouTube') {
                return `https://www.youtube.com/watch?v=${trailer.key}`;
            }
        });

        return movieTrailers;
    }
}
