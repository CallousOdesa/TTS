import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

constructor() { }

  /**
   * Method generates new blob from binary data
   * @param audioContent Income binary data
   */
  public getAudioBlob(audioContent: string) {

    const raw = window.atob(audioContent);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }

    const blob = new Blob([array], {type : 'audio/ogg'});

    return window.URL.createObjectURL(blob);
  }

}
