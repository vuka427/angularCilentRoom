import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

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

  public roomChart: any;
  public earningChart: any;
  public electricityChart: any;
  public wanterChart: any;

  public statistic: any ={};


  ngOnInit() {
    this.loadDataBranch();
    this.loadData();


  }

   // load data to room info
   public loadData(){
    this._data.get('/api/appstatistic/general').subscribe(
      {
        next: res => {
          console.log(res);
          this.statistic = res;
          this.loadRoomChart()
            
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => {  },
      }
    );
  }
   
  // load dữ liệu ban đầu
  public loadDataBranch(){ 

    this._data.get("/api/branch/all").subscribe(
      {
        next: res => { 
          console.log("respone list branch", res);
          this.branches = res;

        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all room"); }, 
      });
  }

  public loadRoomChart(){

    this.roomChart = new Chart("RoomChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: [
          'Đang cho thuê',
          'Trống',
         
        ],
        datasets: [{
          label: 'số phòng',
          data:this.statistic.rentalRoom,
          backgroundColor: [
            '#4e73df',
            '#858796',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        aspectRatio:2.2
        
      }
      
    });


  }

  public loadEarningChart(){
    

  }

  public loadElectricityChart(){
    
  }

  public loadWanterChart(){
    
  }




  public rerender(): void {
    
  }




}
