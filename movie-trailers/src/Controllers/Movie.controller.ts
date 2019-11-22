import { JsonController, Get, QueryParam, HttpError } from 'routing-controllers';
import { MovieManager } from '../Managers/Movie.manager';
import { StatusCode } from '../Constants/StatusCode.constant';
import { TrailerResponse } from '../Models/Response/TrailerResponse';

@JsonController('movie')
export class MovieController {

    @Get('/trailer')
    async getTrialers(@QueryParam('movie-url') movieURL: string): Promise<TrailerResponse> {
        const movieManager = new MovieManager();
        const result: string[] = await movieManager.getMovieTrailers(movieURL);

        if (!Array.isArray(result)) {
            throw new HttpError(StatusCode.BAD_REQUEST, result);
        }

        return {
            status: StatusCode.SUCCESS,
            trailer: result
        };
    }
}
