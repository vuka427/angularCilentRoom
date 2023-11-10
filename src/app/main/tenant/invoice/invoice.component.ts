import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {DataTableLanguage} from './../../../core/domain/datatable/datatable.language';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import { InvoiceModel } from 'src/app/core/domain/invoice/invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

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
  public invoice :InvoiceModel | any = {};


  ngAfterViewInit(): void {
    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("invoiceid") && event.target.hasAttribute("detailbtn")) {
          let invoiceId = event.target.getAttribute("invoiceid") as number;
         
          
      }else{
        if(event.target.hasAttribute("invoiceid") && event.target.hasAttribute("exportpdfbtn")){
          let ctId = event.target.getAttribute("invoiceid") as number;
        }
      }
    });
  }

  ngOnDestroy(): void {
   
  }

  ngOnInit() {
  
    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/invoice/tenant/invoicefordatatable?status='+this.status_filter+'&month='+this.month_filter+'&year='+this.year_filter,
            dataTablesParameters
          ).subscribe(
            {
              next: resp => {
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
          title: 'STT',
          data: 'id'
        }, 
        {
          title: 'Người thuê',
          data: 'lessee'
        }, 
        {
          title: 'Số phòng',
          data: 'roomNumber'
        }, 
        {
          title: 'Nhà trọ',
          data: 'branchName'
        }, 
        {
          title: 'Tiền phòng',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.totalPrice);
          }
        }, 
        {
          title: 'Trạng thái',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (row.isApproved ) return '<span class="badge badge-pill badge-success">Đã thanh toán</span>';
            if ( !row.isApproved ) return '<span class="badge badge-pill badge-warning">Chờ thành toán</span>';
            return '';
          }
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

  public rerender(): void {
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      //dtInstance.destroy();
      dtInstance.ajax.reload(); 
      // Call the dtTrigger to rerender again

      this.dtTrigger.next('');
      
    });
  }





}
