import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { AccessTypeEnum, AccessTypeLabelMapping } from 'src/app/core/enums/user/access-type-enum.model';
import { ContractTypeEnum, ContractTypeLabelMapping } from 'src/app/core/enums/user/contract-type-enum.model';
import { RoleModel } from 'src/app/core/models/users/role.model';
import { RoleService } from 'src/app/core/services/roles/role.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {
  @Input() userId: number;

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  updateUserForm: FormGroup;


  roleList: Array<RoleModel>;
  roleSearch: FormControl = new FormControl();;
  roleFilteredData: ReplaySubject<(RoleModel)[]> = new ReplaySubject<(RoleModel)[]>(1);

  accessTypeLabelMapping = AccessTypeLabelMapping;
  accessTypeSources = Object.values(AccessTypeEnum).filter(value => typeof value === 'number');
  contractTypeLabelMapping = ContractTypeLabelMapping;
  contractTypeSources = Object.values(ContractTypeEnum).filter(value => typeof value === 'number');

  _onDestroy = new Subject<void>();
  message: string;

  constructor(private fb: FormBuilder,
    public userService: UserService,
    public roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit() {
    this.userService.getUserDetail(this.userId).subscribe(res => {
      this.getRoleSelectList();
      this.updateUserForm.controls["id"].setValue(res.data.id);
      this.updateUserForm.controls["name"].setValue(res.data.name);
      this.updateUserForm.controls["surname"].setValue(res.data.surname);
      this.updateUserForm.controls["emailBusiness"].setValue(res.data.emailBusiness);
      this.updateUserForm.controls["emailPersonal"].setValue(res.data.emailPersonal);
      this.updateUserForm.controls["phoneBusiness"].setValue(res.data.phoneBusiness);
      this.updateUserForm.controls["phonePersonal"].setValue(res.data.phonePersonal);
      this.updateUserForm.controls["startDate"].setValue(res.data.startDate);
      this.updateUserForm.controls["accessType"].setValue(res.data.accessType);
      this.updateUserForm.controls["contractType"].setValue(res.data.contractType);
      this.updateUserForm.controls["contractEndDate"].setValue(res.data.contractEndDate);
      this.updateUserForm.controls["roles"].setValue(res.data.roles);
    });

    this.updateUserForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      emailBusiness: ["", Validators.required],
      emailPersonal: ["", Validators.required],
      phoneBusiness: ["", Validators.required],
      phonePersonal: ["", Validators.required],
      roles: ["", Validators.required],
      startDate: [],
      accessType: [],
      contractType: [],
      contractEndDate: []
    });

    this.roleSearch.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRoleData();
      });
  }

  getRoleSelectList() {
    this.isLoadingSubject.next(true);
    this.roleService.getRoles().subscribe(res => {
      this.roleList = res;
      this.filterRoleData();
      this.isLoadingSubject.next(false);
    });
  }

  filterRoleData() {
    if (!this.roleList) {
      return;
    }
    let search = this.roleSearch.value;
    if (!search) {
      this.roleFilteredData.next(this.roleList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.roleFilteredData.next(
      this.roleList.filter(
        (x: any) => x.name.toLowerCase().indexOf(search) > -1
      )
    );
  };
  adjustForTimezone(date: Date): Date {
    var timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
};
  saveUser() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.updateUserForm.valid) {
      this.updateUserForm.value.startDate = this.adjustForTimezone(new Date(this.updateUserForm.value.startDate));
      this.updateUserForm.value.contractEndDate = this.adjustForTimezone(new Date(this.updateUserForm.value.contractEndDate));
      this.userService.updateUser(this.updateUserForm.value).subscribe(
        res => {
          this.toastrService.success("İşlem Başarılı");
          this.isLoadingSubject.next(false);
          // this.router.navigate(['/usermanagement/user']);
        },
        err => {
          console.log(err);
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz.","Uyarı");
      this.isLoadingSubject.next(false);
    }
  }

}
