import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPersonelInformationModel } from 'src/app/core/models/users/personel-information/user-personel-information.model';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-birthday',
  templateUrl: './user-birthday.component.html',
  styleUrls: ['./user-birthday.component.scss']
})
export class UserBirthdayComponent implements OnInit {
  userData: Array<UserPersonelInformationModel>;
  @Output() userBirthday = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getUserPersonelInformationLastWeek().subscribe(res => {
      this.userData = res;
      this.userBirthday.emit(res.length);
      this.cdr.detectChanges();
    });
  }

  isToday(dateOfBirth: any): boolean {
    const today = new Date();
    const date = new Date(dateOfBirth);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth()
    );
  }

  isTomorrow(dateOfBirth: any): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Date(dateOfBirth);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth()
    );
  }
}
