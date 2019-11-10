export class VideoModel {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;

    constructor(init?: Partial<VideoModel>) {
        Object.assign(this, init);
    }

}
