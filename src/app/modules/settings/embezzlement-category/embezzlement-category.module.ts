import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbezzlementCategoryComponent } from './embezzlement-category.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { DxDataGridModule, DxButtonModule, DxBulletModule, DxTemplateModule } from 'devextreme-angular';


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
        component: EmbezzlementCategoryComponent
      }
    ])
  ],
  declarations: [
    EmbezzlementCategoryComponent,
  ]
})
export class EmbezzlementCategoryModule { }
