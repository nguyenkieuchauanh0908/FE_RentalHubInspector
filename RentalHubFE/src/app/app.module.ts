import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { NotifierModule } from 'angular-notifier';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material/tooltip';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotifierModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: MAT_TOOLTIP_SCROLL_STRATEGY,
      useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
        scrollStrategyOptions.noop,
      deps: [ScrollStrategyOptions],
    },
    {
      provide: MAT_MENU_SCROLL_STRATEGY,
      useFactory: (scrollStrategyOptions: ScrollStrategyOptions) =>
        scrollStrategyOptions.noop,
      deps: [ScrollStrategyOptions],
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
