import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { CreateDepartmentModel } from 'src/app/core/models/settings/company-info/department/create-department.model';
import { UpdateDepartmentModel } from 'src/app/core/models/settings/company-info/department/update-department.model';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {

  dataSource: CustomStore;
  branchOfficeDataList: any[];
  constructor(
    private companyInfoService: CompanyInfoService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.SetBranchOfficeDataList();

    let observable: Promise<any>;
    this.dataSource = new CustomStore({
      key: 'this',
      load: () => GridUtil.handleGridResponse(this.companyInfoService.getDepartments()),
      insert: (values: any) => {
        if (values.branchOfficeId && values.name) {
          let create = this.SetCreateDepartment({ name: values.name.toUpperCase(), branchOfficeId: values.branchOfficeId });
          return GridUtil.handleGridResponse(this.companyInfoService.createDepartment(create).pipe(map(res => {
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
        let update = this.SetUpdateDepartment({
          id: values.id,
          name: data.name !== undefined ? data.name.toUpperCase() : values.name,
          branchOfficeId: data.branchOfficeId !== undefined ? data.branchOfficeId : values.branchOfficeId,
        });
        return GridUtil.handleGridResponse(this.companyInfoService.updateDepartment(update).pipe(map(res => {
          if (res.data > 0) {
            this.toastrService.success(res.messages.join('<br>')
              , "Başarılı");
          } else {
            this.toastrService.error(res.messages.join('<br>'), "Hatalı");
          }
        })));
      },
      remove: (key) => {
        return GridUtil.handleGridResponse(this.companyInfoService.deleteDepartment(key.id).pipe(map(res => {
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

  SetCreateDepartment(config: CreateDepartmentModel): { name: string, branchOfficeId: number } {
    return {
      name: config.name,
      branchOfficeId: config.branchOfficeId
    };
  }

  SetUpdateDepartment(config: UpdateDepartmentModel): { id: number, name: string, branchOfficeId: number } {
    return {
      id: config.id,
      name: config.name,
      branchOfficeId: config.branchOfficeId
    };
  }

  SetBranchOfficeDataList() {
    this.companyInfoService.getBranchOffices().subscribe(res => {
      this.branchOfficeDataList = res;
      this.cdr.detectChanges();
    });
  }
}
