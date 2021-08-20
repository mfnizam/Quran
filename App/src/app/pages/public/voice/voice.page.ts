import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html'
})
export class VoicePage implements OnInit {

  constructor() { }

  ngOnInit() {
		// let options: CaptureImageOptions = { limit: 3 }
		// this.mediaCapture.captureImage(options)
		//   .then(
		//     (data: MediaFile[]) => console.log(data),
		//     (err: CaptureError) => console.error(err)
		//   );
  }

}