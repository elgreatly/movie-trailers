import { VideoModel } from '../Models/Video.model';

export interface IMovieRepository {
    getMovieDetails(movieURL: string): Promise<any>;
    getMovieTrailers(movieID: string): Promise<string[] | string>;
}
