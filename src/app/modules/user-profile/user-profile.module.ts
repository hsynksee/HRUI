import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCreateComponent } from '../user-edit/document/document-create/document-create.component';
import { DocumentUpdateComponent } from '../user-edit/document/document-update/document-update.component';
import { DocumentComponent } from '../user-edit/document/document.component';
import { EducationCreateComponent } from '../user-edit/education/education-create/education-create.component';
import { EducationUpdateComponent } from '../user-edit/education/education-update/education-update.component';
import { EducationComponent } from '../user-edit/education/education.component';
import { EmbezzlementCreateComponent } from '../user-edit/embezzlement/embezzlement-create/embezzlement-create.component';
import { EmbezzlementUpdateComponent } from '../user-edit/embezzlement/embezzlement-update/embezzlement-update.component';
import { EmbezzlementComponent } from '../user-edit/embezzlement/embezzlement.component';
import { JobPositionButtonComponent } from '../user-edit/job-position-button/job-position-button.component';
import { JobPositionComponent } from '../user-edit/job-position/job-position.component';
import { LeavesCreateComponent } from '../user-edit/leave/leave-create/leave-create.component';
import { LeavesUpdateComponent } from '../user-edit/leave/leave-update/leave-update.component';
import { LeavesComponent } from '../user-edit/leave/leave.component';
import { OtherInformationComponent } from '../user-edit/other-information/other-information.component';
import { OvertimeCreateComponent } from '../user-edit/overtime/overtime-create/overtime-create.component';
import { OvertimeUpdateComponent } from '../user-edit/overtime/overtime-update/overtime-update.component';
import { OvertimeComponent } from '../user-edit/overtime/overtime.component';
import { PaymentCreateComponent } from '../user-edit/payment/payment-create/payment-create.component';
import { PaymentUpdateComponent } from '../user-edit/payment/payment-update/payment-update.component';
import { PaymentComponent } from '../user-edit/payment/payment.component';
import { PersonelInformationComponent } from '../user-edit/personel-information/personel-information.component';
import { SalaryComponent } from '../user-edit/salary/salary.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserInformationComponent } from '../user-edit/user-information/user-information.component';
import { WorkingScheduleComponent } from '../user-edit/working-schedule/working-schedule.component';



@NgModule({
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
    PaymentUpdateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserProfileModule { }
