import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogComponent } from '../app/components/dog/dog.component';
import { DogListComponent } from '../app/components/dog-list/dog-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: 'app-dog',
    component: DogComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER'] }
  },
  { path: 'app-dog-list',
    component: DogListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  { path: '',
    redirectTo: '/app-dog',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
