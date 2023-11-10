import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { TenantRoutingModule } from './tenant-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ContractComponent } from './contract/contract.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { FormsModule } from '@angular/forms';
import { ValidationModule } from 'src/app/shared/validation/validation.module';
import { DataTablesModule } from 'angular-datatables';
import {NgxPrintModule} from 'ngx-print';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HousetypePipe } from 'src/app/shared/pipe/housetype.pipe';
import { FormatVndPipe } from 'src/app/shared/pipe/format.vnd.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    ContractComponent,
    InvoiceComponent,
    FeedbackComponent,
    StatisticalComponent,
    HousetypePipe,
    FormatVndPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TenantRoutingModule,
    ValidationModule,
    DataTablesModule,
    NgbTooltipModule,
    CKEditorModule,
    NgxPrintModule,
    NgbDropdownModule
  ]
})
export class TenantModule { }
