import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';
import { UserEducationService } from 'src/app/core/services/users/user-education.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.scss']
})
export class EducationCreateComponent  implements OnInit{
  @Output() userEducationCreate = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  educationCreateForm: FormGroup;



  @Input() userId: number;

  _onDestroy = new Subject<void>();
  message: string;

  constructor(private fb: FormBuilder,
    private companyInfoService: CompanyInfoService,
    public userService: UserService,
    public userEducationService:UserEducationService,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.educationCreateForm = this.fb.group({
      userId: [this.userId, Validators.required],
      description: ["", Validators.required],
      name: ["", Validators.required],
      educator: ["", Validators.required],
      educationDate: ["", Validators.required],
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
  saveEducation() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.educationCreateForm.valid) {
      this.educationCreateForm.value.educationDate = this.adjustForTimezone(new Date(this.educationCreateForm.value.educationDate));
      this.userEducationService.createUserEducation(this.educationCreateForm.value).subscribe(
        res => {
          if (res.data == 0){
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userEducationCreate.emit("true");
          }else{
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userEducationCreate.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userEducationCreate.emit("true");
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz.","Uyarı");
      this.isLoadingSubject.next(false);
    }
  }
}
