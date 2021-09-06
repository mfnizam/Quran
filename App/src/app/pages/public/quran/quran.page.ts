import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../../services/storage/storage.service';
import { ModalService } from '../../../services/modal/modal.service';
import { QuranService, Surat } from '../../../services/quran/quran.service';
import { AudioService, PlayQuran } from '../../../services/audio/audio.service';

@Component({
  selector: 'app-quran',
  templateUrl: './quran.page.html'
})
export class QuranPage implements OnDestroy{
	private destroy$: Subject<void> = new Subject<void>();

  dataSurat: Surat[] = [];
  dataPlay: PlayQuran;

  constructor(
    private router: Router,
    private storage: StorageService,
    private modal: ModalService,
    public quran: QuranService,
    public audio: AudioService) {
    let j = JSON.parse(JSON.stringify(quran.surat))
    this.dataSurat = j.slice(0, 20);
    setTimeout(_ => {
      this.dataSurat = [...this.dataSurat, ...j.slice(20)]
    }, 1000)

    storage.getStorage('user:bookmark').then(data => {
      if(data) quran.bookmark = data;
    })

    audio.getPlayQuran()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.dataPlay = data;
    })
  }

  openBookmark(){
    if(!this.quran.bookmark.urutan || !this.quran.bookmark.ayat){
      this.modal.showToast('Tidak Ada bookmark Tersimpan', {aboveTab: true})
    }else{
      let d = this.quran.surat.find(v => v.urutan == this.quran.bookmark.urutan);
      this.modal.showConfirm('Buka Bookmark', 'Buka bookmark tersimpan pada <br> <b>"' + d?.nama + ' : ' + this.quran.bookmark.ayat + '"</b>', ['Batal', 'Buka']).then(data => {
        if(data) {
          this.quran.bookmark.open = true;
          console.log(this.quran.bookmark)
          this.router.navigate(['/quran/detail'], {queryParams: {surat: this.quran.bookmark.urutan}});
        }
      })
    }
  }

  playpause(ayat, urutan){
    if(this.audio.playerQuran.played) {
      this.audio.playerQuranPause();
    }else{
      if(!this.audio.playerQuran.show) this.audio.playerQuran.show = true;
      this.audio.playerQuranPlay();
    }
  }

  close(){
    this.audio.playerQuran.show = false;
    // this.audio.playerQuran.loaded = false;
    this.audio.playerQuranPause();
    // this.audio.playingQuran.unload();
  }

  goToPutar(){
    
  }

  ngOnDestroy(){
		this.destroy$.next();
		this.destroy$.complete();
  }

  suratTrackBy(index: number, item: Surat) {
    return item.urutan
  }
}
