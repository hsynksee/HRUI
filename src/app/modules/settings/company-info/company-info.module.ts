import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfoComponent } from './company-info.component';
import { RouterModule } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BranchOfficeComponent } from './branch-office/branch-office.component';
import { DepartmentComponent } from './department/department.component';
import { JobTitleComponent } from './job-title/job-title.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxBulletModule,
    DxTemplateModule,
    MatExpansionModule,
    RouterModule.forChild([
      {
        path : '',
        component: CompanyInfoComponent
      }
    ])
  ],
  declarations: [
    CompanyInfoComponent,
    CompanyComponent,
    BranchOfficeComponent,
    DepartmentComponent,
    JobTitleComponent
  ],
  exports: [
    CompanyComponent,
    BranchOfficeComponent,
    DepartmentComponent,
    JobTitleComponent
  ]
})
export class CompanyInfoModule { }
