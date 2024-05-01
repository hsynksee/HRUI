import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { JobPositionCreateComponent } from './job-position-create.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [
        JobPositionCreateComponent,
    ],
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
    exports: [
        JobPositionCreateComponent
    ]
})
export class JobPositionCreateModule { }
