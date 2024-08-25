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

export const routes: Routes = [
  { path: '', component: DefaultFormComponent, canActivate: [AuthGuard] },
  {
    path: 'engineer',
    component: DefaultFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: AdminWrapperComponent },
  {
    path: 'admin/add-helpdesk',
    component: StationManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hr', component: TellerComponent },
  { path: 'hr/login', component: TellerAuthComponent },
  { path: 'create-user', component: UserComponent },
  { path: 'login-user', component: UserComponent },
  { path: 'hr/activity/current', component: TellerComponent },
  { path: 'hr/activity/pending', component: PendingActivitiesComponent },
  {
    path: 'security/authenticate',
    component: SecurityGuardAuthorizationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ticket_create/success', component: TicketActionsComponent },
  { path: 'ticket_create/error', component: TicketActionsComponent },
  { path: 'hr/logout', component: LogoutComponent },
  { path: 'admin/logout', component: LogoutComponent },
  { path: '**', component: NotFoundComponent },
];
