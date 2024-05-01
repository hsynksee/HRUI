import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { StatusTypeEnumLabelMapping, StatusTypeEnum } from 'src/app/core/enums/user/leave/status-type-enum.model';
import { UserEducationService } from 'src/app/core/services/users/user-education.service';
import { UserService } from 'src/app/core/services/users/users.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @Output() newActiveTab = new EventEmitter<string>();
  @Input() userId: number;
  dataSource: CustomStore;
  educationId: number;

  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private userEducationService:UserEducationService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this._dataSource();
  }

  _dataSource() {
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => GridUtil.handleGridResponse(this.userEducationService.getUserEducationByUserId(this.userId)),
    });
  }

  editEducationClick(e, userEducationEdit) {
    this.educationId = e.data.id;
    this.modalService.open(userEducationEdit, { size: 'lg' });
  }

  deleteEducationClick(e) {
    swal({
      title: "Silmek İstediğinize Emin misiniz?",
      text: "Seçili eğitimi bilgisi silinecek!",
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Evet, Sil',
      cancelButtonText: 'Hayır',
    }).then((willDelete) => {
      if (willDelete.value) {
        this.userEducationService.deleteUserEducation(e.row.data.id).subscribe(
          res => {
            this.toastrService.success("Eğitim Bilgisi Silindi", "İşlem Başarılı");
            this._dataSource();
          },
          err => {
            this.toastrService.error("Bir Hata Oluştu. Lütfen Tekrar Deneyiniz", "Hata");
          });
      }
    });
  }

  showEducationModal(userEducationCreate) {
    this.modalService.open(userEducationCreate, { size: 'lg' });
  };

  reloadDataSource(e) {
    if (e == "true") {
      this.modalService.dismissAll();
      this._dataSource();
    }
  };
}

