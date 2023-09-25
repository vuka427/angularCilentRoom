import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public displayCreate :boolean = false;
  public styleTable: string = "block";

  public vietnamdata : any[] =[];
  public District: any[] =[];
  public Wards: any[] =[];

constructor(
  private _http : HttpClient,
  private _data : DataService,
  private _notify : NotificationService,
  private _diagioi : DiagioihanhchinhService
){

  this._diagioi.getdata().subscribe((res) => {
       this.vietnamdata = res;
    });;
}

  
  ngOnInit(): void {

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/branch/branchesfordatatable',
            dataTablesParameters
          ).subscribe(
            {
              next: resp  => {
                console.log("Respone=> ", resp)
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: resp.data
                });
              },
              error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại"); this._data.handleError(err)} ,
              
            });
           
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };

   
  }
 
  CreateOn(){
    this.displayCreate = true;
    this.styleTable = "none";
  }

  CreateOff(){
    this.displayCreate = false;
    this.styleTable = "block";
  }

  public setDistrict(event: any): void{
    
    console.log(event.target.value);
    this.District = this.vietnamdata.find(data => data.Name == event.target.value).Districts;
  }

  public setWard(event: any): void{
    console.log(event.target.value);
    this.Wards = this.District.find(data => data.Name == event.target.value).Wards;
  }


}
