import { Routes } from '@angular/router';
import { DefaultFormComponent } from './components/authorization/default-form/default-form.component';
import { TellerComponent } from './components/human-resource/teller/teller.component';
import { SecurityGuardAuthorizationComponent } from './components/authorization/security-guard-authorization/security-guard-authorization.component';
import { TicketActionsComponent } from './components/ticket-actions/ticket-actions/ticket-actions.component';
import { AdminAuthComponent } from './components/authorization/admin/admin-auth/admin-auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './components/authorization/user/user/user.component';
import { StationManagementComponent } from './components/authorization/admin/station-management/station-management/station-management.component';

export const routes: Routes = [
  { path: '', component: DefaultFormComponent, canActivate: [AuthGuard] },
  { path: 'engineer', component: DefaultFormComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminAuthComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-helpdesk', component: StationManagementComponent, canActivate: [AuthGuard] },
  { path: 'hr', component: TellerComponent },
  { path: 'create-user', component: UserComponent },
  { path: 'login-user', component: UserComponent },
  { path: 'hr/activity/current', component: TellerComponent },
  { path: 'security/authenticate', component: SecurityGuardAuthorizationComponent, canActivate: [AuthGuard] },
  { path: 'ticket_create/success', component: TicketActionsComponent },
  { path: 'ticket_create/error', component: TicketActionsComponent },
  { path: '**', component: NotFoundComponent }
];
