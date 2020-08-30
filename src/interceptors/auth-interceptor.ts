import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage_service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, caught) => {
            let localUser = this.storage.getLocalUser();
            let tamanhoUrl = API_CONFIG.baseUrl.length;
            let requestToApi = req.url.substring(0, tamanhoUrl);
            if (localUser && requestToApi) {
                const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
                return next.handle(authReq);
            } else {
                return next.handle(req);
            }
        });
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};