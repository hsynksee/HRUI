import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import { Observable, map } from "rxjs";
import { BaseResponse } from "../../models/base-response";
import { LeaveInformationModel } from "../../models/dashboard/leave-information.model";
import { UserLeaveCreateModel } from "../../models/users/leave/user-leave-create.model";
import { UserLeaveModel } from "../../models/users/leave/user-leave-model";
import { UserLeaveUpdateModel } from "../../models/users/leave/user-leave-update.model";

const API_URL_Demand = `${environment.apiUrl}/UserDemand`;

@Injectable({
  providedIn: 'root',
})
export class UserDemandService {
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
  getCurentUserLeaveBalance(): Observable<LeaveInformationModel> {
    return this.http.get(`${API_URL_Demand}/GetCurentUserLeaveBalance`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<LeaveInformationModel>) => res.data));
  }

  createUserLeave(createModel: UserLeaveCreateModel) {
    return this.http.post(`${API_URL_Demand}/CreateUserLeave`, createModel, {
      headers: this.httpHeaders
    }).pipe(map((res: BaseResponse<number>) => res))
  }

  updateUserLeave(updateModel: UserLeaveUpdateModel) {
    return this.http.put(`${API_URL_Demand}/UpdateUserLeave`, updateModel, {
      headers: this.httpHeaders
    }).pipe(map((res: BaseResponse<number>) => res))
  }

  deleteUserLeave(id: number) {
    return this.http.delete(`${API_URL_Demand}/DeleteUserLeave?id=${id}`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<boolean>) => res))
  }

  getUserLeaveById(id: number) {
    return this.http.get(`${API_URL_Demand}/GetUserLeaveById?id=${id}`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<UserLeaveModel>) => res))
  }

  getUserLeaveByUserId(id: number) {
    return this.http.get(`${API_URL_Demand}/GetLeaveByUserId?userId=${id}`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<Array<UserLeaveModel>>) => res))
  }

  getApprovedUserLeave(): Observable<Array<UserLeaveModel>> {
    return this.http.get(`${API_URL_Demand}/GetApprovedUserLeave`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<Array<UserLeaveModel>>) => res.data));
  }

  getAwaitingApprovingUserLeave(): Observable<Array<UserLeaveModel>> {
    return this.http.get(`${API_URL_Demand}/GetAwaitingApprovingUserLeave`, {
      headers: this.httpHeaders,
    }).pipe(map((res: BaseResponse<Array<UserLeaveModel>>) => res.data));
  }

}
