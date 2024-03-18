import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostSensorComponent } from './post-sensor/post-sensor.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { HistoryCheckedPostsComponent } from './history-checked-posts/history-checked-posts.component';
import { HistoryDeniedPostsComponent } from './history-denied-posts/history-denied-posts.component';
import { ReportedPostsComponent } from './reported-posts/reported-posts.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'post-sensor',
        component: PostSensorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checked-posts',
        component: HistoryCheckedPostsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'denied-posts',
        component: HistoryDeniedPostsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'denied-posts',
        component: HistoryDeniedPostsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reported-posts',
        component: ReportedPostsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
