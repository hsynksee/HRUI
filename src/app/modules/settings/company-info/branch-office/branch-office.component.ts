import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { CreateBranchOfficeModel } from 'src/app/core/models/settings/company-info/branch-office/create-branch-office.model';
import { UpdateBranchOfficeModel } from 'src/app/core/models/settings/company-info/branch-office/update-branch-office.model';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html'
})
export class BranchOfficeComponent implements OnInit {

  dataSource: CustomStore;
  companyDataList: any[];
  constructor(
    private companyInfoService: CompanyInfoService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.SetCompanyDataList();

    let observable: Promise<any>;
    this.dataSource = new CustomStore({
      key: 'this',
      load: () => GridUtil.handleGridResponse(this.companyInfoService.getBranchOffices()),
      insert: (values: any) => {
        if (values.companyId && values.name) {
          let create = this.SetCreateBranchOffice({ name: values.name.toUpperCase(), companyId: values.companyId });
          return GridUtil.handleGridResponse(this.companyInfoService.createBranchOffice(create).pipe(map(res => {
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
        let update = this.SetUpdateBranchOffice({
          id: values.id,
          name: data.name !== undefined ? data.name.toUpperCase() : values.name,
          companyId: data.companyId !== undefined ? data.companyId : values.companyId,
        });
        return GridUtil.handleGridResponse(this.companyInfoService.updateBranchOffice(update).pipe(map(res => {
          if (res.data > 0) {
            this.toastrService.success(res.messages.join('<br>')
              , "Başarılı");
          } else {
            this.toastrService.error(res.messages.join('<br>'), "Hatalı");
          }
        })));
      },
      remove: (key) => {
        return GridUtil.handleGridResponse(this.companyInfoService.deleteBranchOffice(key.id).pipe(map(res => {
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

  SetCreateBranchOffice(config: CreateBranchOfficeModel): { name: string, companyId: number } {
    return {
      name: config.name,
      companyId: config.companyId
    };
  }

  SetUpdateBranchOffice(config: UpdateBranchOfficeModel): { id: number, name: string, companyId: number } {
    return {
      id: config.id,
      name: config.name,
      companyId: config.companyId
    };
  }

  SetCompanyDataList() {
    this.companyInfoService.getCompanies().subscribe(res => {
      this.companyDataList = res;
      this.cdr.detectChanges();
    });
  }
}
