import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ModalService } from '../../../../services/modal/modal.service';
import { TahsinService } from '../../../../services/tahsin/tahsin.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	youtubeLink: SafeResourceUrl;
  youtubeName;
  loadinVideo = false;
	dataMateri;

  constructor(
  	private active: ActivatedRoute,
  	private navCtrl: NavController,
    private dom: DomSanitizer,
    private modal: ModalService,
  	private tahsin: TahsinService) {
  	active.queryParams
  	.pipe(takeUntil(this.destroy$))
  	.subscribe(data => {
  		let t = tahsin.tahsin.find(v => v._id == data?.t)
  		if(t) this.dataMateri = t.materi.find(v => v._id == data?.id);
  	})
  }

  putar(d){
    let links = this.findAllByKey(d, 'link')
    // console.log(links)

    if(links && links.length > 1){
      if(!this.youtubeLink) links[0].checked = true;
      this.modal.showPrompt('Materi ' + d.nama, 'Pilih Materi Video yang ingin anda Putar', links, ['Batal', 'Putar']).then(data => {
        if(data.data.values && this.youtubeName != data.data.values.label) {
          this.youtubeLink = this.dom.bypassSecurityTrustResourceUrl(data.data.values.link + '?autoplay=1');
          this.youtubeName = data.data.values.label;
          this.loadinVideo = true;
        }else if(this.youtubeName == data.data.values.label){
          this.modal.showToast('Video Sedang Diputar', {})
        }
      })
    }else if(links && links.length > 0){
      this.youtubeLink = this.dom.bypassSecurityTrustResourceUrl(links[0] + '?autoplay=1');
    }else{
      this.modal.showToast('Video Tidak Tersedia', {})
    }
  }

  iframeLoad(){
    console.log('iframe load');
    this.loadinVideo = false;
  }

  findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
    .map(v => v.concat(obj.nama))
    .reduce((acc, [key, value, name]) => (key === keyToFind)
      ? acc.concat({type: 'radio', label: name, value: {label: name, link: value}, checked: this.youtubeName == name})
      : (typeof value === 'object')
      ? acc.concat(this.findAllByKey(value, keyToFind))
      : acc
      , [])
  }
  
  goBack(){
  	this.navCtrl.back();
  }

  ngOnDestroy() {
  	this.destroy$.next();
    this.destroy$.complete();
  }

}
