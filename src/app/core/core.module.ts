import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, CoreRoutingModule],
  providers: [httpInterceptorProviders],
})
export class CoreModule {}
