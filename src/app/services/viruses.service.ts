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
export class VirusesService {
  //private virusesUrl = `${ServerConf.serverURL}viruses`; // URL to web api for viruses
  private virusesUrl = `http://localhost:5001/virusdb-b020d/us-central1/api/viruses`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) { }

  /** GET viruses from the server */
  getViruses(): Observable<any> {
    return this.http.get<Virus[]>(this.virusesUrl)
      .pipe(
        // tap(_ => { console.log('Fetched viruses', _); }),
        catchError(this.errorHandler.handleError<Virus[]>(`getViruses ${this.virusesUrl}`, []))
      )
  }

  /** GET a specific species from the server */
  getVirus(species_id: string): Observable<any> {
    const url = `${this.virusesUrl}/${species_id}`;
    return this.http.get<Virus[]>(url)
      .pipe(
        //tap(_ => console.log('Fetched a virus', _)),
        catchError(this.errorHandler.handleError<Virus[]>(`getVirus species=${species_id}`, []))
      )
  }

  searchVirus(term: string): Observable<Virus[]> {
    //const url = `${this.virusesUrl}/search?keywords=${term}`;
    return this.http.get<Virus[]>(this.virusesUrl)
      .pipe(
        //tap(_ => _.forEach(x => console.log(`Fetched search post = ${JSON.stringify(x)}`))),
        catchError(this.errorHandler.handleError<Virus[]>(`searchPost term=${term}`))
      )
  }

  // Add a new virus record to database
  addVirus(entryData: any): Observable<any> {
    return this.http.post<Virus>(this.virusesUrl, entryData)
      .pipe(
        // tap(_ => console.log(`To be saved => `, _)),
        catchError(this.errorHandler.handleError<Virus>(`addVirus`))
      )
  }

  // Update a virus record
  updateVirus(entryData: any): Observable<any> {
    let url = `${this.virusesUrl}/${entryData.species_name}`;
    return this.http.put<Virus>(url, entryData)
      .pipe(
        // tap(_ => console.log(`To be updated => `, _)),
        catchError(this.errorHandler.handleError<Virus>('updateVirus'))
      )
  }
}
