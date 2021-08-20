import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: MurottalPage }];

import { MurottalPage } from './murottal.page';
import { PipeModule } from '../../../services/pipe/pipe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule
  ],
  declarations: [MurottalPage]
})
export class MurottalPageModule {}
