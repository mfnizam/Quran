import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../../../services/storage/storage.service';
import { ModalService } from '../../../../services/modal/modal.service';
import { AudioService, Qori } from '../../../../services/audio/audio.service';

@Component({
  selector: 'app-qori',
  templateUrl: './qori.page.html'
})
export class QoriPage implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	dataQori: Qori[] = [];
	qoriPilih;

  constructor(
  	private navCtrl: NavController,
  	private storage: StorageService,
  	private modal: ModalService,
  	private audio: AudioService) {
  	this.dataQori = audio.getValueQori();
    
    if(!audio.getValuePlayMurottal()?.qori){
      this.storage.getStorage('user:play:murottal').then(data => {
        this.qoriPilih = data?.qori?._id;
      })
    }else{
      this.qoriPilih = audio.getValuePlayMurottal().qori?._id;
    }
  }

  simpan(){
    this.audio.setPlayMurottal({surat: this.audio.getValuePlayMurottal()?.surat, qori: this.dataQori.find(v => v._id == this.qoriPilih)});
    this.audio.playerMurottalPreload(this.audio.getValuePlayMurottal().qori?.baseLink + String(this.audio.getValuePlayMurottal().surat?.urutan).padStart(3, '0') + '.mp3')
    if(this.audio.playerMurottal.played) this.audio.playingMurottal.play();
    this.goBack();
  }

  goBack(){
  	this.navCtrl.back();
  }

  ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
  }
}
