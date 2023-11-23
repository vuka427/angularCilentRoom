import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage} from '../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';



@Component({
  selector: 'app-emailhistory',
  templateUrl: './emailhistory.component.html',
  styleUrls: ['./emailhistory.component.css']
})
export class EmailhistoryComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _modalService: NgbModal
  ){}


  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective; 

  @ViewChild('detailEmailModal') detailEmailModal : TemplateRef<any>; 

  @ViewChild('emailcontent') emailContent : ElementRef<any>; 

  public dtOptions: DataTables.Settings = {};
 
  public emailData:any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  listenerFn = () => {};

  ngOnInit(): void {
    this.dtOptions = {
      serverSide: true,    
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/appemail/all?branchid=0',
            dataTablesParameters
          ).subscribe(
            {
              next: resp  => {
                console.log("Respone=> ", resp)
                this.emailData = resp.data;
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: resp.data
                });
              },
              error: err => { this._data.handleError(err)},
              
            });
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
          title: 'STT',
          data: 'index'
        }, 
        {
          title: 'Tên người nhận',
          data: 'receiverName'
        }, 
        {
          title: 'Email',
          data: 'emailReceiver'
        }, 
        {
          title: 'Chủ đề',
          data: 'title'
        }, 
        {
          title: 'Phòng trọ',
          data: 'roomName'
        }, 
        {
          title: 'Ngày gửi',
          data: 'dateSend'
        }, 
        {
          title: 'Trạng thái',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (row.status == 'Successed') return '<span class="badge badge-pill badge-success">Gửi thành công</span>';
            if ( row.status == 'Failed' ) return '<span class="badge badge-pill badge-secondary">Gửi thất bại</span>';
            return '';
          }
        }, 
        {
          title: 'Tác vụ',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            return '<button type="button" detailbtn emailindex="'+row.index+'" class="btn btn-sm btn-primary" >Chi tiết </button>';
          }
        }
      ]
    };



  }



  ngAfterViewInit(): void {

    this.dtTrigger.next('');
    this.listenerFn =  this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("emailindex") || event.target.hasAttribute("detailbtn")) {
          //this.deleteBranch(event.target.getAttribute("branchid"));
          let emailIndex = 0;
          emailIndex = event.target.getAttribute("emailindex");
          this.openModal(emailIndex);
       
        }
      });
  }


  public selectEmail:any = {};

  openModal(emailIndex : number){
 
    console.log("data=> ",this.emailData);
    this.selectEmail = {};

    this.emailData.forEach( (element :any ) => {
      if( element.index == emailIndex){
        this.selectEmail = element;
        console.log(this.selectEmail);
      }
    });
    this._modalService.open(this.detailEmailModal, { size: 'lg'});


    



     
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.listenerFn();
  }




}
