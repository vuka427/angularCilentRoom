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



@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    ContractComponent,
    InvoiceComponent,
    FeedbackComponent,
    StatisticalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TenantRoutingModule
  ]
})
export class TenantModule { }
