import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryUpdateComponent } from './salary-update.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

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
  declarations: [SalaryUpdateComponent],
  exports: [
    SalaryUpdateComponent
  ]
})
export class SalaryUpdateModule { }
