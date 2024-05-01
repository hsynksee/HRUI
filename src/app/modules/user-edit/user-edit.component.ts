import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/core/services/roles/role.service';
import { UserService } from 'src/app/core/services/users/users.service';
import swal from 'sweetalert2';
import { ChangeProfileImageComponent } from './change-profile-image/change-profile-image.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';

type Tabs = 'user-information' | 'job-position'| 'personel-information' | 'other-information'  |'leave' | 'payment' | 'overtime' |   'embezzlement' | 'education' | 'document';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy {
  activeTab: Tabs = 'user-information';
  userId: number;
  profilPicture: string = './assets/media/avatars/blank.png';
  userName: string;
  userEmail: string;
  userPhone: string;
  startDate: string=new Date().toDateString();
  isActive: boolean;

  isActiveMessage: string;
  message: string;


  constructor(private fb: FormBuilder,
    public userService: UserService,
    public roleService: RoleService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {
    this.userId = this.activatedRoute.snapshot.params.id;

    this.userService.getUserDetail(this.userId).subscribe(res => {
      this.userName = res.data.name + " " + res.data.surname;
      this.userEmail = res.data.emailBusiness;
      this.userPhone = res.data.phoneBusiness;
      this.startDate = res.data.startDate?.toString();
      this.isActive = res.data.isActive;
      if (res.data.profilPicture != null){
        this.profilPicture = res.data.profilPicture;
      }
    });
  }
  openChangeProfileImageDialog() {
    const dialogRef = this.dialog.open(ChangeProfileImageComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openChangePasswordDialog() {
    const changePass = this.dialog.open(ChangePasswordComponent, {
      width: '900px',
    });

    changePass.afterClosed().subscribe(result => {
    });
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  setUserActive() {
    this.isActiveMessage = this.isActive ? "Pasif" : "Aktif";
    swal({
      title: this.isActiveMessage + " Yapmak İstediğinize Emin misiniz?",
      text: "'" + this.userName + "' isimli kullanıcı " + this.isActiveMessage + " yapılacaktır!",
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Evet, ' + this.isActiveMessage + " Yap",
      cancelButtonText: 'Hayır',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.message = '';
        this.userService.setUserActive(this.userId).subscribe(res => {
          this.toastrService.success("İşlem Başarılı");
          window.location.reload();
        },
          err => {
            err.error.messages.forEach(element => {
              this.message += element + '. ';
            });
            this.toastrService.error(this.message, "Hata");
          });
      }
    });
  }
}
