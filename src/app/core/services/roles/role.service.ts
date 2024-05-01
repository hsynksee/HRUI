import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from 'src/app/core/models/base-response';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { RoleModel } from '../../models/users/role.model';

const API_URL = `${environment.apiUrl}/User`;

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    httpHeaders: HttpHeaders;

    constructor(private http: HttpClient, private authService: AuthService) {
        const auth = this.authService.getAuthFromLocalStorage();
        if (!auth || !auth.access_token) {
            return undefined;
        }

        this.httpHeaders = new HttpHeaders({
            Authorization: `${auth.access_token}`,
        });
    }

    getRoles(): Observable<Array<RoleModel>> {
        return this.http.get(`${API_URL}/GetRoles`, {
            headers: this.httpHeaders,
        }).pipe(map((res: BaseResponse<Array<RoleModel>>) => res.data));
    }

    getRoleById(id: number) {
        return this.http.get(`${API_URL}/GetRoleById?id=${id}`, {
            headers: this.httpHeaders,
        }).pipe(map((res: BaseResponse<RoleModel>) => res))
    }
}
