import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage } from '../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';



@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(
    private _http: HttpClient,
    private _data: DataService,
    private _notify: NotificationService,
    private _render: Renderer2,
    private _modalService: NgbModal
  ) {
  }
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @ViewChild('DetailModal') detailModal: TemplateRef<any>; // Note: TemplateRef
  public ContractDetailId: Number;

  datatableElement: any = DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public displayCreate: boolean = false;
  public styleTable: string = "block";


  ngOnInit(): void {

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
          '/api/contract/contractfordatatable',
          dataTablesParameters
        ).subscribe(
          {
            next: resp => {
              console.log("Respone datatable=> ", resp)
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data
              });
            },
            error: err => { this._data.handleError(err) },

          });
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
        title: 'STT',
        data: 'index'
      },
      {
        title: 'Tên người thuê',
        data: 'b_Lessee'
      },
      {
        title: 'Cccd',
        data: 'b_Cccd'
      },
      {
        title: 'Số phòng',
        data: 'roomNumber'
      },

      {
        title: 'Số dãy-tầng',
        data: 'areaName'
      },
      {
        title: 'Tên nhà trọ',
        data: 'branchName'
      },

      {
        title: 'Ngày bắt đầu HD',
        data: 'commencingOn'
      },
      {
        title: 'Ngày kết thúc HD',
        data: 'endingOn'
      },
      {
        title: 'Trạng thái',
        data: null,
        defaultContent: '',
        render: function (data: any, type: any, row: any, full: any) {
          if (row.status == 'Active') return '<span class="badge badge-pill badge-success">Còn hiệu lực</span>';
          if (row.status == 'Expirat') return '<span class="badge badge-pill badge-secondary">Kết thúc</span>';
          return '';
        }
      }
        ,
      {
        title: 'Tác vụ',
        data: null,
        defaultContent: '',
        render: function (data: any, type: any, row: any, full: any) {
          return '<button type="button" detailbtn contractid="' + row.id + '" class="btn btn-sm btn-primary mr-2" >Chi tiết </button>'
            + '<button type="button" exportpdfbtn contractid="' + row.id + '" class="btn btn-sm btn-success">Xuất PDF</button>';
        }
      }
      ]
    };

  }



  ngAfterViewInit(): void {

    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("contractid") && event.target.hasAttribute("detailbtn")) {
          //this.deleteBranch(event.target.getAttribute("branchid"))
          //this.deleteBranchId = event.target.getAttribute("branchid");
          this.openModal();
      }else{
        if(event.target.hasAttribute("contractid") && event.target.hasAttribute("exportpdfbtn")){
          let ctId = event.target.getAttribute("contractid") as number;
          this.exportToPdf(ctId);
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  openModal() {
    this._modalService.open(this.detailModal);
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

  public exportToPdf(contractid:number){
    
    console.log(contractid);
    
    this._data.DownloadFile("/api/contract/pdf?contractid="+contractid).subscribe(
      {
        next: (res:any) => { 
          const blob = new Blob([res], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        error: err => {console.log(err); this._data.handleError(err); },

        complete: () => { this._notify.printSuccessMessage("Vui lòng chờ file đang gửi đến bạn !"); }, 
      });
    
  }




}
