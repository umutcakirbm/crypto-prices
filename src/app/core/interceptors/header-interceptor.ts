import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { JSONType } from '../models/json';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<JSONType>,
    next: HttpHandler
  ): Observable<HttpEvent<JSONType>> {
    const newReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });

    return next.handle(newReq);
  }
}
