import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../../../services/storage/storage.service';
import { ModalService } from '../../../../services/modal/modal.service';
import { QuranService, Surat } from '../../../../services/quran/quran.service';
import { AudioService } from '../../../../services/audio/audio.service';

@Component({
  selector: 'app-surat',
  templateUrl: './surat.page.html'
})
export class SuratPage implements OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

  dataSurat: Surat[] = [];
  dataPlaylist: Surat[] = [];

  constructor(
  	private navCtrl: NavController,
    private storage: StorageService,
    private modal: ModalService,
  	public quran: QuranService,
    private audio: AudioService) {
    audio.getPlaylist()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.dataPlaylist = data;
      let j = JSON.parse(JSON.stringify(quran.surat))
      this.dataSurat = j.slice(0, 20);
      setTimeout(_ => {
        this.dataSurat = [...this.dataSurat, ...j.slice(20)]
      }, 1000)

      this.dataSurat.forEach(v => {
        if(data.some(s => s.urutan == v.urutan)) v['playlist'] = true;
      });
    })

    if(this.audio.getValuePlaylist()?.length < 1){
      this.storage.getStorage('user:playlist').then(data => {
        console.log(data)
        this.audio.setPlaylist(data? data : []);
      })
    }
  }

  simpan(){
    const rs = this.dataSurat.filter(v => v.playlist && !this.dataPlaylist.some(s => s.urutan == v.urutan));
    const rp = this.dataPlaylist.filter(v => this.dataSurat.filter(v => v.playlist).some(s => s.urutan == v.urutan))

    this.audio.setPlaylist([...rp, ...rs]);
    this.modal.showToast('Berhasil Menambahakan ke playlist', {aboveTab: true});
    this.goBack();
  }

  goBack(){
  	this.navCtrl.back();
  }

  ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
  }

  suratTrackBy(index: number, item: Surat) {
    return item.urutan
  }
}
