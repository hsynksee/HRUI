import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxBulletModule,
    DxTemplateModule,
    MatExpansionModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path : '',
        component: UsersComponent
      }
    ])
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
