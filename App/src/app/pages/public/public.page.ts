import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../services/storage/storage.service';
import { ModalService } from '../../services/modal/modal.service';
import { UserService, User } from '../../services/user/user.service';
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

		SpeechRecognition.start({
			language: "id-ID",
			maxResults: 2,
			// prompt: "Buka Surat Al-Baqoroh Ayat 25",
			partialResults: true,
			popup: true,
		}).then(data => {
			console.log('Hasil SpeechRecognition', data)

			let st: Surat;
			this.quran.surat.forEach(v => {
				let sim = stringSimilarity(v.nama.toLowerCase(), data.matches[0].toLowerCase())
				if(!st || sim > st.nilai){
					st = {...v, nilai: sim}
				}
			})

			this.router.navigate(['/quran/detail'], {queryParams: {surat: st.urutan, ayat: data.matches[0].match(/\d+/g), putar: data.matches[0].toLowerCase().includes('putar')}});
		}).catch(err => {
			console.log(err)
			this.modal.showToast('Terjadi kesalahan, coba lagi.', {color: 'danger'})
		})


	}

	ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
	}

}
