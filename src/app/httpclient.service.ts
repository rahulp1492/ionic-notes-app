import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  notes: any;
  start = 1;
  limit = 20;

  constructor(
    private http: HttpClient,
    private storage: Storage
    ) { }

  submit_form(httpUrl: string, postData: HttpParams) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<any[]>(httpUrl, postData, httpOptions);
  }

  getLocalNote(slug: string) {
    return new Promise(resolve => {
      this.storage.get(slug).then(data => {
        resolve(data);
      });
    });
  }

  setLocalNotes(slug: string, content: string) {
    const jsonObj = { 'slug': slug, 'paragraph' : content };
    return this.storage.set(slug.toString(), jsonObj);
  }

  removeLocalNote(slug: string) {
    return this.storage.remove(slug);
  }

  loadNotes() {
    return new Promise(resolve => {
      const arrayVar = [];
      this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
        arrayVar.push(value);
        }).then(data => {
        resolve(arrayVar.reverse());
      });
    });
  }

  getNotes(start: number, limit: number) {
    this.start = start; this.limit = limit;
    return this.loadNotes();
  }
}
