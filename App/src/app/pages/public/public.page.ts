import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../services/storage/storage.service';
import { ModalService } from '../../services/modal/modal.service';
import { UserService, User } from '../../services/user/user.service';
import { AudioService } from '../../services/audio/audio.service';
import { QuranService, Surat } from '../../services/quran/quran.service';

import { AnimationController, Animation } from '@ionic/angular';

import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { Plugins } from "@capacitor/core";

const { SpeechRecognition } = Plugins;

import { stringSimilarity } from "string-similarity-js";

@Component({
	selector: 'app-public',
	templateUrl: 'public.page.html'
})
export class PublicPage implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();
	userData: User;
	
	@ViewChild('tab', { read: ElementRef }) tab: ElementRef;

	// dataSurat = this.quran.surat.map(v => v.nama);

	constructor(
		private router: Router,
		private diagnostic: Diagnostic,
		private storage: StorageService,
		private modal: ModalService,
		private animate: AnimationController,
		private audio: AudioService,
		private user: UserService,
		private quran: QuranService) {
		this.user.getDataUser()
		.pipe(takeUntil(this.destroy$))
		.subscribe(data => {
			if(!data || !data._id) return
		})
		
		if(!this.user.getValueUser()){
			this.storage.getDecodedStorage('user:data').then((data: any) => {
				this.user.setDataUser(data);
			})
		}

		// console.log(this.dataSurat);
	}

	async voice(){
		let cp = await this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.RECORD_AUDIO);
		if(cp != this.diagnostic.permissionStatus.GRANTED){
			let sp = await this.diagnostic.requestRuntimePermission(this.diagnostic.permission.RECORD_AUDIO);
		}

		this.audio.playerSambutanPreload();
		this.audio.playerSambutanPlay();

		setTimeout(_ => {
			SpeechRecognition.start({
				language: "id-ID",
				maxResults: 2,
				partialResults: true,
				popup: true,
			}).then(data => {
				console.log('Hasil SpeechRecognition', data)

				let st: Surat;
				this.quran.surat.forEach(v => {
					let t;
					v.alias.forEach(e => {
						let tt = stringSimilarity(e.toLowerCase(), this.hanyaSurat(data.matches[0]));
						if(!t || tt > t) t = tt;
					})
					// let sim = stringSimilarity(v.nama.toLowerCase(), data.matches[0].toLowerCase());
					if(!st || t > st.nilai) st = {...v, nilai: t}
				})
				console.log(st);

				this.router.navigate(['/quran/detail'], {queryParams: {surat: st.urutan, ayat: data.matches[0].match(/\d+/g), putar: data.matches[0].toLowerCase().includes('putar')}});
			}).catch(err => {
				console.log(err)
				this.modal.showToast('Terjadi kesalahan, coba lagi.', {color: 'danger'})
			})
		}, 1000)
	}

	hanyaSurat(txt) {
    let uselessWordsArray = ["buka", "surat", "ayat", "putar", "quran", "alquran"];
	  let expStr = uselessWordsArray.join("|");
	  let str = txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ').replace(/\s{2,}/g, ' ').replace(/[0-9]/g, '').toLowerCase()
	  return str;
  }

	ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
	}

}


				// let st: Surat[] = this.quran.surat.map(v => {
				// 	let t;
				// 	v.alias.forEach(e => {
				// 		let tt = stringSimilarity(e.toLowerCase(), this.hanyaSurat(data.matches[0]));
				// 		if(!t || tt > t) t = tt;
				// 	})
				// 	return {...v, nilai: t};
				// })

				// console.log(st.sort((a, b) => parseFloat(b.nilai) - parseFloat(a.nilai)).slice(0, 5))