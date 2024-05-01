import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLeaveModel } from 'src/app/core/models/users/leave/user-leave-model';
import { UserDemandService } from 'src/app/core/services/users/user-demand.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-awaiting-leave-request',
  templateUrl: './awaiting-leave-request.component.html',
  styleUrls: ['./awaiting-leave-request.component.scss']
})
export class AwaitingLeaveRequestComponent implements OnInit {
  @Output() awaitingLeaveRequest = new EventEmitter<number>();
  userData: Array<UserLeaveModel>;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private userDemandService:UserDemandService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userDemandService.getAwaitingApprovingUserLeave().subscribe(res => {
      this.userData = res;
      this.awaitingLeaveRequest.emit(res.length);
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
