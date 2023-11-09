import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ContractComponent } from './contract/contract.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' },
  {path: 'index', component: IndexComponent },
  {path: 'invoice', component: InvoiceComponent },
  {path: 'contract', component: ContractComponent },
  {path: 'feedback', component: FeedbackComponent },
  {path: 'statistical', component: StatisticalComponent },
  {path: 'profile', component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
