import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.scss']
})
export class ChangeProfileImageComponent implements OnInit{
  @Input() userId: number;
  currentUser: UserType;
  @Output() userPictureCreate = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  pictureCreateForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ChangeProfileImageComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    public userPictureService: UserService,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  onClose(): void {
    this.dialogRef.close();
  }
  isPaid=false;
  _onDestroy = new Subject<void>();
  message: string;


  ngOnInit() {
    this.getCurrentUser();
    this.pictureCreateForm = this.fb.group({
      id: [this.currentUser.id, ],
      extension: [""],
      profilPicture: [null],
    });
    this.pictureCreateForm.get('isPaid').valueChanges.subscribe(value => {
      if (!value) {
        this.pictureCreateForm.patchValue({
          isPaid: false
        });
      }
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
  adjustForTimezone(date: Date): Date {
    var timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
};
onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (this.pictureCreateForm) {
    const extension = this.extractFileExtension(file);

    this.pictureCreateForm.patchValue({
      extension: extension
    });

    this.convertFileToBase64(file);
  }
}
convertFileToBase64(file: File): void {
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Content = reader.result as string;

    // Remove the prefix "data:image/jpeg;base64,"
    const startIndex = base64Content.indexOf(',') + 1;
    const cleanedBase64 = base64Content.substring(startIndex);

    this.pictureCreateForm.patchValue({
      profilPicture: cleanedBase64
    });
  };

  reader.readAsDataURL(file);
}
extractFileExtension(file: File): string {
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf('.');
  return fileName.substring(lastDotIndex + 1);
}
  savePicture() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.pictureCreateForm.valid) {
      this.userPictureService.updateUserPicture(this.pictureCreateForm.value).subscribe(
        res => {
          if (res.data == 0){
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userPictureCreate.emit("true");
          }else{
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userPictureCreate.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userPictureCreate.emit("true");
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
