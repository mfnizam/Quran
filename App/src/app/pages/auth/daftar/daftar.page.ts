import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServerService } from '../../../services/server/server.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.page.html'
})
export class DaftarPage {

  form: FormGroup = new FormGroup({
    eAn: new FormControl(null, [Validators.required, Validators.email]),
    nama: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confPassword: new FormControl(null, [Validators.required])
  }, { updateOn:'submit' })

  loadingDaftar = false;
  showPass = false;

  constructor(
  	private navCtrl: NavController,
    private router: Router,
    private server: ServerService,
    private storage: StorageService,
    ) { }

  daftar(){
    if(this.form.get('eAn').invalid) return this.form.setErrors({err: 'Email ga valid niih..'});
    if(this.form.get('password').invalid) return this.form.setErrors({err: 'Password di isi dulu yaa...'});
    if(this.form.get('password').value != this.form.get('confPassword').value){ return this.form.setErrors({err: 'Password dan Konfirmasi Password harus sama'})}

    this.loadingDaftar = true;
    this.server.predaftar(this.form.get('eAn').value, this.form.get('nama').value, this.form.get('password').value, true).then(data => {
      console.log(data)
      this.loadingDaftar = false;
      if(data.success && data.isEmail){
        this.storage.setStorage('user:data', data.token).then(_ => {
          this.router.navigateByUrl('/');
          this.form.controls['eAn'].setValue(null);
          this.form.controls['nama'].setValue(null);
          this.form.controls['password'].setValue(null);
          this.form.controls['confPassword'].setValue(null);
        })
      }else if(data.success && !data.isEmail){
        this.router.navigate(['/kode', 0, this.form.get('eAn').value, this.form.get('nama')])
      }else {

      }
    }).catch(err => {
      console.log(err);
      this.loadingDaftar = false;
    })
  }

  goBack(){
    this.navCtrl.back();
  }

}
