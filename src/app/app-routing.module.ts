import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { sidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ChannelComponent } from './components/channel/channel.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sidenav', component: sidenavComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard/channel', component: ChannelComponent },
  { path: 'user/:id', component: DialogUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
