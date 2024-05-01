import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLeaveModel } from 'src/app/core/models/users/leave/user-leave-model';
import { UserDemandService } from 'src/app/core/services/users/user-demand.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-dashboard-leave',
  templateUrl: './dashboard-leave.component.html',
  styleUrls: ['./dashboard-leave.component.scss']
})
export class DashboardLeaveComponent implements OnInit {
  userData: Array<UserLeaveModel>;
  @Output() dashboardLeave = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private userDemandService:UserDemandService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userDemandService.getApprovedUserLeave().subscribe(res => {
      this.userData = res;
      this.dashboardLeave.emit(res.length);
      this.cdr.detectChanges();
    });
  }

  isToday(startDate: any): boolean {
    const today = new Date();
    const date = new Date(startDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth()
    );
  }

  isTomorrow(startDate: any): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(startDate);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth()
    );
  }
}
