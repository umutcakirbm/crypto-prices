import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSONObject, JSONType, JSONValue } from '../models/json';
import { camelizeResponse } from '../utils/common';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<JSONType>,
    next: HttpHandler
  ): Observable<HttpEvent<JSONType>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<JSONType>) => {
        if (event instanceof HttpResponse) {
          event = event.clone<JSONType>({ body: this.camelizeBody(event.body) });
        }
        return event;
      })
    );
  }

  private camelizeBody(body: JSONType | null | undefined): JSONObject {
    if (body === null || body === undefined) {
        return {};
    }
    return camelizeResponse(body);
  }
}
