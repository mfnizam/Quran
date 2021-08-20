import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServerService } from '../../../services/server/server.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ModalService } from '../../../services/modal/modal.service';
import { UserService } from '../../../services/user/user.service';

@Component({
	selector: 'app-masuk',
	templateUrl: './masuk.page.html',
})
export class MasukPage {

	form: FormGroup = new FormGroup({
    eAn: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  }, { updateOn:'submit' })
	loadingLogin = false;
	showPass = false;

	constructor(
		private router: Router,
		private server: ServerService,
		private storage: StorageService,
		private modal: ModalService,
		private user: UserService) {
	}

	masuk(){
		if(this.form.get('eAn').invalid) return this.form.setErrors({err: 'Email ga valid niih..'});
		if(this.form.get('password').invalid) return this.form.setErrors({err: 'Password di isi dulu yaa...'});

		this.loadingLogin = true;
		this.server.masuk(this.form.get('eAn').value, this.form.get('password').value, true).then(data => {
			this.loadingLogin = false;
			if(data.success && data.isEmail){
        this.storage.setStorage('user:data', data.token);
        let decode: any = this.storage.decodeJwt(data.token);
        this.user.setDataUser(decode);
        this.router.navigateByUrl('/');
      }else if(data.success && !data.isEmail){
        this.router.navigate(['/kode', 1, this.form.get('eAn').value])
      }else {
      	this.form.setErrors({err: data.msg});
      }
		}).catch(err => {
			this.loadingLogin = false;
			this.modal.showToast('Terjadi Kesalahan, mohon coba beberapa saat lagi.', {color: 'danger'})
		})
	}

}
