import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { CustomerComponent } from './customer/customer.component';
import { TransactComponent } from './transact/transact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmailhistoryComponent } from './emailhistory/emailhistory.component';
import { UtilitesComponent } from './utilites/utilites.component';
import { BranchComponent } from './room/branch/branch.component';
import { AreaComponent } from './room/area/area.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' },
  {path: 'index', component: IndexComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'room', component: RoomComponent },
  {path: 'customer', component: CustomerComponent },
  {path: 'transact', component: TransactComponent },
  {path: 'feedback', component: FeedbackComponent },
  {path: 'emailhistory', component: EmailhistoryComponent },
  {path: 'utilites', component: UtilitesComponent },
  {path: 'branch', component: BranchComponent },
  {path: 'area', component: AreaComponent }
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
