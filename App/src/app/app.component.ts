import { Component, ViewChild, ElementRef } from '@angular/core';

import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild('audioPlayer', { read: ElementRef }) audioPlayer: ElementRef;

  constructor(
    private storage: StorageService
  ) {}
}
