import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  public displayCreate :boolean = false;
  public styleTable: string = "block";

  public frbranch : FormGroup ;

  public vietnamdata : any[] =[];
  public District: any[] =[];
  public Wards: any[] =[];



constructor(
  private _http : HttpClient,
  private _data : DataService,
  private _notify : NotificationService,
  private _diagioi : DiagioihanhchinhService,
  private _elementRef: ElementRef
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



    this.frbranch = new FormGroup({
      branchname: new FormControl('',Validators.required),
      housetype : new FormControl('',Validators.required),
      description: new FormControl(''),
      internalregulation: new FormControl(''),
      province: new FormControl('',Validators.required),
      district: new FormControl('',Validators.required),
      wards: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      electricitycost: new FormControl('',Validators.required),
      watercost: new FormControl('',Validators.required),
      garbagecf: new FormControl('',Validators.required),
      internetcost: new FormControl('',Validators.required),
      services: new FormArray([])



    });

  }
  
  get branchname(){ return this.frbranch.get('branchname');}



  public CreateOn(){
    this.displayCreate = true;
    this.styleTable = "none";
  }

  public CreateOff(){
    this.displayCreate = false;
    this.styleTable = "block";

  }

  public setDistrict(event: any): void{
    
    console.log(event.target.options[event.target.options.selectedIndex].text);
    this.District = this.vietnamdata.find(data => data.Id == event.target.value).Districts;
  }

  public setWard(event: any): void{
    console.log(event.target.options[event.target.options.selectedIndex].text);
    this.Wards = this.District.find(data => data.Id == event.target.value).Wards;
  }

  public AddService(){
    console.log("sfsf");
    const group = new FormGroup({
      name: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required)
    });
    
    let s = this.frbranch.get('services') as FormArray;
    s.push(group);
    console.log("sfsf",s);
  }
  get services() {
    return this.frbranch.get('services') as FormArray;
  }


  public onSubmit(){
    console.log('submit');
    if (this.frbranch.invalid) {
			return;
		}
    console.log('submited');
  }


}
