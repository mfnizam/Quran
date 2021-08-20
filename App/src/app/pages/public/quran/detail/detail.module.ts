import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: DetailPage }];

import { DetailPage } from './detail.page';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { ModalModule } from '../../../../services/modal/modal.module';
import { PipeModule } from '../../../../services/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    VirtualScrollerModule,
    ModalModule,
    PipeModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
