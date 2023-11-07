import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons, NgbTooltipModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  constructor(
    private _data : DataService,
    private _notify : NotificationService,
    private _modalService: NgbModal
  ){} 


  public chart: any;
  public roomChart: any;

  public statistic: any ={};

  ngOnInit(): void {
    this.loadData();
    
  }

  loadDataToRoomChart(){
    this.roomChart = new Chart("myPieChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: [
          'Đang cho thuê',
          'Trống',
         
        ],
        datasets: [{
          label: 'số phòng',
          data: this.statistic.rentalRoom ,
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


  // load data to room info
  public loadData(){
    this._data.get('/api/appstatistic/general').subscribe(
      {
        next: res => {
          console.log(res);
          this.statistic = res;
          this.loadDataToRoomChart();
            
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => {  },
      }
    );
  }


}
