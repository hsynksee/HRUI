import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseResponse } from "../../models/base-response";
import { AuthService } from "../auth/auth.service";
import { RequestDocumentCreateModel } from "../../models/users/request-document/request-document-create.model";

const API_URL=`${environment.apiUrl}/RequestDocument`;

@Injectable({
  providedIn: 'root',
})

export class RequestDocumentService{

  httpHeaders:HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.access_token) {
      return undefined;
    }

    this.httpHeaders = new HttpHeaders({
      Authorization: `${auth.access_token}`,
    });
  }

  createUserDocument(createModel: RequestDocumentCreateModel) {
    return this.http.post(`${API_URL}/CreateRequestDocument`, createModel, {
      headers: this.httpHeaders
    }).pipe(map((res: BaseResponse<number>) => res))
  }
}
