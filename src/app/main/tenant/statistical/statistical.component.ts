import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {

  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _diagioi : DiagioihanhchinhService,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _modalService: NgbModal
  ){}



  public year_filter: string ='0';
  public branch_filter: string ='0';
  public branches: BranchModel[] | any;


  public earningChart: any;
  public electricChart: any;
  public wanterChart: any;


  public statistic: any ={};


  ngOnInit() {
    this.loadDataBranch();
    this.loadData();
  }

  
  public rerender(): void {
    this.updateDataChart();
  }




   // load data to room info
   public loadData(){
    this._data.get('/api/appstatistic/tenant?year='+this.year_filter+'&contractid='+this.branch_filter).subscribe(
      {
        next: res => {
          console.log(res);
          this.statistic = res;

          this.loadEarningChart();
          this.loadElectricityChart();
          this.loadWanterChart();
      
          
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => {  },
      }
    );
  }


  public updateDataChart(){
    this._data.get('/api/appstatistic/tenant?year='+this.year_filter+'&contractid='+this.branch_filter).subscribe(
      {
        next: res => {
          console.log("kq=>", res);
          this.statistic = res;

          this.earningChart.data.datasets[0].data = this.statistic.earning
          this.earningChart.update();
          this.electricChart.data.datasets[0].data = this.statistic.electricity
          this.electricChart.update();
          this.wanterChart.data.datasets[0].data = this.statistic.wanter
          this.wanterChart.update();
         
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => {  },
      }
    );
  }
   
  // load dữ liệu ban đầu
  public loadDataBranch(){ 

    this._data.get("/api/contract/tenant/all").subscribe(
      {
        next: res => { 
          console.log("respone list contract", res);
          this.branches = res;

        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all contract"); }, 
      });
  }

 
  public loadEarningChart(){
    this.earningChart = new Chart("EarningChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ], 
	       datasets: [
          {
            label: "tiền trọ",
            data: this.statistic.earning,
            backgroundColor: 'blue',
            borderColor: "#4e73df",
          }
          
        ]
      },
      options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        }
        
    }

  });


  }

  public loadElectricityChart(){
      this.electricChart = new Chart("ElectricityChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ], 
          datasets: [
            {
              label: "Điện (Kwh)",
              data: this.statistic.electricity,
              backgroundColor: '#D0FF00',
              borderColor: "#a6cc00",
            }
            
          ]
        },
        options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          }
          
      }

    });
  }

  public loadWanterChart(){
      this.wanterChart = new Chart("WanterChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ], 
          datasets: [
            {
              label: "Nước (m^2)",
              data: this.statistic.wanter,
              backgroundColor: '#00d5ff',
              borderColor: "#0095b2",
            }
            
          ]
        },
        options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          }
      }
    });
  }

 








}
