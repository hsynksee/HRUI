import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';
import { UserEducationService } from 'src/app/core/services/users/user-education.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-education-update',
  templateUrl: './education-update.component.html',
  styleUrls: ['./education-update.component.scss']
})
export class EducationUpdateComponent implements OnInit{
  @Output() userEducationEdit = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  educationUpdateForm: FormGroup;


   @Input() educationId: number;

  _onDestroy = new Subject<void>();
  message: string;

  constructor(private fb: FormBuilder,
    private companyInfoService: CompanyInfoService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private userEducationService: UserEducationService,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.educationUpdateForm = this.fb.group({
      id: ["", Validators.required],
      userId: ["", Validators.required],
      description: ["", Validators.required],
      name: ["", Validators.required],
      educator: ["", Validators.required],
      educationDate: ["", Validators.required],
    });

    this.userEducationService.getUserEducationById(this.educationId).subscribe(res => {
      this.educationUpdateForm.controls["id"].setValue(res.data.id);
      this.educationUpdateForm.controls["userId"].setValue(res.data.userId);
      this.educationUpdateForm.controls["description"].setValue(res.data.description);
      this.educationUpdateForm.controls["name"].setValue(res.data.name);
      this.educationUpdateForm.controls["educator"].setValue(res.data.educator);
      this.educationUpdateForm.controls["educationDate"].setValue(res.data.educationDate);
    })
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
    if (this.educationUpdateForm.valid) {
      this.educationUpdateForm.value.educationDate = this.adjustForTimezone(new Date(this.educationUpdateForm.value.educationDate));
      this.userEducationService.updateUserEducation(this.educationUpdateForm.value).subscribe(
        res => {
          if (res.data == 0) {
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userEducationEdit.emit("true");
          } else {
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userEducationEdit.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userEducationEdit.emit("true");
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz.", "Uyarı");
      this.isLoadingSubject.next(false);
    }
  }
}
