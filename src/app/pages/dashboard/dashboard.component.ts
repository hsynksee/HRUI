import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor() { }

  _isAwaitingLeaveRequest: boolean = false;
  _isUserBirthday: boolean = false;
  _isAwaitingPaymentRequest: boolean = false;
  _isDashboardLeave: boolean = false;

  isAwaitingLeaveRequest(e) {
    if (e.length > 0)
      this._isAwaitingLeaveRequest = true;
    else
      this._isAwaitingLeaveRequest = false;
  }

  isUserBirthday(e) {
    if (e.length > 0)
      this._isUserBirthday = true;
    else
      this._isUserBirthday = false;
  }

  isAwaitingPaymentRequest(e) {
    if (e.length > 0)
      this._isAwaitingPaymentRequest = true;
    else
      this._isAwaitingPaymentRequest = false;
  }

  isDashboardLeave(e) {
    if (e.length > 0)
      this._isDashboardLeave = true;
    else
      this._isDashboardLeave = false;
  }
}
