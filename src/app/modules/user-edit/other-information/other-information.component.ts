import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { AccessTypeEnum } from 'src/app/core/enums/user/access-type-enum.model';
import { AccountTypeEnum, AccountTypeLabelMapping } from 'src/app/core/enums/user/other-information/account-type-enum.model.enum';
import { CityModel } from 'src/app/core/models/location/city.model';
import { CountryModel } from 'src/app/core/models/location/country.model';
import { DistrictModel } from 'src/app/core/models/location/district.model';
import { LocationService } from 'src/app/core/services/location/location.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html'
})

export class OtherInformationComponent implements OnInit {
  @Input() userId: number;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  _onDestroy = new Subject<void>();

  saveOtherInformationForm: FormGroup;

  //#region Country
  countryList: Array<CountryModel>;
  countryFilteredData: ReplaySubject<(CountryModel)[]> = new ReplaySubject<(CountryModel)[]>(1);
  countrySearch: FormControl = new FormControl();
  selectedCountryId: number;
  selectedCountry: number;
  //#endregion Country

  //#region City
  cityList: Array<CityModel>;
  cityFilteredData: ReplaySubject<(CityModel)[]> = new ReplaySubject<(CityModel)[]>(1);
  citySearch: FormControl = new FormControl();
  selectedCityId: number;
  selectedCity: number;
  //#endregion City

  //#region District
  districtList: Array<DistrictModel>;
  districtFilteredData: ReplaySubject<(DistrictModel)[]> = new ReplaySubject<(DistrictModel)[]>(1);
  districtSearch: FormControl = new FormControl();
  selectedDistrictId: number;
  selectedDistrict: number;
  //#endregion District

  accountTypeLabelMapping = AccountTypeLabelMapping;
  accountTypeSources = Object.values(AccountTypeEnum).filter(value => typeof value === 'number');

  message: string;

  constructor(private fb: FormBuilder,
    public userService: UserService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.userService.getUserOtherInformationByUserId(this.userId).subscribe(res => {
      this.locationService.getCountries().subscribe(res => { this.countryList = res; this.filterCountryData(); });

      if (res.data != null) {
        this.saveOtherInformationForm.controls["userId"].setValue(res.data.userId);
        this.saveOtherInformationForm.controls["districtId"].setValue(res.data.districtId);
        this.locationService.getDistrictiesByCityId(res.data.cityId).subscribe(res => { this.districtList = res.data; this.filterDistrictData(); });
        this.saveOtherInformationForm.controls["cityId"].setValue(res.data.cityId);
        this.locationService.getCitiesByCountryId(res.data.countryId).subscribe(res => { this.cityList = res.data; this.filterCityData(); });
        this.saveOtherInformationForm.controls["countryId"].setValue(res.data.countryId);
        this.saveOtherInformationForm.controls["address"].setValue(res.data.address);
        this.saveOtherInformationForm.controls["postCode"].setValue(res.data.postCode);
        this.saveOtherInformationForm.controls["homePhone"].setValue(res.data.homePhone);
        this.saveOtherInformationForm.controls["bankName"].setValue(res.data.bankName);
        this.saveOtherInformationForm.controls["accountType"].setValue(res.data.accountType);
        this.saveOtherInformationForm.controls["accountNumber"].setValue(res.data.accountNumber);
        this.saveOtherInformationForm.controls["iban"].setValue(res.data.iban);
        this.saveOtherInformationForm.controls["emergencyContactPerson"].setValue(res.data.emergencyContactPerson);
        this.saveOtherInformationForm.controls["emergencyContactDegree"].setValue(res.data.emergencyContactDegree);
        this.saveOtherInformationForm.controls["emergencyContactPhone"].setValue(res.data.emergencyContactPhone);
        this.saveOtherInformationForm.controls["connectionName"].setValue(res.data.connectionName);
        this.saveOtherInformationForm.controls["connectionAddress"].setValue(res.data.connectionAddress);

      }
      else {
        this.saveOtherInformationForm.controls["userId"].setValue(this.userId);
      }
    });

    this.saveOtherInformationForm = this.fb.group({
      userId: ["", Validators.required],
      districtId: [],
      cityId: [],
      countryId: [],
      address: [],
      postCode: [],
      homePhone: [],
      bankName: [],
      accountType: [],
      accountNumber: [],
      iban: [],
      emergencyContactPerson: [],
      emergencyContactDegree: [],
      emergencyContactPhone: [],
      connectionName: [],
      connectionAddress: [],
    });

    this.countrySearch.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterCountryData(); });
    this.citySearch.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterCityData(); });
    this.districtSearch.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterDistrictData(); });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  filterCountryData() {
    let search = this.countrySearch.value;
    if (!search) {
      this.countryFilteredData.next(this.countryList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.countryFilteredData.next(
      this.countryList.filter(
        (x: any) => x.name.toLowerCase().indexOf(search) > -1
      )
    );
  };

  filterCityData() {
    let search = this.citySearch.value;
    if (!search) {
      this.cityFilteredData.next(this.cityList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.cityFilteredData.next(
      this.cityList.filter(
        (x: any) => x.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  filterDistrictData() {
    let search = this.districtSearch.value;
    if (!search) {
      this.districtFilteredData.next(this.districtList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.districtFilteredData.next(
      this.districtList.filter(
        (x: any) => x.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  onChangeCountry() {
    this.locationService.getCitiesByCountryId(this.selectedCountry).subscribe(res => { this.cityList = res.data; this.filterCityData(); });
  }
  onChangeCity() {
    this.locationService.getDistrictiesByCityId(this.selectedCity).subscribe(res => { this.districtList = res.data; this.filterDistrictData(); });
  }

  saveOtherInformation() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.saveOtherInformationForm.valid) {
      this.userService.saveUserOtherInformation(this.saveOtherInformationForm.value).subscribe(
        res => {
          this.toastrService.success("İşlem Başarılı");
          this.isLoadingSubject.next(false);
          // this.router.navigate(['/usermanagement/user']);
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
      this.toastrService.warning("Formu Kontrol Ediniz.", "Uyarı");
      this.isLoadingSubject.next(false);
    }
  }

}
