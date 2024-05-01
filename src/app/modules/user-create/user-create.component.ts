import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { AccessTypeEnum, AccessTypeLabelMapping } from 'src/app/core/enums/user/access-type-enum.model';
import { ContractTypeEnum, ContractTypeLabelMapping } from 'src/app/core/enums/user/contract-type-enum.model';
import { RoleModel } from 'src/app/core/models/users/role.model';
import { RoleService } from 'src/app/core/services/roles/role.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  createUserForm: FormGroup;
  
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
    private toastrService: ToastrService
    ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.getRoleSelectList();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      emailBusiness: ["", Validators.required],
      emailPersonal: ["", Validators.required],
      phoneBusiness: ["", Validators.required],
      phonePersonal: ["", Validators.required],
      startDate: [""],
      accessType: [""],
      contractType: [""],
      contractEndDate: [""],
      roles: ["", Validators.required],
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

  saveSettings() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.createUserForm.valid) {
      this.userService.createUser(this.createUserForm.value).subscribe(
        res => {
          this.toastrService.success("İşlem Başarılı");
          this.isLoadingSubject.next(false);
        },
        err => {
          err.error.messages.forEach(element => {
            this.message += element + '. ';
          });
          this.toastrService.error(this.message, "Hata");
          this.isLoadingSubject.next(false);
        }
      );
    } else {
      this.toastrService.warning("Formu Kontrol Ediniz", "Uyarı");
      this.isLoadingSubject.next(false);
    }
  }
}
