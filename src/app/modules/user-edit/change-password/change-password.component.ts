import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  @Output() userChangepasswordCreate = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  changepasswordCreateForm: FormGroup;



  @Input() userId: number;

  _onDestroy = new Subject<void>();
  message: string;
  currentUser: UserType;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.changepasswordCreateForm = this.fb.group({
      userId: [this.currentUser.id],
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordRepeat: ["", Validators.required],
    });
  }

  getCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  saveChangepassword() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.changepasswordCreateForm.valid) {
      this.userService.changePassword(this.changepasswordCreateForm.value).subscribe(
        res => {
          if (res.data == 0){
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userChangepasswordCreate.emit("true");
          }else{
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userChangepasswordCreate.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userChangepasswordCreate.emit("true");
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
