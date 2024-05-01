import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { DocumentTypeCreateModel } from 'src/app/core/models/settings/document-type/document-type-create.model';
import { DocumentTypeUpdateModel } from 'src/app/core/models/settings/document-type/document-type-update.model';
import { DocumentTypeService } from 'src/app/core/services/settings/document-type.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  dataSource: CustomStore;
​
  constructor(
      private documentTypeService: DocumentTypeService,
      private toastrService: ToastrService
  ) { }
​
  ngOnInit(): void {
      let observable: Promise<any>;
      this.dataSource = new CustomStore({
          key: 'this',
          load: () => GridUtil.handleGridResponse(this.documentTypeService.getDocumentTypes()),
          insert: (values: any) => {
              console.log(values);
              if (values.name) {
                  let create = this.SetCreateDocumentType({ name: values.name.toUpperCase() });
                  this.toastrService.success("İşlem Başarılı", "Başarılı");
                  return GridUtil.handleGridResponse(this.documentTypeService.createDocumentType(create));
              }
              else {
                  this.toastrService.warning("Lütfen Formu Kontrol Ediniz.", "Uyarı");
                  return observable;
              }
          },
          update: (values: any, data) => {
              let update = this.SetUpdateDocumentType({
                  id: values.id,
                  name: data.name !== undefined ? data.name.toUpperCase() : values.name
              });
              this.toastrService.success("İşlem Başarılı", "Başarılı");
              return GridUtil.handleGridResponse(this.documentTypeService.updateDocumentType(update));
          },
          remove: (key) => {
              this.toastrService.success("İşlem Başarılı", "Başarılı");
              return GridUtil.handleGridResponse(this.documentTypeService.deleteDocumentType(key.id))
          }
      });
  }
​
​
  SetCreateDocumentType(config: DocumentTypeCreateModel): { name: string } {
      return {
          name: config.name,
      };
  }
​
  SetUpdateDocumentType(config: DocumentTypeUpdateModel): { id:number, name: string } {
      return {
          id: config.id,
          name: config.name
      };
  }
}
