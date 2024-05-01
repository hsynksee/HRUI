import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserBirthdayComponent } from './user-birthday/user-birthday.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardLeaveComponent } from './dashboard-leave/dashboard-leave.component';
import { AwaitingLeaveRequestComponent } from './awaiting-leave-request/awaiting-leave-request.component';
import { AwaitingPaymentRequestComponent } from './awaiting-payment-request/awaiting-payment-request.component';
import { UserDistributionChartComponent } from './user-distribution-chart/user-distribution-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeaveInformationComponent } from './leave-information/leave-information.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserBirthdayComponent,
    ProfileComponent,
    DashboardLeaveComponent,
    AwaitingLeaveRequestComponent,
    AwaitingPaymentRequestComponent,
    UserDistributionChartComponent,
    LeaveInformationComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ])
  ],
})
export class DashboardModule {}
