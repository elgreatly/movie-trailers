export interface IMovieManager {
    getMovieTrailers(movieURL: string): Promise<any>;
}
