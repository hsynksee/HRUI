import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { BloodTypeEnum, BloodTypeLabelMapping } from 'src/app/core/enums/user/personel-information/blood-type-enum.model';
import { EducationStatusEnum, EducationStatusLabelMapping } from 'src/app/core/enums/user/personel-information/education-status-enum.model';
import { GenderEnum, GenderLabelMapping } from 'src/app/core/enums/user/personel-information/gender-enum.model';
import { MaritalStatusEnum, MaritalStatusLabelMapping } from 'src/app/core/enums/user/personel-information/marital-status-enum.model';
import { MilitaryStatusEnum, MilitaryStatusLabelMapping } from 'src/app/core/enums/user/personel-information/military-status-enum.model';
import { ObstacleDegreeEnum, ObstacleDegreeLabelMapping } from 'src/app/core/enums/user/personel-information/obstacle-degree-enum.model';
import { SpousesEmploymentStatusEnum, SpousesEmploymentStatusLabelMapping } from 'src/app/core/enums/user/personel-information/spouses-employment-status-enum.model';
import { CountryModel } from 'src/app/core/models/location/country.model';
import { LocationService } from 'src/app/core/services/location/location.service';
import { UserService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-personel-information',
  templateUrl: './personel-information.component.html'
})
export class PersonelInformationComponent implements OnInit {
  @Input() userId: number;

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private unsubscribe: Subscription[] = [];
  _onDestroy = new Subject<void>();
  isMilitaryPostponementDate: boolean;

  savePersonelInformationForm: FormGroup;
  nationalityList: Array<CountryModel>;
  nationalityFilteredData: ReplaySubject<(CountryModel)[]> = new ReplaySubject<(CountryModel)[]>(1);
  nationalitySearch: FormControl = new FormControl();
  selectedNationalityId: number;
  selectedNationality: number;
  selectedMilitaryStatus: MilitaryStatusEnum;

  maritalStatusLabelMapping = MaritalStatusLabelMapping;
  maritalStatusSources = Object.values(MaritalStatusEnum).filter(value => typeof value === 'number');
  spousesEmploymentStatusLabelMapping = SpousesEmploymentStatusLabelMapping;
  spousesEmploymentStatusSources = Object.values(SpousesEmploymentStatusEnum).filter(value => typeof value === 'number');
  genderLabelMapping = GenderLabelMapping;
  genderSources = Object.values(GenderEnum).filter(value => typeof value === 'number');
  obstacleDegreeLabelMapping = ObstacleDegreeLabelMapping;
  obstacleDegreeSources = Object.values(ObstacleDegreeEnum).filter(value => typeof value === 'number');
  bloodTypeLabelMapping = BloodTypeLabelMapping;
  bloodTypeSources = Object.values(BloodTypeEnum).filter(value => typeof value === 'number');
  militaryStatusLabelMapping = MilitaryStatusLabelMapping;
  militaryStatusSources = Object.values(MilitaryStatusEnum).filter(value => typeof value === 'number');
  educationStatusLabelMapping = EducationStatusLabelMapping;
  educationStatusSources = Object.values(EducationStatusEnum).filter(value => typeof value === 'number');

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
    this.isMilitaryPostponementDate = false;
    this.userService.getUserPersonelInformationByUserId(this.userId).subscribe(res => {
      this.locationService.getCountries().subscribe(res => { this.nationalityList = res; this.filterNationalityData(); });
      if (res.data != null) {
        this.savePersonelInformationForm.controls["userId"].setValue(res.data.userId);
        this.savePersonelInformationForm.controls["dateOfBirth"].setValue(res.data.dateOfBirth);
        this.savePersonelInformationForm.controls["identityNumber"].setValue(res.data.identityNumber);
        this.savePersonelInformationForm.controls["maritalStatus"].setValue(res.data.maritalStatus);
        this.savePersonelInformationForm.controls["spousesEmploymentStatus"].setValue(res.data.spousesEmploymentStatus);
        this.savePersonelInformationForm.controls["gender"].setValue(res.data.gender);
        this.savePersonelInformationForm.controls["obstacleDegree"].setValue(res.data.obstacleDegree);
        this.savePersonelInformationForm.controls["nationalityId"].setValue(res.data.nationalityId);
        this.savePersonelInformationForm.controls["numberOfChildren"].setValue(res.data.numberOfChildren);
        this.savePersonelInformationForm.controls["bloodType"].setValue(res.data.bloodType);
        this.savePersonelInformationForm.controls["militaryStatus"].setValue(res.data.militaryStatus);
        if (res.data.militaryStatus === MilitaryStatusEnum.Delayed) {
          this.isMilitaryPostponementDate = true;
        }
        this.savePersonelInformationForm.controls["militaryPostponementDate"].setValue(res.data.militaryPostponementDate);
        this.savePersonelInformationForm.controls["educationStatus"].setValue(res.data.educationStatus);
        this.savePersonelInformationForm.controls["highestLevelOfEducationCompleted"].setValue(res.data.highestLevelOfEducationCompleted);
        this.savePersonelInformationForm.controls["lastCompletedEducationalInstitution"].setValue(res.data.lastCompletedEducationalInstitution);
      }
      else {
        this.savePersonelInformationForm.controls["userId"].setValue(this.userId);
      }
    });

    this.savePersonelInformationForm = this.fb.group({
      userId: ["", Validators.required],
      dateOfBirth: [],
      identityNumber: ["", [Validators.pattern(/^[0-9]{11}$/)]],
      maritalStatus: [],
      spousesEmploymentStatus: [],
      gender: [],
      obstacleDegree: [],
      nationalityId: [],
      numberOfChildren: [],
      bloodType: [],
      militaryStatus: [],
      militaryPostponementDate: [],
      educationStatus: [],
      highestLevelOfEducationCompleted: [],
      lastCompletedEducationalInstitution: [],
    });

    this.nationalitySearch.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterNationalityData(); });
  }

  filterNationalityData() {
    let search = this.nationalitySearch.value;
    if (!search) {
      this.nationalityFilteredData.next(this.nationalityList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.nationalityFilteredData.next(
      this.nationalityList.filter(
        (x: any) => x.name.toLowerCase().indexOf(search) > -1
      )
    );
  };

  onChangeMilitaryStatus() {
    if (this.selectedMilitaryStatus === MilitaryStatusEnum.Delayed) {
      this.isMilitaryPostponementDate = true;
    } else {
      this.isMilitaryPostponementDate = false;
      this.savePersonelInformationForm.controls["militaryPostponementDate"].setValue(null);
    }
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

  savePersonelInformation() {
    this.isLoadingSubject.next(true);
    this.message = "";
    if (this.savePersonelInformationForm.valid) {
      this.savePersonelInformationForm.value.dateOfBirth = this.adjustForTimezone(new Date(this.savePersonelInformationForm.value.dateOfBirth));
      this.userService.saveUserPersonelInformation(this.savePersonelInformationForm.value).subscribe(
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
