import { CartService } from './domain/cart.service';
import { StorageService } from './storage_service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    JwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService, public cart_service: CartService) {

    }

    authenticate(credenciaisDTO: CredenciaisDTO) {

        return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciaisDTO, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.JwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cart_service.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null);
    }

    refreshToken() {

        let localUser = this.storage.getLocalUser();
        if (localUser != null) {
            return this.http.post(
                `${API_CONFIG.baseUrl}/authorization/refresh_token`,
                {},
                {
                    observe: 'response',
                    responseType: 'text'
                })
        } else {
            return null;
        }
    }
}