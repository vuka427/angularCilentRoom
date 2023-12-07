import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage} from '../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tenant-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
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

  @ViewChild('FeedbackModal') FeedbackModal : TemplateRef<any>; 

  public dtOptions: DataTables.Settings = {};
 
  public FeedbackData:any = [];
  public contracts :any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  public frFeedback : FormGroup ;
  public isValidFeedbackFormSubmitted :boolean | null = null;

  listenerFn = () => {};

  ngOnInit(): void {
    this.loadData();

    this.frFeedback= new FormGroup({
    
      contractid: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      content: new FormControl('',Validators.required),
     
    });

    this.dtOptions = {
      serverSide: true,   
      searching: false,  
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/feedback/tenant/all',
            dataTablesParameters
          ).subscribe(
            {
              next: resp  => {
                console.log("Respone=> ", resp)
                this.FeedbackData = resp.data;
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
          title: 'Chủ đề',
          data: 'title'
        }, 
        {
          title: 'Phòng trọ',
          data: 'roomName'
        }, 
        {
          title: 'Ngày gửi',
          data: 'createdDate'
        }, 
        {
          title: 'Trạng thái',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (row.status == 'Read') return '<span class="badge badge-pill badge-warning">Đang xử lý</span>';
            if ( row.status == 'Unread' ) return '<span class="badge badge-pill badge-primary">Đã nhận</span>';
            return '';
          }
        }, 
        {
          title: 'Tác vụ',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            return '<button type="button" detailbtn feedbackindex="'+row.index+'" class="btn btn-sm btn-success" >Chi tiết </button>';
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

   // load dữ liệu ban đầu
   public loadData(){ 
    this._data.get("/api/contract/tenant/current").subscribe(
      {
        next: res => { 
          console.log("respone current contracts", res);
          this.contracts = res;
        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load current contracts"); }, 
      });
  }


  ngAfterViewInit(): void {

    this.dtTrigger.next('');
    this.listenerFn =  this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("feedbackindex") || event.target.hasAttribute("detailbtn")) {
          //this.deleteBranch(event.target.getAttribute("branchid"));
          let feedbackindex = 0;
          feedbackindex = event.target.getAttribute("feedbackindex");
          this.openModal(feedbackindex);
       
        }
      });
  }


  public selectFeedback:any = {};

  openModal(feedbackindex : number){
 
    console.log("data=> ",this.FeedbackData);
    this.selectFeedback = {};

    this.FeedbackData.forEach( (element :any ) => {
      if( element.index == feedbackindex){
        this.selectFeedback = element;
        console.log(this.selectFeedback);
      }
    });
    this._modalService.open(this.detailEmailModal, { size: 'lg'});
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.listenerFn();
  }

   //mở đóng model thêm khu vực
  public openAddAreaModal(){
    this._modalService.open(this.FeedbackModal, { size: 'lg'});
  }

  public closeAddAreaModal(){
    this._modalService.dismissAll(this.FeedbackModal);
  }

 // thêm phòng
 public onFormFeedbackSubmit(){
  console.log('submit');
  this.isValidFeedbackFormSubmitted= false;
  
  if (this.frFeedback.invalid) {
    console.log("is invalid",this.frFeedback.errors );
    return;
  }
  this.isValidFeedbackFormSubmitted = true;

  console.log('submited',this.frFeedback.value );

  this._data.post('/api/feedback/create',this.frFeedback.value).subscribe(
    {
      next: res => { (res); console.log("repone ", res);},
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
      complete: () => { 
        this._notify.printSuccessMessage("Đã gửi góp ý !"); 
       this.closeAddAreaModal();
       this.rerender();
      },
    }
  );
}

}
