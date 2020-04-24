import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { Virus } from '../virus';

@Injectable({
  providedIn: 'root'
})
export class VirusesService {

  private virusesUrl = 'http://localhost:3000/api/viruses'; // URL to web api for viruses

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) { }

  /** GET viruses from the server */
  getViruses(): Observable<any> {
    return this.http.get<Virus[]>(this.virusesUrl)
      .pipe(
        //tap(_ => console.log('Fetched posts', _)),
        catchError(this.errorHandler.handleError<Virus[]>('getViruses', []))
      )
  }

  searchVirus(term: string): Observable<Virus[]> {
    const url = `${this.virusesUrl}/search?keywords=${term}`;
    return this.http.get<Virus[]>(url)
      .pipe(
        //tap(_ => _.forEach(x => console.log(`Fetched search post = ${JSON.stringify(x)}`))),
        catchError(this.errorHandler.handleError<Virus[]>(`searchPost term=${term}`))
      )
  }

  addVirus(entryForm: any): Observable<any> {
    let entry = this.convertFormData(entryForm);

    return this.http.post<Virus>(this.virusesUrl, entry)
      .pipe(
        tap(_ => console.log(`To be saved => `, _)),
        catchError(this.errorHandler.handleError<Virus>(`addVirus`))
      )
  }

  convertFormData(entryForm: any) {
    // get values of all controls via "entryForm.value"
    console.log(`Form Entry sent: `, entryForm.value);
    return entryForm.value;
  }
}
