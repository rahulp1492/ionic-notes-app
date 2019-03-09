import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpclientService } from '../httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  inputHeight: number;
  inputArea: HTMLElement;
  slug: any;
  note: any;

  constructor(
    platform: Platform,
    private httpClient: HttpclientService,
    private router: Router
  ) {
    this.inputHeight = platform.height();
  }

  ngOnInit() {
    if (this.router.url.split('/')[2]) { this.getNote(this.router.url.split('/')[2]); } else { this.slug = Date.now(); }
    this.inputArea = document.getElementById('note');
    this.inputArea.style.overflow = 'hidden';
    this.inputArea.style.height = (this.inputHeight - 35) + 'px';
  }

  getNote(slug: string) {
    this.inputArea = document.getElementById('note') as HTMLInputElement;
    this.slug = slug;
    this.httpClient.getLocalNote(this.slug).then((data: { paragraph: any; }) => {
      this.note = data.paragraph;
    });
  }

  saveNote() {
    this.httpClient.setLocalNotes(this.slug.toString(), document.querySelector('textarea').value);
  }
}
