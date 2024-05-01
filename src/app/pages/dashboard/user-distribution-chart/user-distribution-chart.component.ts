import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/users/users.service';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: {
    enabled: boolean;
  };
  fill: {
    type: string;
  };
  legend: {
    formatter: (val: string, opts: any) => string;
  };
};

@Component({
  selector: 'app-user-distribution-chart',
  templateUrl: './user-distribution-chart.component.html',
  styleUrls: ['./user-distribution-chart.component.scss']
})
export class UserDistributionChartComponent implements OnInit {
  @ViewChild("chart") chart: ApexChart;
  chartOptions: Partial<ChartOptions> = {};

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getUserDistributionByDepartment().subscribe(res => {
      this.chartOptions = {
        series: res.map(user => user.userCountByDepartment),
        chart: {
          width: 380,
          type: "donut"
        },
        labels: res.map(user => user.departmentName),
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient"
        },
        legend: {
          formatter: (val, opts) => val + " - " + opts.w.globals.series[opts.seriesIndex]
        },
        responsive: [
          {
            breakpoint: 4804,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      this.cdr.detectChanges();
    });
  }
}
