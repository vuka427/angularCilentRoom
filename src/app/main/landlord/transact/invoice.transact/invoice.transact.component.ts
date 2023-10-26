import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {DataTableLanguage} from '../../../../core/domain/datatable/datatable.language';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { BranchModel } from 'src/app/core/domain/room/branch.model';



@Component({
  selector: 'app-invoice.transact',
  templateUrl: './invoice.transact.component.html',
  styleUrls: ['./invoice.transact.component.css']
})
export class InvoiceTransactComponent implements OnInit , OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective ; 

  datatableElement: any = DataTableDirective;

  public dtOptions: DataTables.Settings = {};

  public dtTrigger: Subject<any> = new Subject<any>();



  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _diagioi : DiagioihanhchinhService,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _modalService: NgbModal
  ){}


 public status_filter: string ='none';
 public month_filter: string ='0';
 public year_filter: string ='0';
 public branch_filter: string ='0';
 
 public branches: BranchModel[] | any;



  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
   
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

 
  ngOnInit() {
    this.loadDataBranch();
    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/invoice/invoicefordatatable?status='+this.status_filter+'&month='+this.month_filter+'&year='+this.year_filter+'&branchid='+this.branch_filter,
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
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
          title: 'ID',
          data: 'id'
        }, 
        {
          title: 'Tên nhà trọ',
          data: 'branchName'
        }, 
        {
          title: 'Số phòng',
          data: 'description'
        }, 
        {
          title: 'Người thuê',
          data: 'address'
        }, 
        {
          title: 'Tiền phòng',
          data: 'address'
        }, 
        {
          title: 'Trạng thái',
          data: 'address'
        }, 
        {
          title: 'Tác vụ',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            return '<button type="button" detailbtn invoiceid="'+row.id+'" class="btn btn-sm btn-primary" >Chi tiết </button>'
                    ;
          }
        }
      ]
    };

  }

}
