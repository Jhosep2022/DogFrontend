import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogComponent } from '../app/components/dog/dog.component';
import { DogListComponent } from '../app/components/dog-list/dog-list.component';
import { AuthGuard } from './authguard';

const routes: Routes = [
  { path: 'app-dog',
    component: DogComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] }
  },
  { path: 'app-dog-list', component: DogListComponent },
  { path: '', redirectTo: '/app-dog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
