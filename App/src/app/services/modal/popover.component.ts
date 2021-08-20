import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

export class Popover {
  isBookmark: boolean;
}

@Component({
  selector: 'app-popover',
  template: `
    <div class="p-1">
      <div class="d-flex ion-align-items-center p-1" (click)="dismiss('putar')"><ion-icon name="play" class="mr-1"></ion-icon> Putar Ayat</div>
      <div class="d-flex ion-align-items-center p-1" [class.c-primary]="isBookmark" (click)="dismiss('bookmark')"><ion-icon name="bookmark" class="mr-1"></ion-icon> {{isBookmark? 'Hapus' : 'Set'}} Bookmark</div>
      <div class="d-flex ion-align-items-center p-1" (click)="dismiss('tafsir')"><ion-icon name="reader" class="mr-1"></ion-icon> Lihat Tafsir</div>
    </div>
  `
})
export class PopoverComponent {
	@Input('isBookmark') isBookmark: string;

  constructor(private popCtrl: PopoverController) {}

  dismiss(d){
  	this.popCtrl.dismiss(d);
  }
}
