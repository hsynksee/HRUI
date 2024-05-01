import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { UserService } from 'src/app/core/services/users/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  dataSource: CustomStore;

  message: string;
  isActiveMessage: string;
  constructor(private userService: UserService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    let observable: Promise<any>;
    this.dataSource = new CustomStore({
      key: 'this',
      load: () => GridUtil.handleGridResponse(this.userService.getUsers())
    });
  }

  setUserActive(e) {
    this.isActiveMessage = e.row.data.isActive ? "Pasif" : "Aktif";
    swal({
      title: this.isActiveMessage + " Yapmak İstediğinize Emin misiniz?",
      text: "'" + e.data.name + "' isimli kullanıcı " + this.isActiveMessage + " yapılacaktır!",
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Evet, ' + this.isActiveMessage + " Yap",
      cancelButtonText: 'Hayır',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.message = '';
        this.userService.setUserActive(e.row.data.id).subscribe(res => {
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

  routeToCreateUser(){
    this.router.navigate(['/user-create']);
  }

  editUserClick(e) {
    this.router.navigate(['/user-edit/'+ e.row.data.id]);
}
}
