import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { Virus } from '../virus';

import {ServerConf} from '../config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private virusesUrl = `${ServerConf.serverURL}users`; // URL to web api for viruses

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) { }

  /** Pass the credentials to the server */
  getUser(species_id: string): Observable<any> {
    return this.http.get<Virus[]>(this.virusesUrl)
      .pipe(
        //tap(_ => console.log('Fetched a virus', _)),
        catchError(this.errorHandler.handleError<Virus[]>(`getUser`, []))
      )
  }
}
