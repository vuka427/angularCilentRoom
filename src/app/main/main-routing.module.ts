import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { MainComponent } from './main.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { IndexRedirectComponent } from '../shared/index-redirect/index-redirect.component';


const routes: Routes = [ 
  { path: '', 
  component: MainComponent , 
  children :[
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
      { path: 'landlord', loadChildren: () => import('./landlord/landlord.module').then(m => m.LandlordModule),canActivate: [AuthGuard]},
      { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule)},
      { path: '', component: IndexRedirectComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
