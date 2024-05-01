import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-position-button',
  templateUrl: './job-position-button.component.html',
  styleUrls: ['./job-position-button.component.scss']
})

export class JobPositionButtonComponent {
  @Input() userId: number;

isJobPositionVisible:boolean=false;
isSalaryVisible:boolean=false;
isWorkSchedulesVisible:boolean=false;

isJobPositionButtonClicked = false;
isSalaryButtonClicked = false;
isWorkSchedulesButtonClicked = false;

showJobPosition(){
  this.isJobPositionVisible=true;
  this.isSalaryVisible=false;
  this.isWorkSchedulesVisible=false;
}
showWorkSchedules(){
  this.isJobPositionVisible=false;
  this.isSalaryVisible=false;
  this.isWorkSchedulesVisible=true;
}
showSalary(){
  this.isJobPositionVisible=false;
  this.isSalaryVisible=true;
  this.isWorkSchedulesVisible=false;
}

toggleButton(button: string): void {

  this.isJobPositionButtonClicked = false;
  this.isSalaryButtonClicked = false;
  this.isWorkSchedulesButtonClicked = false;


  if (button === 'jobPosition') {
    this.isJobPositionButtonClicked = true;
  } else if (button === 'salary') {
    this.isSalaryButtonClicked = true;
  } else if (button === 'workSchedules') {
    this.isWorkSchedulesButtonClicked = true;
  }
}

}
