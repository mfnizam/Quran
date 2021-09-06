import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { StorageService } from '../../../../services/storage/storage.service';
import { ModalService } from '../../../../services/modal/modal.service';
import { QuranService, Surat } from '../../../../services/quran/quran.service';
import { AudioService, PlayQuran } from '../../../../services/audio/audio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage implements OnDestroy{
	private destroy$: Subject<void> = new Subject<void>();


  // @ViewChild('scroll') scroll;
  @ViewChild('ngscroll', { read: ElementRef }) ngscroll: ElementRef;
	dataSurat: Surat;
  dataSuratSekitar: Surat[];
  dataAyat: any[];
  dataPlay: PlayQuran;
  openAyat: number;
  putarAyat: boolean;

  suratLoading = false;
  suratLoadingNama = '';

  constructor(
    private router: Router,
  	private navCtrl: NavController,
  	private active: ActivatedRoute,
    private storage: StorageService,
    private modal: ModalService,
  	public quran: QuranService,
    public audio: AudioService
  ) {
  	active.queryParams
  	.pipe(takeUntil(this.destroy$))
    .subscribe(data => {
    	this.dataSurat = this.quran.surat.find(v => v.urutan == Number(data.surat));
      this.openAyat = data.ayat;
      this.putarAyat = data.putar == 'true';
      console.log(data.putar);

      let tAyat = Number(this.quran.surat.filter(v => v.urutan < data.surat).reduce((a, c) => a + c.jumlahAyat, 0));
    	if(this.dataSurat) this.quran.ambilSurat(this.dataSurat.urutan).then((data: any) => {
        let dt: any[] = Object.entries(data['text']);
        dt.forEach((v, i) => { 
          v[0] = Number(v[0]);
          v.push(data.translations.id.text[v[0].toString()]); 
          v.push(tAyat + (i + 1));
          v.push(data.tafsir.id.kemenag.text[v[0].toString()]);
        })
        if(dt.length < 80) { 
          this.dataAyat = dt;
          setTimeout(_ => {
            this.suratLoading = false
          }, 300)
        }else{
          this.dataAyat = dt.slice(0, 50);
          setTimeout(_ => {
            this.dataAyat = [...this.dataAyat, ...dt.slice(50)];
            this.suratLoading = false
          }, 300)
        }
      })

      if(!this.dataSuratSekitar){
        let j = JSON.parse(JSON.stringify(quran.surat))
        this.dataSuratSekitar = j;
        // this.dataSuratSekitar = j.slice(0, 20);
        // setTimeout(_ => {
        //   this.dataSuratSekitar = [...this.dataSuratSekitar, ...j.slice(20)]
        // }, 200)
      }

      if(!this.quran.bookmark.open){
        this.storage.getStorage('user:bookmark').then(data => {
          if(data) this.quran.bookmark = data;
        })
      }else {
        this.modal.showLoading('Membuka bookmark...')
      }

      if(this.openAyat > 0 || this.putarAyat){
        this.modal.showLoading((this.putarAyat? 'Memutar Surat ' : 'Membuka ') + this.dataSurat.nama + ' ayat ' + this.openAyat + '...') 
      }
    })

    audio.getPlayQuran()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.dataPlay = data;
      if(data && this.dataSurat?.nama == data.surat) this.ngscroll.nativeElement.children[data.ayat - 1].scrollIntoView({behavior: "smooth"});
    })
  }
  
  ionViewDidEnter(){
    this.scrollSurat(this.dataSurat.urutan);

    if(this.ngscroll && this.quran.bookmark.ayat && this.quran.bookmark.open) {
      setTimeout(_ => {
        this.modal.hideLoading();
        // this.ngscroll.nativeElement.children[this.quran.bookmark.ayat - 1].scrollIntoView({behavior: "smooth"});
        this.ngscroll.nativeElement.scroll({top: this.ngscroll.nativeElement.children[this.quran.bookmark.ayat - 1].offsetTop, behavior: 'smooth'});
      }, 1000)
      this.quran.bookmark.open = false;
    }else if(this.openAyat > 0){
      setTimeout(_ => {
        this.modal.hideLoading();
        this.ngscroll.nativeElement.scroll({top: this.ngscroll.nativeElement.children[this.openAyat - 1].offsetTop, behavior: 'smooth'});
        
        if(this.putarAyat){
          let dp = this.dataAyat[(this.openAyat? this.openAyat - 1 : 1)];
          this.playpause(dp[0], dp[3]);
        }
      }, 2000)
    }else if(this.putarAyat){
      setTimeout(_ => {
        this.modal.hideLoading();
        let dp = this.dataAyat[0];
        this.playpause(dp[0], dp[3]);
      }, 1000)
    }
  }

  changeSurat(u, nama?){
    this.router.navigate([], {queryParams: {surat: u}, replaceUrl: true});
    this.ngscroll.nativeElement.scrollTo(0,0)
    this.suratLoading = true;
    this.suratLoadingNama = nama;
    this.scrollSurat(u);
  }

  scrollSurat(u, b: ScrollBehavior = 'smooth'){
    let p = document.getElementById('p-surat');
    let pb = p.getBoundingClientRect();
    p.scrollTo({
      left: (p.scrollLeft + document.getElementById('pp-' + u).getBoundingClientRect().left - pb.left - 40), 
      behavior: b
    })
  }

  opsiAyat(e, ayat, tafsir, urutan){
    this.modal.showPopover(e, {d: {isBookmark: (this.dataSurat.urutan == this.quran.bookmark.urutan && ayat == this.quran.bookmark.ayat)}}).then(data => {
      if(!data) return;
      if(data.data == 'bookmark'){
        this.setBookmark(ayat);
      }else if(data.data == 'tafsir'){
        this.modal.showModal({header: 'Tafsir ' + this.dataSurat?.nama + ' : ' + ayat, text: tafsir, button: [{title: 'Tutup', role: 'cancel'}]})
      }else if(data.data == 'putar'){
        this.playpause(ayat, urutan)
      }
    })
  }

  playpause(ayat, urutan){
    if(!this.audio.playingQuran || !this.audio.playerQuran.loaded || this.dataPlay?.urutan != urutan){
      this.audio.playerQuran.show = true;
      this.audio.playerQuran.played = false;
      this.audio.setPlayQuran({surat: this.dataSurat.nama, urutan: urutan, ayat: ayat, jAyat: this.dataSurat.jumlahAyat});
      this.audio.playerQuranPreload(this.audio.urlQuran + urutan + '.mp3', true);
    }else if(this.audio.playerQuran.played) {
      this.audio.playerQuranPause();
    }else{
      if(!this.audio.playerQuran.show) this.audio.playerQuran.show = true;
      this.audio.playerQuranPlay();
    }
  }

  setBookmark(s){
    if(s == this.quran.bookmark.ayat){
      this.modal.showConfirm('Hapus Bookmark', 'Hapus bookmark pada <br> <b>"' + this.dataSurat.nama + ' : ' + s + '"</b>', ['Batal', 'Hapus']).then(data => {
        if(data){
          this.quran.bookmark = { urutan: 0, ayat: 0 };
          this.storage.removeStorage('user:bookmark');
        } 
      })
    }else{
      this.modal.showConfirm('Simpan Bookmark', 'Simpan bookmark pada <br> <b>"' + this.dataSurat.nama + ' : ' + s + '"</b>', ['Batal', 'Simpan']).then(data => {
        if(data){
          let d = { urutan: this.dataSurat.urutan, ayat: s }
          this.quran.bookmark = d;
          this.storage.setStorage('user:bookmark', d);
        } 
      })
    }
  }

  goToPutar(){

  }

  close(){
    this.audio.playerQuran.show = false;
    // this.audio.playerQuran.loaded = false;
    this.audio.playerQuranPause();
    // this.audio.playingQuran.unload();
  }

  goBack(){
  	this.navCtrl.back()
  }

  ngOnDestroy() {
  	this.destroy$.next();
    this.destroy$.complete();
  }
  
  suratTrackBy(index: number, item: Surat) {
    return item.urutan
  }

  ayatTrackBy(index: number, item: any) {
    return item[0]
  }
}
