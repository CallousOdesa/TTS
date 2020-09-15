import { AudioService } from './../../services/audio.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { TtsComponent } from './tts/tts.component';

@NgModule({
  imports: [
    CommonModule,
    AudioService
  ],
  declarations: [
    BodyComponent,
    TtsComponent
  ]
})
export class BodyModule { }
