import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [],
  imports: [AuthRoutingModule, SharedModule],
})
export class PostsModule {}
