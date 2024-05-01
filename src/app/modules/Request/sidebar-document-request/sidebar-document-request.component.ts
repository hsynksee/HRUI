import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DocumentTypeEnum, DocumentTypeLabelMapping } from 'src/app/core/enums/request-document/document-type-enum.model';
import { VisaTypeLabelMapping, VisaTypeEnum } from 'src/app/core/enums/request-document/visa-type-enum.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestDocumentService } from 'src/app/core/services/users/request-document.service';

@Component({
  selector: 'app-sidebar-document-request',
  templateUrl: './sidebar-document-request.component.html',
  styleUrls: ['./sidebar-document-request.component.scss']
})
export class SidebarDocumentRequestComponent implements OnInit{
  currentUser: UserType;
  @Output() userDocumentRequestCreate = new EventEmitter<string>();
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  documentRequestCreateForm: FormGroup;

  //#region DocumentType
  documentTypeLabelMapping = DocumentTypeLabelMapping;
  documentTypeEnum = Object.values(DocumentTypeEnum).filter(value => typeof value === 'number');
  //#endregion

  //#region  VisaType
  visaTypeLabelMapping = VisaTypeLabelMapping;
  visaTypeEnum = Object.values(VisaTypeEnum).filter(value => typeof value === 'number');
  //#endregion


  @Input() userId: number;

  _onDestroy = new Subject<void>();
  message: string;
  getCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
  }
  constructor(private fb: FormBuilder,
    public requestDocumentService: RequestDocumentService,
    private toastrService: ToastrService,
    private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.documentRequestCreateForm = this.fb.group({
      userId: [this.currentUser.id],
      description: ["", Validators.required],
      travelStartDate: ["", Validators.required],
      travelEndDate: ["", Validators.required],
      lastDueDate: ["", Validators.required],
      destinationCountry: ["", Validators.required],
      visaType: ["", Validators.required],
      documentType: [1],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  adjustForTimezone(date: Date): Date {
    var timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
};
  saveDocumentRequest() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.documentRequestCreateForm.valid) {
      this.documentRequestCreateForm.value.startDate = this.adjustForTimezone(new Date(this.documentRequestCreateForm.value.startDate));
      this.documentRequestCreateForm.value.endDate = this.adjustForTimezone(new Date(this.documentRequestCreateForm.value.endDate));
      this.requestDocumentService.createUserDocument(this.documentRequestCreateForm.value).subscribe(
        res => {
          if (res.data == 0){
            this.toastrService.warning(res.messages[0].toString());
            this.isLoadingSubject.next(false);
            this.userDocumentRequestCreate.emit("true");
          }else{
            this.toastrService.success("İşlem Başarılı");
            this.isLoadingSubject.next(false);
            this.userDocumentRequestCreate.emit("true");
          }
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
          this.userDocumentRequestCreate.emit("true");
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz.","Uyarı");
      this.isLoadingSubject.next(false);
    }
  }
}
interface UserType {
  id:number;
}
