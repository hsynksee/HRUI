import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { UserEmbezzlementService } from 'src/app/core/services/users/user-embezzlement.service';
import { UserService } from 'src/app/core/services/users/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-embezzlement',
  templateUrl: './embezzlement.component.html',
  styleUrls: ['./embezzlement.component.scss']
})
export class EmbezzlementComponent implements OnInit {
  @Output() newActiveTab = new EventEmitter<string>();
  @Input() userId: number;
  dataSource: CustomStore;
  embezzlementId: number;



  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private userEmbezzlementService:UserEmbezzlementService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this._dataSource();
  }

  _dataSource() {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => GridUtil.handleGridResponse(this.userEmbezzlementService.getUserEmbezzlementByUserId(this.userId)),
    });
  }

  editEmbezzlementClick(e, userEmbezzlementEdit) {
    this.embezzlementId = e.data.id;
    this.modalService.open(userEmbezzlementEdit, { size: 'lg' });
  }

  deleteEmbezzlementClick(e) {
    swal({
      title: "Silmek İstediğinize Emin misiniz?",
      text: "Seçili maaş bilgisi silinecek!",
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Evet, Sil',
      cancelButtonText: 'Hayır',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.userEmbezzlementService.deleteUserEmbezzlement(e.row.data.id).subscribe(
          res => {
            this.toastrService.success("Maaş Bilgisi Silindi", "İşlem Başarılı");
            this._dataSource();
          },
          err => {
            this.toastrService.error("Bir Hata Oluştu. Lütfen Tekrar Deneyiniz", "Hata");
          });
      }
    });
  }

  showEmbezzlementModal(userEmbezzlementCreate) {
    this.modalService.open(userEmbezzlementCreate, { size: 'lg' });
  };

  reloadDataSource(e) {
    if (e == "true") {
      this.modalService.dismissAll();
      this._dataSource();
    }
  };
}
