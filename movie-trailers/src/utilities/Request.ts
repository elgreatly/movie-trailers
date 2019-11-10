import * as request from 'request';

export class Request {
    public async promiseRequest(options: any): Promise<any> {
        return new Promise((resolve, reject) => {
           request(options, (err, response, body) => {
               if (err) {
                   reject(new Error(err));
               } else {
                const parsedBody = (body) ? JSON.parse(body) : body;
                resolve(parsedBody);
               }
           });
        });
    }
}
