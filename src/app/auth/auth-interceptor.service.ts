import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { flatMap, take, map } from 'rxjs/operators';


export class AuthInterceptorService implements HttpInterceptor {
    
    //private user: Observable<{user: User}>;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
      if(req.url == '/pb/login')
        return next.handle(req);
        
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
              return authState.user;
            }),
            flatMap(user => {

                if(!user.token) {
                  this.router.navigate(["/login"]);
                  return;
                }

                const securedUrl = req.clone({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                      })
                });
              return next.handle(securedUrl);
            }),
          );
    }
}