import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuardService implements CanActivate {

  constructor(
  	private router: Router,
  	private storage: StorageService) { }

  canActivate(): Promise<boolean | UrlTree> {
    return this.storage.getDecodedStorage('user:data').then(data => {
      if(data && data['_id']){
        return true;
      }else{
        return this.router.parseUrl('/masuk');
      }
    }).catch(err => {
      console.log(err, 'err getStorage - canActivate - PublicGuardService');
      return this.router.parseUrl('/masuk');
    })
  }
}
