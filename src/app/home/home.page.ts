import { Component, ViewChild } from '@angular/core';
import { HttpclientService } from '../httpclient.service';
import { AlertController, IonItemSliding, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  notes: any;
  start = 1;
  defaultstart = 1;
  defaultlimit = 20;
  limit = 20;
  user_id = 1;
  response: any;
  slug: number;

  constructor(private httpClient: HttpclientService,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.start = this.defaultstart;
    this.limit = this.defaultlimit;
    this.httpClient.getNotes(this.start, this.limit).then(data => {
      this.notes = data;
    });
  }

  /**
   * This method when call alert with the input field will be visible to us.
   */
  deleteNotes(slidingItem: IonItemSliding, note: any) {
    this.alertCtrl.create({
      message: 'Do You Really Want to Delete?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.deleteNote(slidingItem, note);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  deleteNote(slidingItem: IonItemSliding, note: any) {
    this.slug = note.slug;
    this.httpClient.removeLocalNote(this.slug.toString()).then(
      data => {
        if (data === undefined) {
        const indexRemove = this.notes.indexOf(note);
          if (indexRemove > -1) {
              slidingItem.close();
              this.notes.splice(indexRemove, 1);
          }
        }
      });
  }

  scrollToTop() {
    document.querySelector('ion-content').scrollToTop(500);
  }
}
