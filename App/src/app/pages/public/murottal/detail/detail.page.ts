import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, IonContent  } from '@ionic/angular';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { QuranService, Surat } from '../../../../services/quran/quran.service';
import { AudioService/*, InfoPlayer*/ } from '../../../../services/audio/audio.service';

@Component({
  selector: 'app-detail',
  // templateUrl: './detail.page.html'
  template: ''
})
export class DetailPage implements OnDestroy{
	private destroy$: Subject<void> = new Subject<void>();

 //  // @ViewChild('mdcontent', { read: ElementRef }) mdcontent: ElementRef;
 //  @ViewChild('scroll') scroll;
	// dataSurat: Surat;
 //  dataAyat: any[];
 //  dataSuratSekitar: Surat[];

 //  infoPlayer: InfoPlayer;

 //  constructor(
 //    private router: Router,
 //  	private navCtrl: NavController,
 //  	private active: ActivatedRoute,
 //  	private quran: QuranService,
 //    public player: PlayerService
 //  ) {
 //  	active.queryParams
 //  	.pipe(takeUntil(this.destroy$))
 //    .subscribe(data => {
 //    	this.dataSurat = this.quran.surat.find(v => v.urutan == Number(data.surat));
 //      let tAyat = Number(this.quran.surat.filter(v => v.urutan < data.surat).reduce((a, c) => a + c.jumlahAyat, 0));

 //      // surat
 //      if(this.dataSurat) this.quran.ambilSurat(this.dataSurat.urutan).then((data: any) => {
 //        let dt: any[] = Object.entries(data['text']);
 //        dt.forEach((v, i) => { 
 //          v[0] = Number(v[0]);
 //          v.push(data.translations.id.text[v[0].toString()]); 
 //          v.push(tAyat + (i + 1));
 //        })
 //        // this.dataSurat['ayat'] = dt;
 //        this.dataAyat = dt;
 //        let fa = this.dataAyat.find(v => v[3] == this.player.audioAyatke)
 //        if(fa){
 //          this.scroll.scrollToIndex(fa[0] - 1);
 //          // if(!this.player.audioAyatke) this.ayatPlay(fa[3], false);
 //        }else{
 //          this.scroll.scrollToIndex(0);
 //          // if(!this.player.audioAyatke) this.ayatPlay(this.dataAyat[0][3], false);
 //        }
 //      })

 //      if(!this.dataSuratSekitar){
 //        this.dataSuratSekitar = this.quran.surat/*.slice(Number(data.surat) < 3? 0 : Number(data.surat) - 3, Number(data.surat) + 3);*/
 //      }
 //    })

 //    player.getInfoPlayer()
 //    .pipe(takeUntil(this.destroy$))
 //    .subscribe(data => {
 //      this.infoPlayer = data;
 //      if(data && this.dataSurat?.urutan == data.urutan) this.scroll.scrollToIndex(data.ayat - 1);
 //      // document.getElementById('md-ayat-' + this.ayat).scrollIntoView({behavior: "smooth"});
 //    })
 //  }

 //  ionViewDidEnter(){
 //    this.scrollSurat(this.dataSurat.urutan)
 //  }

 //  changeSurat(u){
 //    this.router.navigate([], {queryParams: {surat: u}, replaceUrl: true});
 //    this.scrollSurat(u);
 //  }

 //  scrollSurat(u, b: ScrollBehavior = 'smooth'){
 //    let p = document.getElementById('p-surat');
 //    let pb = p.getBoundingClientRect();
 //    p.scrollTo({
 //      left: (p.scrollLeft + document.getElementById('pp-' + u).getBoundingClientRect().left - pb.left - 40), 
 //      behavior: b
 //    })    
 //  }


 //  ayatPlay(k, a = true){
 //    if(Number(k) == this.player.audioAyatke && !this.player.playerPlay){
 //      this.player.audioPlayer.nativeElement.play();
 //    }else if(Number(k) != this.player.audioAyatke){
 //      let t = Number(this.quran.surat.filter(v => v.urutan < this.dataSurat.urutan).reduce((a, c) => a + c.jumlahAyat, 0));
 //      this.player.setInfoPlayer({
 //        surat: this.dataSurat.nama,
 //        urutan: this.dataSurat.urutan,
 //        mAyat: this.dataSurat.jumlahAyat,
 //        tAyat: t,
 //        ayat: k - t
 //      });

 //      this.player.audioPlayer.nativeElement.autoplay = a
 //      this.player.preload(k);
 //    }else{
 //      this.player.audioPlayer.nativeElement.pause();
 //    } 
 //  }

 //  goToPutar(){
 //    if(this.dataAyat.find(v => v[3] == this.player.audioAyatke)){
 //      this.scroll.scrollToIndex(this.infoPlayer.ayat - 1);
 //    }else{
 //      this.router.navigate([], {queryParams: {surat: this.infoPlayer.urutan}, replaceUrl: true});
 //    }
 //  }

 //  goBack(){
 //  	this.navCtrl.back();
 //  }

  ngOnDestroy() {
  	this.destroy$.next();
    this.destroy$.complete();
  }

 //  trackById(index: number, item: Surat) {
 //    return item.urutan
 //  }

}
