import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private msgSrc = new BehaviorSubject<string>(null);
  searchText = this.msgSrc.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.msgSrc.next(message);
  }
}
