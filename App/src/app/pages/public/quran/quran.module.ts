import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: QuranPage }];

import { QuranPage } from './quran.page';
import { PipeModule } from '../../../services/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule
  ],
  declarations: [QuranPage]
})
export class QuranPageModule {}
