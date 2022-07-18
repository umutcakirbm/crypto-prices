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
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set(
          'Cache-Control',
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
        )
        .set('Expires', '0'),
    });

    return next.handle(newReq);
  }
}
