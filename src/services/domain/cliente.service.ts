import { ImageUtilService } from './../image-util.service';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './../storage_service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient, public storage: StorageService, public imageUtilService: ImageUtilService) {

    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(clienteDTO: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, clienteDTO, {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`, formData, {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
    
 }