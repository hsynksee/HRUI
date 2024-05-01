import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { UserDocumentService } from 'src/app/core/services/users/user-document.service';
import { UserService } from 'src/app/core/services/users/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @Output() newActiveTab = new EventEmitter<string>();
  @Input() userId: number;
  dataSource: CustomStore;
  documentId: number;



  constructor(
    private router: Router,
    private userDocumentService: UserDocumentService,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) {
  }

  openNewPage(item: any) {
    const url = "http://localhost:7290/" + item.data.path;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this._dataSource();
  }

  _dataSource() {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => GridUtil.handleGridResponse(this.userDocumentService.getUserDocumentsByUserId(this.userId)),
    });
  }

  editDocumentClick(e, userDocumentEdit) {
    this.documentId = e.data.id;
    this.modalService.open(userDocumentEdit, { size: 'lg' });
  }

  deleteDocumentClick(e) {
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
        this.userDocumentService.deleteUserDocument(e.row.data.id).subscribe(
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

  showDocumentModal(userDocumentCreate) {
    this.modalService.open(userDocumentCreate, { size: 'lg' });
  };

  reloadDataSource(e) {
    if (e == "true") {
      this.modalService.dismissAll();
      this._dataSource();
    }
  };
}
