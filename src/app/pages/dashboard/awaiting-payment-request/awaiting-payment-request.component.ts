import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AwaitingPaymentRequestModel } from 'src/app/core/models/dashboard/awaiting-payment-request.model';
import { UserPaymentService } from 'src/app/core/services/users/user-payment.service';

@Component({
  selector: 'app-awaiting-payment-request',
  templateUrl: './awaiting-payment-request.component.html',
  styleUrls: ['./awaiting-payment-request.component.scss']
})
export class AwaitingPaymentRequestComponent implements OnInit {
  userData: Array<AwaitingPaymentRequestModel>;
  @Output() paymentRequest = new EventEmitter<number>();

  constructor(
    private userPaymentService: UserPaymentService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userPaymentService.getWaitingAprrovingUserPayment().subscribe(res => {
      this.userData = res;
      this.paymentRequest.emit(res.length);
      this.cdr.detectChanges();
    });
  }
}
