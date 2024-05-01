import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GridUtil } from 'src/app/_metronic/kt/_utils/GridUtil';
import { CreateJobTitleModel } from 'src/app/core/models/settings/company-info/job-title/create-job-title.model';
import { UpdateJobTitleModel } from 'src/app/core/models/settings/company-info/job-title/update-job-title.model';
import { CompanyInfoService } from 'src/app/core/services/settings/company-info.service';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html'
})
export class JobTitleComponent implements OnInit {

  dataSource: CustomStore;
  departmentDataList: any[];

  constructor(
    private companyInfoService: CompanyInfoService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.SetDepartmentDataList();

    let observable: Promise<any>;
    this.dataSource = new CustomStore({
      key: 'this',
      load: () => GridUtil.handleGridResponse(this.companyInfoService.getJobTitles()),
      insert: (values: any) => {
        if (values.departmentId && values.name) {
          let create = this.SetCreateJobTitle({ name: values.name.toUpperCase(), departmentId: values.departmentId });
          return GridUtil.handleGridResponse(this.companyInfoService.createJobTitle(create).pipe(map(res => {
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
        let update = this.SetUpdateJobTitle({
          id: values.id,
          name: data.name !== undefined ? data.name.toUpperCase() : values.name,
          departmentId: data.departmentId !== undefined ? data.departmentId : values.departmentId,
        });
        return GridUtil.handleGridResponse(this.companyInfoService.updateJobTitle(update).pipe(map(res => {
          if (res.data > 0) {
            this.toastrService.success(res.messages.join('<br>')
              , "Başarılı");
          } else {
            this.toastrService.error(res.messages.join('<br>'), "Hatalı");
          }
        })));
      },
      remove: (key) => {
        return GridUtil.handleGridResponse(this.companyInfoService.deleteJobTitle(key.id).pipe(map(res => {
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

  SetCreateJobTitle(config: CreateJobTitleModel): { name: string, departmentId: number } {
    return {
      name: config.name,
      departmentId: config.departmentId
    };
  }

  SetUpdateJobTitle(config: UpdateJobTitleModel): { id: number, name: string, departmentId: number } {
    return {
      id: config.id,
      name: config.name,
      departmentId: config.departmentId
    };
  }

  SetDepartmentDataList() {
    this.companyInfoService.getDepartments().subscribe(res => {
      this.departmentDataList = res;
      this.cdr.detectChanges();
    });
  }
}
