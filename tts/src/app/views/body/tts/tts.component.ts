import { AudioService } from './../../../services/audio.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {

  @ViewChild('audioOption', {static: false}) playerRef: ElementRef<HTMLAudioElement>;
  @ViewChild('text', {static: false}) textRef: ElementRef<HTMLTextAreaElement>;

  get $player(): HTMLAudioElement {
    return this.playerRef.nativeElement;
  }

  private body = {
    audioConfig: {
      audioEncoding: 'LINEAR16',
      pitch: 0,
      speakingRate: 1
    },
    input: {
      text: 'Test'
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-D',
      ssmlGender: 'FEMALE'
    }
  };

  private options;

  constructor(private http: HttpClient, private audioService: AudioService) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Goog-Api-Key': 'AIzaSyBUrG7YyqBHH-TcgwACamVt3mlNU2u5dR4' })
    };
  }

  ngOnInit() {
  }
  public sendRequest() {


    this.body.input.text = this.textRef.nativeElement.value;

    this.http.post('https://texttospeech.googleapis.com/v1beta1/text:synthesize', this.body, this.options).subscribe(
        (res: any) => {
            console.log(res);

            const blobUrl = this.audioService.getAudioBlob(res.audioContent);

            this.$player.src = blobUrl;

            this.$player.pause();
            this.$player.load();
            this.$player.oncanplaythrough =  () => {
              this.$player.play();
            };

        },
        err => {
            console.log(err.message);
        }
    );
  }

}
