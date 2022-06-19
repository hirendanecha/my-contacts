import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'token';

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', token) });
    }

    if (!request.headers.has('content-type')) {
      request.headers.set('content-type', 'application/json');
      request.headers.set('accept', 'application/json, text/plain, */*');
    }

    return next.handle(request).pipe(map(event => {
      return event;
    }), catchError(err => {
      switch (err.status) {
        case 400:
          // Display ERROR toast message here;
          console.log(err?.error?.message);
          break;
        case 401:
          localStorage.clear();
          const url = '/login';
          this.router.navigateByUrl(url);
          break;
        case 500:
          // Display ERROR toast message here;
          break;
        default:
          break;
      }

      return throwError(err);
    }), finalize(() => {
    }));
  }
}
