import { Injectable, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { StorageService } from '../storage/storage.service';
import { QuranService, Surat } from '../quran/quran.service';

import { Howl, Howler } from 'howler';

Howl.prototype.changeSong = function(o, a) {
  var self = this;
  self.unload();
  self._duration = 0; // init duration
  self._autoplay = a;
  self._sprite = {};// init sprite
  self._src = typeof o.src !== 'string' ? o.src : [o.src];
  self._format = typeof o.format !== 'string' ? o.format : [o.format];
  self.load(); // => update duration, sprite(var timeout)
  if(a) self.play();
};

export class Qori {
  _id: any;
  nama: string;
  foto?: string;
  baseLink?: string;
}

export class PlayMurottal {
  surat: Surat;
  qori: Qori;
}

export class PlayerMurottal {
  loaded: boolean;
  played: boolean;
  repeat: number; //0 none, 1 repeat playlist, repeat one;
  muted: boolean;
  duration: any;
  currentTime: number;
  playIndex?: number;
  playlistLength?: number;
}

export class PlayQuran {
  surat: string;
  ayat: number;
  urutan: number;
  jAyat: number;
}

export class PlayerQuran {
  show: boolean;
  loaded: boolean;
  played: boolean;
  repeat: boolean;
  muted: boolean;
  duration: any;
  currentTime: number;
  // surat: string;
  // ayat: number;
  // urutan: number;
  // jAyat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private playList: BehaviorSubject<Surat[]> = new BehaviorSubject<Surat[]>([]);
  playList_ = this.playList.asObservable();

  private qori: BehaviorSubject<Qori[]> = new BehaviorSubject<Qori[]>([
    {
      _id: 'q1',
      nama: 'Mishary Rasyid',
      foto: 'assets/qori/q1.png',
      baseLink: 'https://server8.mp3quran.net/afs/'
    },{
      _id: 'q2',
      nama: 'Saad Al Ghamidi',
      foto: 'assets/qori/q2.png',
      baseLink: 'https://server7.mp3quran.net/s_gmd/'
    },{
      _id: 'q3',
      nama: 'Abdurrahman As Sudais',
      foto: 'assets/qori/q3.png',
      baseLink: 'https://server11.mp3quran.net/sds/',
    }
  ]);
  qori_ = this.qori.asObservable();

  // ================= Murottal ========================
  private playMurottal: BehaviorSubject<PlayMurottal> = new BehaviorSubject<PlayMurottal>(null);
  playMurottal_ = this.playMurottal.asObservable();

  playerMurottal: PlayerMurottal = {
    loaded: false,
    played: false,
    repeat: 0,
    muted: false,
    duration: 0,
    currentTime: 0,
    playIndex: 0,
    playlistLength: 0
  };
  playingMurottal: Howler;

  // ================= Quran ========================
  private playQuran: BehaviorSubject<PlayQuran> = new BehaviorSubject<PlayQuran>(null);
  playQuran_ = this.playQuran.asObservable();

  urlQuran = 'https://mfnizam.com/apps/quran/';
  playerQuran: PlayerQuran = {
    show: false,
    loaded: false,
    played: false,
    repeat: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    // surat: '',
    // urutan: 0,
    // ayat: 0,
    // jAyat: 0,
  };
  playingQuran: Howler;

  constructor(
    private storage: StorageService,
    private quran: QuranService,
    private audio: NativeAudio) {
  }

  setPlaylist(data: Surat[]){ this.storage.setStorage('user:playlist', data); this.playList.next(data) }
  getPlaylist(){ return this.playList_ }
  getValuePlaylist(){ return this.playList.getValue() };

  setQori(data: Qori[]){ this.storage.setStorage('user:qori', data); this.qori.next(data)}
  getQori(){ return this.qori_ }
  getValueQori(){ return this.qori.getValue() };

  setPlayMurottal(data: PlayMurottal){ this.storage.setStorage('user:play:murottal', data); this.playMurottal.next(data)}
  getPlayMurottal(){ return this.playMurottal_ }
  getValuePlayMurottal(){ return this.playMurottal.getValue() };

  setPlayQuran(data: PlayQuran){ this.storage.setStorage('user:play:quran', data); this.playQuran.next(data)}
  getPlayQuran(){ return this.playQuran_ }
  getValuePlayQuran(){ return this.playQuran.getValue() };


  // ================= Murottal ========================
  playerMurottalPreload(src, autoPlay = false){
    clearTimeout(this.timeoutMurottal);
    this.playerMurottal.loaded = false;
    if (this.playingMurottal == null) {
      this.playingMurottal = new Howl({
        src: [src],
        html5: true,
        onload: this.playerMurottalOnload,
        onplay: this.playerMurottalOnplay,
        onpause : this.playerMurottalOnpause,
        onend: this.playerMurottalOnend,
        onmute: this.playerMurottalOnmute,
        volume: 1,
        autoplay: autoPlay
      })
    } else {
      this.playingMurottal.changeSong({src: src, format: 'mp3'}, autoPlay);
    }
  }

  playerMurottalOnload = (v) => {
    this.playerMurottal.loaded = true;
    this.playerMurottal.duration = this.playingMurottal.duration();
    this.playerMurottal.playIndex = this.getValuePlaylist().findIndex(v => v.urutan == this.getValuePlayMurottal()?.surat?.urutan);
  }
  playerMurottalOnplay = v => {
    if(this.playerQuran.played) this.playerQuranPause();
    this.playerMurottal.played = true; 
    this.playerMurottal.playIndex = this.getValuePlaylist().findIndex(v => v.urutan == this.getValuePlayMurottal()?.surat?.urutan);
    this.playerMurottalCurrent();
  }
  playerMurottalOnpause = v => {
    this.playerMurottal.played = false;
  }
  playerMurottalOnend = v =>{
    this.playerMurottal.played = false;

    let pi = this.getValuePlaylist().findIndex(v => v.urutan == this.getValuePlayMurottal()?.surat?.urutan);
    if(pi < 0) return;
    
    let  p = this.playerMurottal.repeat == 1? this.getValuePlaylist()[0] : this.getValuePlaylist()[pi + 1];
        
    if(this.playerMurottal.repeat == 2){
      this.playingMurottal.stop();
      this.playingMurottal.play();
    }else if(p && this.getValuePlayMurottal()?.qori){
      this.setPlayMurottal({surat: p, qori: this.getValuePlayMurottal()?.qori});
      this.playerMurottalPreload(this.getValuePlayMurottal().qori?.baseLink + String(this.getValuePlayMurottal().surat?.urutan).padStart(3, '0') + '.mp3')
      this.playingMurottal.play();
    }
  }
  playerMurottalOnmute = v => {
    this.playerMurottal.muted = this.playingMurottal._muted;
  }
  timeoutMurottal;
  playerMurottalCurrent(){
    let d = this.playingMurottal.seek();
    this.playerMurottal.currentTime = d;
    if(!this.playerMurottal.played) return;
    this.timeoutMurottal = setTimeout(_ => {
      this.playerMurottalCurrent();
    }, 300)
  }

  playerMurottalPlay(){
    if(this.playingMurottal) this.playingMurottal.play();
  }
  playerMurottalPause(){
    if(this.playingMurottal) this.playingMurottal.pause();
  }
  playerMurottalSeek(e){
    if(this.playingMurottal) this.playingMurottal.seek(e);
  }
  playerMurottalNext(){
    let pi = this.getValuePlaylist()[this.getValuePlaylist().findIndex(v => v.urutan == this.getValuePlayMurottal()?.surat?.urutan) + 1];
    if(!pi && this.playerMurottal.repeat) pi = this.getValuePlaylist()[0];
    if(!pi || !this.getValuePlayMurottal()?.qori) return ;
    this.setPlayMurottal({surat: pi, qori: this.getValuePlayMurottal()?.qori});
    this.playerMurottalPreload(this.getValuePlayMurottal().qori?.baseLink + String(this.getValuePlayMurottal().surat?.urutan).padStart(3, '0') + '.mp3', this.playerMurottal.played);
    // if(this.playerMurottal.played) this.playingMurottal.play();
  }
  playerMurottalPrev(){
    let pi = this.getValuePlaylist()[this.getValuePlaylist().findIndex(v => v.urutan == this.getValuePlayMurottal()?.surat?.urutan) - 1];

    if(!pi || !this.getValuePlayMurottal()?.qori) return ;
    this.setPlayMurottal({surat: pi, qori: this.getValuePlayMurottal()?.qori});
    this.playerMurottalPreload(this.getValuePlayMurottal().qori?.baseLink + String(this.getValuePlayMurottal().surat?.urutan).padStart(3, '0') + '.mp3', this.playerMurottal.played)
    // if(this.playerMurottal.played) this.playingMurottal.play();
  }
  playerMurottalRepeat(){
    this.playerMurottal.repeat = this.playerMurottal.repeat < 2? this.playerMurottal.repeat + 1 : 0;
  }
  playerMurottalMute(){
    this.playingMurottal.mute(!this.playerMurottal.muted);
  }

  // ================= Quran ========================
  playerQuranPreload(src, autoPlay = false){
    clearTimeout(this.timeoutQuran);
    this.playerQuran.loaded = false;
    if (this.playingQuran == null) {
      this.playingQuran = new Howl({
        src: [src],
        html5: true,
        onload: this.playerQuranOnload,
        onplay: this.playerQuranOnplay,
        onpause : this.playerQuranOnpause,
        onend: this.playerQuranOnend,
        volume: 1,
        autoplay: autoPlay
      })
    } else {
      this.playingQuran.changeSong({src: src, format: 'mp3'}, autoPlay);
    }
  }

  playerQuranOnload = (v) => {
    this.playerQuran.loaded = true;
    this.playerQuran.duration = this.playingQuran.duration();
    this.playerQuran.currentTime = 0;
  }
  playerQuranOnplay = v => {
    if(this.playerMurottal.played) this.playerMurottalPause();
    this.playerQuran.played = true;
    this.playerQuranCurrent();
  }
  playerQuranOnpause = v => {
    this.playerQuran.played = false;
  }
  playerQuranOnend = v =>{
    this.playerQuran.played = false;
    this.playerQuranNext(true);
  }
  playerQuranOnmute = v => {
    this.playerQuran.muted = this.playingMurottal._muted;
  }
  timeoutQuran;
  playerQuranCurrent(){
    let d = this.playingQuran.seek();
    this.playerQuran.currentTime = d;
    if(!this.playerQuran.played) return;
    this.timeoutQuran = setTimeout(_ => {
      this.playerQuranCurrent();
    }, 300)
  }

  playerQuranPlay(){
    if(this.playingQuran) this.playingQuran.play();
  }
  playerQuranPause(){
    if(this.playingQuran) this.playingQuran.pause();
  }
  playerQuranSeek(e){
    if(this.playingQuran) this.playingQuran.seek(e);
  }
  playerQuranNext(autoPlay = false){
    let pq = this.getValuePlayQuran();
    if(pq.ayat >= pq.jAyat && !this.playerQuran.repeat) return;

    pq.urutan = pq.ayat >= pq.jAyat && this.playerQuran.repeat? pq.urutan - (pq.ayat - 1) : pq.urutan + 1;
    pq.ayat = pq.ayat >= pq.jAyat && this.playerQuran.repeat? 1 : pq.ayat + 1;
    this.playerQuranPreload(this.urlQuran + pq.urutan + '.mp3', (this.playerQuran.played || autoPlay));
    this.setPlayQuran(pq);
    // if(this.playerQuran.played || autoPlay) this.playingQuran.play();
  }

  playerQuranPrev(){
    let pq = this.getValuePlayQuran();
    if(pq.ayat < 2) return;
    pq.urutan -= 1;
    pq.ayat -= 1;
    this.playerQuranPreload(this.urlQuran + pq.urutan + '.mp3', this.playerQuran.played);
    this.setPlayQuran(pq);
    // if(this.playerQuran.played) this.playingQuran.play()
  }

  playingSambutan: Howler;
  playerSambutanPreload(){
    this.playerQuranPause();
    this.playerMurottalPause();
    if(this.playingSambutan) return;
    this.playingSambutan = new Howl({
      src: ['assets/sambutan.mp3'],
      html5: true,
      onend: this.playerSambutanOnend,
      volume: 1,
      autoplay: true
    })
  }

  playerSambutanOnend(){

  }

  playerSambutanPlay(){
    this.playingSambutan.play();
  }

}
