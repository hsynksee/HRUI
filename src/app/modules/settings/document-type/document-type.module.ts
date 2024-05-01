import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeComponent } from './document-type.component';
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
        component: DocumentTypeComponent
      }
    ])
  ],
  declarations: [
    DocumentTypeComponent,
  ]
})
export class DocumentTypeModule { }
