import { Routes } from '@angular/router';
import { DefaultFormComponent } from './components/authorization/default-form/default-form.component';
import { TellerComponent } from './components/human-resource/teller/teller.component';
import { PendingActivitiesComponent } from './components/human-resource/teller/pending-activities/pending-activities/pending-activities.component';
import { TellerAuthComponent } from './components/human-resource/teller-auth/teller-auth.component';
import { SecurityGuardAuthorizationComponent } from './components/authorization/security-guard-authorization/security-guard-authorization.component';
import { TicketActionsComponent } from './components/ticket-actions/ticket-actions/ticket-actions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './components/authorization/user/user/user.component';
import { StationManagementComponent } from './components/authorization/admin/station-management/station-management/station-management.component';
import { AdminWrapperComponent } from './components/authorization/admin/admin-wrapper/admin-wrapper.component';
import { LogoutComponent } from './components/authorization/logout/logout/logout.component';
import { StationsComponent } from './pages/admin/stations/stations.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { ReportsComponent } from './pages/admin/reports/reports.component';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './core/guards/guest/guest.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: DefaultFormComponent, canActivate: [authGuard] },

  { path: 'login', canActivate: [guestGuard], component: LoginComponent },
  { path: 'login-user', canActivate: [guestGuard], component: LoginComponent },
  { path: 'create-user', component: UserComponent },
  {
    path: 'engineer',
    component: DefaultFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminWrapperComponent },
      { path: 'view-visits', component: ReportsComponent },
      { path: 'stations', component: StationsComponent },
      {
        path: 'add-helpdesk',
        component: StationManagementComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'hr',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: TellerComponent },
      { path: 'activity/current', component: TellerComponent },
      { path: 'activity/pending', component: PendingActivitiesComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },

  {
    path: 'security/authenticate',
    component: SecurityGuardAuthorizationComponent,
    canActivate: [authGuard],
  },
  { path: 'ticket_create/success', component: TicketActionsComponent },
  { path: 'ticket_create/error', component: TicketActionsComponent },
  { path: 'admin/logout', component: LogoutComponent },
  { path: '**', component: NotFoundComponent },
];
