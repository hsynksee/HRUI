import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { EmbezzlementCategoryCreateModel } from 'src/app/core/models/users/embezzlement-category/embezzlement-category-create.model';
import { EmbezzlementCategoryUpdateModel } from 'src/app/core/models/users/embezzlement-category/embezzlement-category-update.model';
import { EmbezzlementCategoryService } from 'src/app/core/services/settings/embezzlement-category.service';

@Component({
  selector: 'app-embezzlement-category',
  templateUrl: './embezzlement-category.component.html',
  styleUrls: ['./embezzlement-category.component.scss']
})
export class EmbezzlementCategoryComponent implements OnInit {
  dataSource: CustomStore;
​
  constructor(
      private embezzlementCategoryService: EmbezzlementCategoryService,
      private toastrService: ToastrService
  ) { }
​
  ngOnInit(): void {
      let observable: Promise<any>;
      this.dataSource = new CustomStore({
          key: 'this',
          load: () => GridUtil.handleGridResponse(this.embezzlementCategoryService.getEmbezzlementCategories()),
          insert: (values: any) => {
              console.log(values);
              if (values.name) {
                  let create = this.SetCreateEmbezzlementCategory({ name: values.name.toUpperCase() });
                  this.toastrService.success("İşlem Başarılı", "Başarılı");
                  return GridUtil.handleGridResponse(this.embezzlementCategoryService.createEmbezzlementCategory(create));
              }
              else {
                  this.toastrService.warning("Lütfen Formu Kontrol Ediniz.", "Uyarı");
                  return observable;
              }
          },
          update: (values: any, data) => {
              let update = this.SetUpdateEmbezzlementCategory({
                  id: values.id,
                  name: data.name !== undefined ? data.name.toUpperCase() : values.name
              });
              this.toastrService.success("İşlem Başarılı", "Başarılı");
              return GridUtil.handleGridResponse(this.embezzlementCategoryService.updateEmbezzlementCategory(update));
          },
          remove: (key) => {
              this.toastrService.success("İşlem Başarılı", "Başarılı");
              return GridUtil.handleGridResponse(this.embezzlementCategoryService.deleteEmbezzlementCategory(key.id))
          }
      });
  }
​
​
  SetCreateEmbezzlementCategory(config: EmbezzlementCategoryCreateModel): { name: string } {
      return {
          name: config.name,
      };
  }
​
  SetUpdateEmbezzlementCategory(config: EmbezzlementCategoryUpdateModel): { id:number, name: string } {
      return {
          id: config.id,
          name: config.name
      };
  }
}
