import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { VoicePage } from './voice.page';

const routes: Routes = [{ path: '', component: VoicePage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
		RouterModule.forChild(routes)
  ],
  declarations: [VoicePage]
})
export class VoicePageModule {}
