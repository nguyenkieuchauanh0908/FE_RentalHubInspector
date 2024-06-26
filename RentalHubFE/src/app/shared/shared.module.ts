import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialsModule } from './ng-materials/ng-materials.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotifierModule } from 'angular-notifier';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SendForgetPwEmailComponent } from './send-forget-pw-email/send-forget-pw-email.component';
import { CommentReasonDialogComponent } from './comment-reason-dialog/comment-reason-dialog.component';
import { DisplayNotiDialogComponent } from './display-noti-dialog/display-noti-dialog.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,

    MainLayoutComponent,
    ConfirmDialogComponent,
    SendForgetPwEmailComponent,
    CommentReasonDialogComponent,
    DisplayNotiDialogComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    NgMaterialsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    NotifierModule,
  ],
  exports: [
    CommonModule,
    ScrollingModule,
    NgMaterialsModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    PaginationComponent,
    MainLayoutComponent,
    NotifierModule,
    ReactiveFormsModule,
    SliderComponent,
  ],
})
export class SharedModule {}
