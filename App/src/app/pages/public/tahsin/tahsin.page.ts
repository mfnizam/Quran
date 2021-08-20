import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TahsinService, Tahsin } from '../../../services/tahsin/tahsin.service';

@Component({
  selector: 'app-tahsin',
  templateUrl: './tahsin.page.html'
})
export class TahsinPage {
  private destroy$: Subject<void> = new Subject<void>();

  dataTahsin: Tahsin;
  dataTahsinSekitar: Tahsin[];

  constructor(
  	private router: Router,
  	private active: ActivatedRoute,
  	private navCtrl: NavController,
  	private tahsin: TahsinService) {
  	active.queryParams
  	.pipe(takeUntil(this.destroy$))
  	.subscribe(data => {
  		this.dataTahsin = data['id']? tahsin.tahsin.find(v => v._id == data['id']) : tahsin.tahsin[0];
  		console.log(this.dataTahsin)
  		this.dataTahsinSekitar = tahsin.tahsin;
  	})
  }

  ionViewDidEnter(){
  	this.scrollTahsin(this.dataTahsin._id)
  }

  changeTahsin(id, nama?){
    this.router.navigate([], {queryParams: {id: id}, replaceUrl: true});
    this.scrollTahsin(id)
  }

  scrollTahsin(id){
  	let p = document.getElementById('p-tahsin');
    let pb = p.getBoundingClientRect();
    p.scrollTo({
      left: (p.scrollLeft + document.getElementById('pp-' + id).getBoundingClientRect().left - pb.left - 40), 
      behavior: 'smooth'
    })
  }

  tahsinTrackBy(index: number, item: Tahsin) {
    return item._id
  }

  goBack(){
  	this.navCtrl.back();
  }

  ngOnDestroy() {
  	this.destroy$.next();
    this.destroy$.complete();
  }
}
