import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ServerService }  from '../../../services/server/server.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ModalService } from '../../../services/modal/modal.service';
import { UserService, User } from '../../../services/user/user.service';
import { TahsinService } from '../../../services/tahsin/tahsin.service';
import { QuranService } from '../../../services/quran/quran.service';

@Component({
  selector: 'app-beranda',
  templateUrl: 'beranda.page.html'
})
export class BerandaPage implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userData: User;

  dataTahsin = this.tahsin.tahsin;
  arabNumber = ["&\#1632;","&\#1633;","&\#1634;","&\#1635;","&\#1636;", "&\#1637;","&\#1638;","&\#1639;","&\#1640;","&\#1641;"];
  
  waktuSolat = [];
  waktuSolatInterval;
  waktuSolatSelanjutnya = [];
  waktuSolatJarak;

  constructor(
    private router: Router,
    private server: ServerService,
    private storage: StorageService,
    private modal: ModalService,
    private user: UserService,
    private tahsin: TahsinService,
    private quran: QuranService) {
    user.getDataUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.userData = data;
    })

    storage.getStorage('user:bookmark').then(data => {
      if(data) quran.bookmark = data;
    })

  }

  ionViewDidEnter(){
    console.log('masuk beranda')
    this.server.waktuSolat('malang').then((data: any) => {
      if(data.status == "OK"){
        this.waktuSolat = Object.entries(data.results.datetime[0].times).filter(v => !("Sunrise Fajr Sunset Midnight".includes(v[0]))).map(v => v[0] == 'Imsak'? ["Subuh", v[1]] : v);
        let wf = this.waktuSolat.filter(v => new Date('01/01/2000 ' + v[1]) > new Date('01/01/2000 ' + new Date().getHours() + ':' + new Date().getMinutes()));
        this.waktuSolatSelanjutnya = wf.length > 0? wf : this.waktuSolat[0];
        this.waktu();
      }
    })
  }
  
  waktu() {
    if(!this.waktuSolatSelanjutnya[1]) return console.log('waktu tidak ada');
    let jamwss = this.waktuSolatSelanjutnya[1].split(':');
    let w = new Date();
    
    w.setHours(jamwss[0]);
    w.setMinutes(jamwss[1]);


    let s = new Date(w.getTime() - new Date().getTime())
    this.waktuSolatJarak = (s.getUTCHours() == 0? '' : s.getUTCHours() + ' jam ') + s.getUTCMinutes() + ' Menit Lagi';

    this.waktuSolatInterval = setInterval(() => { this.waktu() }, 10000)
  };

  ionViewDidLeave(){
    console.log('keluar beranda')
    clearInterval(this.waktuSolatInterval);
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

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
