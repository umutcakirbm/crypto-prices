import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective,
} from 'ng-zorro-antd/grid';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { httpInterceptorProviders } from './interceptors';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageNotFoundComponent, LayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzGridModule,
  ],
  providers: [httpInterceptorProviders],
  exports: [LayoutComponent, NzColDirective, NzRowDirective, FormsModule],
})
export class CoreModule {}
