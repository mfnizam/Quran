import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';

import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public serverUrl = 'https://projectkabeh.herokuapp.com/quran/';
  // public serverUrl = 'http://192.168.8.103:3000/quran/'; //F4
  // public serverUrl = 'http://192.168.0.101:3000/quran/'; //KNA
  // public serverUrl = 'http://192.168.43.64:3000/quran/'

  public otherServer = 'https://mfnizam.com/apps/projectkabeh/';

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    private transfer: FileTransfer,
    private file: File) { }

  getRequest(url, opt?){
    let header = {}
    return this.httpClient.get(url, opt).toPromise();
  }

  postRequest(url, data){
    if(Capacitor.isNative){
      this.http.setDataSerializer('json');
      return this.http.post(url, data, {'Content-Type': 'application/json'})
      .then(res => { return JSON.parse(res.data) })
    }else{
    	return this.httpClient.post(url, data).toPromise().then((data : any) => { return data;})
    }
  }

  async uploadRequest(url, fileUrl, fileName, mime = "image/jpeg", params){
    if(Capacitor.isNative){
      return this.transfer.create().upload(fileUrl, url, {
        fileKey: 'file',
        fileName: fileName,
        chunkedMode: false,
        mimeType: mime,
        params : params,
        headers: {}
      })
      .then(res => { return JSON.parse(res.response) })
    }else{
      let file = await fetch(fileUrl).then(r => r.blob());
      let formData = new FormData();
      formData.append('file', file, (fileName? fileName : 'file-upload'));
      for(let k in params){
        formData.append(k, params[k]);
      }
      return this.postRequest(url, formData); 
    }
  }

  async downloadRequest(url, nama){
    if(Capacitor.isNative){
      return this.transfer.create().download(url, this.file.externalRootDirectory + '/Download/' + nama);
    }else{
      //kurang download non native
    }
  }

  // auth api
  public predaftar(eAn, nama, pass, isEmail){
  	let url = this.serverUrl + 'auth/predaftar';
  	return this.postRequest(url, { eAn: eAn, namaLengkap: nama, password: pass, isEmail: isEmail });
  }
  public masuk(eAn, password, isEmail){
    let url = this.serverUrl + 'auth/masuk';
    return this.postRequest(url, { eAn: eAn, password: password, isEmail: isEmail });
  }
  public verifyKode(eAn, nama, kode, keperluan){
    let url = this.serverUrl + 'auth/verifykode';
    return this.postRequest(url, {eAn: eAn, namaLengkap: nama, kode: kode, keperluan: keperluan});
  }
  public akunEdit(data){
    let url = this.serverUrl + 'auth/akun/edit';
    return this.postRequest(url, data);
  }

  //waktu solat
  public waktuSolat(kota){
    var date = new Date();
    let url = 'https://api.pray.zone/v2/times/today.json?city=' + kota;
    return this.getRequest(url);
  }
}