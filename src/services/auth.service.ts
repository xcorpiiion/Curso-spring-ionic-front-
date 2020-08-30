import { StorageService } from './storage_service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {

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
            token: tok
        };
        this.storage.setLocalUser(user);
    }
}