import { StorageService } from './../services/storage_service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, caught) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor: ");
            console.log(errorObj);
            switch (errorObj.status) {
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }
            return Observable.throw(errorObj);
        }) as any;
    }

    handle403(errorObj) {
        if (this.storage.getLocalUser == null) {
            let alert = this.alertController.create({
                title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
                message: errorObj.message,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Ok'
                    }
                ]
            });
            alert.present();
            this.storage.setLocalUser(null);
        }
        
    }

    handle401() {
        let alert = this.alertController.create({
            title: 'Erro 401: falha de autentificação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertController.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};