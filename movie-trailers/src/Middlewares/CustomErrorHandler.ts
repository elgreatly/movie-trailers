import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { StatusCode } from '../Constants/StatusCode.constant';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {


    error(error: any, request: any, response: any, next: (err: any) => any) {
        console.log(error);
        let statusCode = StatusCode.INTERNAL_ERROR;
        const message = error.message;

        if (error.httpCode) {
            statusCode = error.httpCode;
            console.log(error.message);
        }

        response.status(statusCode);
        response.send({
            status: statusCode,
            error: {
                code: statusCode,
                message: message
            }
        });
        next(null);
    }
}
