import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude = "/login";

    if (request.url.search(toExclude) === -1) {
      const jwt = this.authService.getToken(); // Récupérer le token depuis le service AuthService

      if (jwt) {
        const reqWithToken = request.clone({
          setHeaders: { Authorization: "Bearer " + jwt }
        });
        return next.handle(reqWithToken); // Passer la requête avec le token
      }
    }

    // Si c'est la requête login ou si pas de token, passer la requête originale
    return next.handle(request);
  }
}

