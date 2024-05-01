import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule, DxToastModule } from 'devextreme-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { PersonelInformationComponent } from './personel-information/personel-information.component';
import { OtherInformationComponent } from './other-information/other-information.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SalaryComponent } from './salary/salary.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { JobPositionComponent } from './job-position/job-position.component';
import { JobPositionCreateModule } from './job-position/job-position-create/job-position-create.module';
import { JobPositionUpdateModule } from './job-position/job-position-update/job-position-update.module';
import { SalaryCreateModule } from './salary/salary-create/salary-create.module';
import { SalaryUpdateModule } from './salary/salary-update/salary-update.module';
import { LeavesCreateComponent } from './leave/leave-create/leave-create.component';
import { LeavesUpdateComponent } from './leave/leave-update/leave-update.component';
import { LeavesComponent } from './leave/leave.component';
import { EmbezzlementComponent } from './embezzlement/embezzlement.component';
import { EmbezzlementCreateComponent } from './embezzlement/embezzlement-create/embezzlement-create.component';
import { EmbezzlementUpdateComponent } from './embezzlement/embezzlement-update/embezzlement-update.component';
import { EducationComponent } from './education/education.component';
import { EducationCreateComponent } from './education/education-create/education-create.component';
import { EducationUpdateComponent } from './education/education-update/education-update.component';
import { DocumentComponent } from './document/document.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { DocumentUpdateComponent } from './document/document-update/document-update.component';
import { JobPositionButtonComponent } from './job-position-button/job-position-button.component';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { PaymentComponent } from './payment/payment.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { OvertimeCreateComponent } from './overtime/overtime-create/overtime-create.component';
import { OvertimeUpdateComponent } from './overtime/overtime-update/overtime-update.component';
import { PaymentCreateComponent } from './payment/payment-create/payment-create.component';
import { PaymentUpdateComponent } from './payment/payment-update/payment-update.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChangeProfileImageComponent } from './change-profile-image/change-profile-image.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "tr-TR" },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: "{ useUtc: true }"}
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserEditComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DxToastModule,
    DxDataGridModule,
    DxButtonModule,
    DxBulletModule,
    DxTemplateModule,
    MatExpansionModule,
    InlineSVGModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatSelectSearchModule,
    JobPositionCreateModule,
    JobPositionUpdateModule,
    SalaryCreateModule,
    SalaryUpdateModule,
    MatCheckboxModule
  ],
  declarations: [
    UserEditComponent,
    UserInformationComponent,
    PersonelInformationComponent,
    OtherInformationComponent,
    JobPositionComponent,
    SalaryComponent,
    LeavesCreateComponent,
    LeavesUpdateComponent,
    LeavesComponent,
    EmbezzlementComponent,
    EmbezzlementCreateComponent,
    EmbezzlementUpdateComponent,
    EducationComponent,
    EducationCreateComponent,
    EducationUpdateComponent,
    DocumentComponent,
    DocumentCreateComponent,
    DocumentUpdateComponent,
    JobPositionButtonComponent,
    WorkingScheduleComponent,
    PaymentComponent,
    OvertimeComponent,
    OvertimeCreateComponent,
    OvertimeUpdateComponent,
    PaymentCreateComponent,
    PaymentUpdateComponent,
    ChangeProfileImageComponent,
    ChangePasswordComponent
  ]
})
export class UserEditModule { }
