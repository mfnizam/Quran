import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ServerService } from '../../../services/server/server.service';
import { StorageService } from '../../../services/storage/storage.service';
import { QuranService, Surat } from '../../../services/quran/quran.service';
import { AudioService, Qori, PlayMurottal } from '../../../services/audio/audio.service';

@Component({
	selector: 'app-murottal',
	templateUrl: 'murottal.page.html'
})
export class MurottalPage implements OnDestroy{
	private destroy$: Subject<void> = new Subject<void>();

	dataPlay: PlayMurottal;

	constructor(
		private router: Router,
		private server: ServerService,
		private storage: StorageService,
    private quran: QuranService,
    public audio: AudioService
		) {
		audio.getPlayMurottal()
		.pipe(takeUntil(this.destroy$))
		.subscribe(data => {
			if(!data) return;
			this.dataPlay = data;
			if(data.surat && data.qori && !this.audio.playerMurottal.played) this.audio.playerMurottalPreload(data.qori?.baseLink + String(data.surat?.urutan).padStart(3, '0') + '.mp3');
		})

		if(!audio.getValuePlayMurottal()){
			storage.getStorage('user:play:murottal').then(data => {
				if(data) audio.setPlayMurottal(data);
			})
		}

		if(audio.getValuePlaylist().length < 1){
			storage.getStorage('user:playlist').then(data => {
				if(data) {
					audio.setPlaylist(data);
					audio.playerMurottal.playlistLength = data.length;
				}
			})	
		}
	}

	playpause(){
		if(!this.audio.playingMurottal){
			this.audio.playerMurottalPreload(this.dataPlay?.qori?.baseLink + String(this.dataPlay?.surat?.urutan).padStart(3, '0') + '.mp3');
			this.audio.playerMurottalPlay();
		}else if(this.audio.playerMurottal.played) {
			this.audio.playerMurottalPause();
		}else{
			this.audio.playerMurottalPlay();
		}
	}

	ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
