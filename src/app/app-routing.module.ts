import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'posts', component:AllPostComponent, canActivate: [AuthGuard]},
  {path: 'posts/new', component:NewPostComponent},
  {path: 'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
