import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AboutComponent } from './about/about.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'isLeft' } },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
        data: { animation: 'isRight' }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
        data: { animation: 'isTop' }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
        data: { animation: 'isBottom' }
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver },
        data: { animation: 'isTutu' }
      },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { users: ListsResolver },
        data: { animation: 'isTata' }
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        data: { animation: 'isPuco', roles: ['Admin', 'Moderator'] }
      }
    ]
  },
  { path: 'about', component: AboutComponent, data: { animation: 'isBobo' } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

