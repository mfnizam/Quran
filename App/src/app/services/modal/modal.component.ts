import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  // templateUrl: './modal.component.html',
  template: `
  <div class="h-100 o-hidden d-flex flex-column b-primary-900">
    <h2 class="ion-no-margin ion-padding b-primary c-primary-contrast ion-text-center" style="font-size: 17px;"><b>{{header}}</b></h2>
    <div class="h-100 o-auto ion-padding" style="line-height: 1.5; white-space: pre-line;">
      {{text}}
    </div>
    <div class="d-flex ion-text-center">
      <div *ngFor="let b of button" class="flex-1 border-top border-right">
        <ion-note *ngIf="!b.submit" color="primary" (click)="dismiss(b.role)" style="font-size: 17px; padding: 0; line-height: 20px; height: 44px; display: flex; align-items: center; justify-content: center; width: 100%;">{{b.title}}</ion-note>

        <button *ngIf="b.submit" form="form-modal" type="submit" class="b-none"
        style="font-size: 17px;
        padding: 0;
        line-height: 20px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 100%;">
          <ion-note color="primary" style="font-size: 17px"><b>{{b.title}}</b></ion-note>
        </button>
      </div>
    </div>
  </div>
  `
})
export class ModalComponent implements OnInit{
  @Input() header: string;
	@Input() text: string;
  @Input() button: any[] = [{title: 'Batal', role: 'cancel'}, {title: 'Pilih', role: 'ok'}]

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(){
    console.log(this.button)
  }

  dismiss(r){
  	this.modalCtrl.dismiss(r);
  }
}
