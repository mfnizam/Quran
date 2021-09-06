import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../../../services/storage/storage.service';
import { ModalService } from '../../../../services/modal/modal.service';
import { Surat } from '../../../../services/quran/quran.service';
import { AudioService } from '../../../../services/audio/audio.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html'
})
export class PlaylistPage implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	dataPlaylist: Surat[] = [];
  suratPlay = 0;

  constructor(
  	private navCtrl: NavController,
    private storage: StorageService,
    private modal: ModalService,
  	private audio: AudioService) {
  	audio.getPlaylist()
  	.pipe(takeUntil(this.destroy$))
  	.subscribe(data => {
  		this.dataPlaylist = data;
      audio.playerMurottal.playlistLength = data.length;
  	})

  	if(audio.getValuePlaylist()?.length < 1){
      storage.getStorage('user:playlist').then(data => {
        if(data) audio.setPlaylist(data);
      })
    }

    if(!audio.getValuePlayMurottal()){
      storage.getStorage('user:play:murottal').then(data => {
        if(data) {
          this.audio.setPlayMurottal(data)
          this.suratPlay = data?.surat?.urutan;
        }
      })
    }else{
      this.suratPlay = audio.getValuePlayMurottal()?.surat?.urutan;
    }
  }

  play(s){
    if(this.suratPlay == s.urutan && this.audio.playerMurottal.played) return;
    this.suratPlay = s.urutan;
    let d = this.audio.getValuePlayMurottal();
    this.audio.setPlayMurottal({surat: s, qori: d?.qori})
    if(s.urutan && d?.qori) {
      this.audio.playerMurottalPreload(d?.qori?.baseLink + String(s.urutan).padStart(3, '0') + '.mp3', true);
      // this.audio.playerMurottalPlay();
    }else{
      this.modal.showToast('Mohon pilih qori terlebih dahulu.', {color: 'dark'})
    }
  }

  reorderItems(event){
    const itemMove = this.dataPlaylist.splice(event.detail.from, 1)[0];
    this.dataPlaylist.splice(event.detail.to, 0, itemMove);
    this.audio.setPlaylist(this.dataPlaylist);
    this.audio.playerMurottal.playIndex = this.audio.getValuePlaylist().findIndex(v => v.urutan == this.audio.getValuePlayMurottal()?.surat?.urutan);
    event.detail.complete();
  }

  goBack(){
  	this.navCtrl.back();
  }

  ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
  }
}
