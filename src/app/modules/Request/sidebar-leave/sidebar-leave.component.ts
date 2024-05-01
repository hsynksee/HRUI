import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { LeaveTypeEnum, LeaveTypeEnumLabelMapping } from 'src/app/core/enums/user/leave/leave-type-enum.model';
import { StatusTypeEnum, StatusTypeEnumLabelMapping } from 'src/app/core/enums/user/leave/status-type-enum.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserDemandService } from 'src/app/core/services/users/user-demand.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-sidebar-leave',
  templateUrl: './sidebar-leave.component.html',
  styleUrls: ['./sidebar-leave.component.scss']
})
export class SidebarLeaveComponent implements OnInit{
  currentUser: UserType;
  @Output() userLeaveCreate = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  leaveCreateForm: FormGroup;

  //#region CurrencyType
  leaveTypeEnumLabelMapping = LeaveTypeEnumLabelMapping;
  leaveTypeEnum = Object.values(LeaveTypeEnum).filter(value => typeof value === 'number');
  //#endregion

  //#region Period
  statusTypeEnumLabelMapping = StatusTypeEnumLabelMapping;
  statusTypeEnum = Object.values(StatusTypeEnum).filter(value => typeof value === 'number');
  //#endregion


  @Input() userId: number;

  _onDestroy = new Subject<void>();
  message: string;
  getCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
  }
  constructor(private fb: FormBuilder,
    public userService: UserService,
    private toastrService: ToastrService,
    private userDemandService:UserDemandService,
    private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.leaveCreateForm = this.fb.group({
      userId: [this.currentUser.id],
      description: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      leaveTypeId: ["", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  adjustForTimezone(date: Date): Date {
    var timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
};
  saveLeave() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.leaveCreateForm.valid) {
      this.leaveCreateForm.value.startDate = this.adjustForTimezone(new Date(this.leaveCreateForm.value.startDate));
      this.leaveCreateForm.value.endDate = this.adjustForTimezone(new Date(this.leaveCreateForm.value.endDate));
      this.userDemandService.createUserLeave(this.leaveCreateForm.value).subscribe(
        res => {
          if (res.data == 0){
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userLeaveCreate.emit("true");
          }else{
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userLeaveCreate.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userLeaveCreate.emit("true");
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz.","Uyarı");
      this.isLoadingSubject.next(false);
    }
  }
}
interface UserType {
  id:number;
}
