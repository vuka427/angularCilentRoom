import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataTableLanguage} from '../../../core/domain/datatable/datatable.language';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import { InvoiceModel } from 'src/app/core/domain/invoice/invoice.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective ; 
  @ViewChild('InvoiceDetailModal') InvoiceDetailModal : TemplateRef<any>; 
  @ViewChild('InvoiceAgreeModal') InvoiceAgreeModal : TemplateRef<any>; 

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
  public branch_filter: string ='0';
  
  public branches: BranchModel[] | any;
  public invoice :InvoiceModel | any = {};


  ngAfterViewInit(): void {
    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("invoiceid") && event.target.hasAttribute("detailbtn")) {
          let invoiceId = event.target.getAttribute("invoiceid") as number;
         
          this.loadDataToINvoice(invoiceId);
          this.openInvoiceDetailModal();
      }else{
        if(event.target.hasAttribute("invoiceid") && event.target.hasAttribute("exportpdfbtn")){
          let ctId = event.target.getAttribute("invoiceid") as number;
        }
      }
    });
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
            '/api/customer/invoicefordatatable?status='+this.status_filter+'&branchid='+this.branch_filter,
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
              error: err => {  this._data.handleError(err)} ,
              
            });
           
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
          title: 'STT',
          data: 'index'
        }, 
        {
          title: 'Họ tên',
          data: 'fullName'
        }, 
        {
          title: 'Đại diện',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if ( row.isRepresent ) return '<span >X</span>';
            return '';
          }
        }, 
        {
          title: 'Giới tính',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (!row.gender ) return '<span >Nữ</span>';
            if ( row.gender ) return '<span >Nam</span>';
            return '';
          }
        }, 
        {
          title: 'Ngày sinh',
          data: 'dateOfBirth'
        },
        {
          title: 'CCCD',
          data: 'cccd'
        },  
        {
          title: 'Nghề nghiệp',
          data: 'job'
        }, 
        {
          title: 'địa chỉ',
          data: 'permanentAddress'
        }, 
        {
          title: 'Số phòng',
          data: 'roomName'
        }, 
        {
          title: 'Nhà trọ',
          data: 'branchName'
        }, 
        {
          title: 'Trạng thái',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (row.isActive ) return '<span class="badge badge-pill badge-success">Còn ở</span>';
            if ( !row.isActive ) return '<span class="badge badge-pill badge-secondary">Rời đi</span>';
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

  //mở đóng model 
  public openInvoiceDetailModal(){
    this._modalService.dismissAll(this.InvoiceDetailModal);
    this._modalService.open(this.InvoiceDetailModal, { size: 'lg', backdrop: 'static'});
  }

  public closeInvoiceDetailModal(){
    this._modalService.dismissAll(this.InvoiceDetailModal);
  }



    // load data to invoice 
  public loadDataToINvoice(invoiceid: number){
    console.log("load invoice bai id : ",invoiceid);
    this._data.get('/api/invoice/detail?invoiceid='+invoiceid).subscribe(
      {
        next: res => { 
          console.log(res);
          this.invoice = res;
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => { },
      }
    );
  }


  //mở đóng model xác nhận thanh toán
  public openInvoicePayModal(invoiceid:number){
    this.agreeInvoice =  invoiceid;
    this._modalService.open(this.InvoiceAgreeModal,{ centered: true });
  }

  public closeInvoicePayModal(){
    this.agreeInvoice = 0;
    this._modalService.dismissAll(this.InvoiceAgreeModal);
  }
  public agreeInvoice:number=0;
  // Agree to pay invoice 
  public AgreeToPayInvoice(){
    if(this.agreeInvoice!=0){
      console.log("Agree to pay invoice : ",this.agreeInvoice);
          this._data.post('/api/invoice/pay?invoiceid='+this.agreeInvoice).subscribe(
            {
              next: res => { 
                console.log(res);
               
                
              },
              error: err => { this._data.handleError(err); console.log(err); },
              complete: () => { this.rerender() },
            }
          );
    }
    this._modalService.dismissAll(this.InvoiceAgreeModal);
  }

}
