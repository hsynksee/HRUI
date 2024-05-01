import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LeaveTypeEnumLabelMapping, LeaveTypeEnum } from 'src/app/core/enums/user/leave/leave-type-enum.model';
import { LeaveInformationDetailModel } from 'src/app/core/models/dashboard/leave-information-detail.model';
import { LeaveInformationModel } from 'src/app/core/models/dashboard/leave-information.model';
import { UserDemandService } from 'src/app/core/services/users/user-demand.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-leave-information',
  templateUrl: './leave-information.component.html',
  styleUrls: ['./leave-information.component.scss']
})
export class LeaveInformationComponent implements OnInit {
  leaveData: Array<LeaveInformationDetailModel>;
  userData: LeaveInformationModel;
  futureLeave: any;
  annualLeave: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private userDemandService:UserDemandService,
    private cdr: ChangeDetectorRef
  ) {}

  leaveTypeEnumLabelMapping = LeaveTypeEnumLabelMapping;
  leaveTypeEnum = Object.values(LeaveTypeEnum).filter(value => typeof value === 'number');

  ngOnInit() {
    this.userDemandService.getCurentUserLeaveBalance().subscribe(res => {
      this.userData = res;
      this.annualLeave=res.annualLeave;
      this.futureLeave=res.futureLeave;
      this.leaveData = res.leaveDetails;
      console.log(this.leaveData);
      this.cdr.detectChanges();
    });
  }
}
