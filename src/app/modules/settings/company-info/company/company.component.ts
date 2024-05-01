import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { BaseResponse } from 'src/app/core/models/base-response';
import { CreateCompanyModel } from 'src/app/core/models/settings/company-info/company/create-company.model';
import { UpdateCompanyModel } from 'src/app/core/models/settings/company-info/company/update-company.model';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  dataSource: CustomStore;

  constructor(private companyInfoService: CompanyInfoService, private toastrService: ToastrService) { }

  ngOnInit() {
    let observable: Promise<any>;
    this.dataSource = new CustomStore({
      key: 'this',
      load: () => GridUtil.handleGridResponse(this.companyInfoService.getCompanies()),
      insert: (values: any) => {
        if (values.name) {
          let create = this.SetCreateCompany({ name: values.name.toUpperCase() });
          return GridUtil.handleGridResponse(this.companyInfoService.createCompany(create).pipe(map(res => {
            if (res.data > 0) {
              this.toastrService.success(res.messages.join('<br>')
                , "Başarılı");
            } else {
              this.toastrService.error(res.messages.join('<br>'), "Hatalı");
            }
          })));
        }
        else {
          this.toastrService.warning("Lütfen Formu Kontrol Ediniz.", "Uyarı");
          return observable;
        }
      },
      update: (values: any, data) => {
        let update = this.SetUpdateCompany({
          id: values.id,
          name: data.name !== undefined ? data.name.toUpperCase() : values.name
        });
        return GridUtil.handleGridResponse(this.companyInfoService.updateCompany(update).pipe(map(res => {
          if (res.data > 0) {
            this.toastrService.success(res.messages.join('<br>')
              , "Başarılı");
          } else {
            this.toastrService.error(res.messages.join('<br>'), "Hatalı");
          }
        })));
      },
      remove: (key) => {
        return GridUtil.handleGridResponse(this.companyInfoService.deleteCompany(key.id).pipe(map(res => {
          if (res.data) {
            this.toastrService.success(res.messages.join('<br>')
              , "Başarılı");
          } else {
            this.toastrService.error(res.messages.join('<br>'), "Hatalı");
          }
        })))
      }
    });
  }

  SetCreateCompany(config: CreateCompanyModel): { name: string } {
    return {
      name: config.name
    };
  }

  SetUpdateCompany(config: UpdateCompanyModel): { id: number, name: string } {
    return {
      id: config.id,
      name: config.name
    };
  }
}
