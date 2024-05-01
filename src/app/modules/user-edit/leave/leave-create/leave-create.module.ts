import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LeavesCreateComponent } from './leave-create.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatDividerModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  declarations: [LeavesCreateComponent],
  exports: [
    LeavesCreateComponent
  ]
})
export class LeavesCreateModule { }
