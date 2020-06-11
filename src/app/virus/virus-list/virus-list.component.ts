import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VirusesService } from 'src/app/services/viruses.service';
import { Virus } from '../../virus';
import { SearchService } from '../../services/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog-service';

@Component({
  selector: 'app-virus-list',
  templateUrl: './virus-list.component.html',
  styleUrls: ['./virus-list.component.css']
})
export class VirusListComponent implements OnInit {

  viruses: any[]; // immutable list of viruses
  filteredViruses: any[]; // filtered list of viruses

  p: number = 1;

  constructor(
    private virusService: VirusesService,
    private searchService: SearchService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // pre-fetched data in API resolver

    // Clear search bar text on page load
    this.searchService.changeMessage("");

    this.searchService.searchText.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe((searchText) => {
      if (searchText != null && searchText != "") {
        this.searchViruses(searchText);
      }
      else {
        this.loadViruses();
      }
    })
  }

  loadViruses() {
    this.route.data
        .subscribe((data: { viruses: any }) => {
          this.viruses = data.viruses;
          this.filteredViruses = data.viruses;
          this.dialogService.close();
        });
  }

  searchViruses(searchText: string) {
    searchText = searchText.length >= 2 ? searchText.charAt(0).toUpperCase() + searchText.slice(1) : searchText.charAt(0).toUpperCase();

    if (!searchText)
      this.filteredViruses = this.viruses; 
  
    else {
      this.virusService.searchVirus(searchText).subscribe(resp => {
        if (resp['success'] == true) {
          let viruses = [];
          viruses = resp['data'];

          // Client-side manual search
          viruses = viruses.filter(virus => {
            return (virus.species_name.toLowerCase().indexOf(`${searchText.toLowerCase()}`) > -1);
          });

          viruses = this.transformList(viruses);
          this.filteredViruses = viruses;
        } else {
          this.filteredViruses = [];
        }
      });
    }
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
