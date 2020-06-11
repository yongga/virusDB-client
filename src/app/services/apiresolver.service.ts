import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, switchMap } from 'rxjs/operators';
import { VirusesService } from 'src/app/services/viruses.service';
import { DialogService } from './dialog-service';

@Injectable({
  providedIn: 'root'
})
export class APIResolverService implements Resolve<any> {

  constructor(
    private virusService: VirusesService,
    private router: Router, // to manipulate post-retrieval routing,
    private dialogService: DialogService,
  ) { }

  ref:any;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // handle display of species details
    let species_id = route.paramMap.get('id') ? route.paramMap.get('id') : null;

    // species details
    if (species_id) {
      return this.loadVirus(species_id);
    }
    // landing page
    else {
      this.ref = this.dialogService.displayRetrievingData();
      return this.loadViruses();
    }
  }

  loadViruses(): any {
    return this.virusService.getViruses().pipe(
      switchMap(resp => {
        if (resp['success'] == true) {
          let viruses = resp['data'];
          viruses = this.transformList(viruses);
          return of(viruses);
        } else {
          this.ref.close();
          return EMPTY;
        }
      })
    );
  }

  loadVirus(species_id: string): any {
    return this.virusService.getVirus(species_id).pipe(
      switchMap(resp => {
        if (resp['success'] == true && resp['data'].length > 0) {
          let virus = resp['data'];
          return of(virus);
        } else {
          // redirect to main page
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  transformList(viruses:any[]): any {
    let tmp_list = [];
    viruses.map(virus => {
      let id = virus._id;
      let species_name = virus.species_name;
      virus.discoveries.map(x => {
          const virus = {
            "_id": id,
            "species_name": species_name,
            "discovery": {
              "country": x.country,
              "date_found": x.date_found,
              "citation": {
                "author": x.citation.author,
                "pub_year": x.citation.pub_year,
              }
            }
          };
          tmp_list.push(virus);
        }
      );
    });
    return tmp_list;
  }
  
}
