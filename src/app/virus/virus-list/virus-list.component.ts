import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VirusesService } from 'src/app/services/viruses.service';
import { Virus } from '../../virus';
import { SearchService } from '../../services/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  ) { }

  ngOnInit(): void {
    //this.loadViruses();
    this.viruses = [{
        "_id": "5ea001d0b2c0b43bb8c2ffa5",
        "discoveries": [{
          "_id": "5ea001d0b2c0b43bb8c2ffa6",
          "country": "Singapore",
          "date_found": "1900BC",
          "citation": {
              "author": "WY, Goh",
              "pub_year": "1860"
          }
      }, {
          "_id": "5ea001d0b2c0b43bb8c2ffa7",
          "country": "USA",
          "date_found": "1860AC",
          "citation": {
              "author": "JY, Lee",
              "pub_year": "1900"
          }
      }],
        "species_name": "Angrophorm1",
    },
    {
      "_id": "5ea001d0b2c0b43bb8c2ffa5",
      "discoveries": [{
        "_id": "5ea001d0b2c0b43bb8c2ffa6",
        "country": "Singapore",
        "date_found": "1900BC",
        "citation": {
            "author": "WY, Goh",
            "pub_year": "1860"
        }
    }, {
        "_id": "5ea001d0b2c0b43bb8c2ffa7",
        "country": "USA",
        "date_found": "1860AC",
        "citation": {
            "author": "JY, Lee",
            "pub_year": "1900"
        }
    }],
      "species_name": "Angrophorm5",
  },
  {
    "_id": "5ea001d0b2c0b43bb8c2ffa5",
    "discoveries": [{
      "_id": "5ea001d0b2c0b43bb8c2ffa6",
      "country": "Singapore",
      "date_found": "1900BC",
      "citation": {
          "author": "WY, Goh",
          "pub_year": "1860"
      }
  }, {
      "_id": "5ea001d0b2c0b43bb8c2ffa7",
      "country": "USA",
      "date_found": "1860AC",
      "citation": {
          "author": "JY, Lee",
          "pub_year": "1900"
      }
  }],
    "species_name": "Angrophorm3",
}];

    this.viruses = this.transformList(this.viruses);
    this.filteredViruses = this.viruses;
    
    console.log(this.viruses);

    this.searchService.searchText.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe((searchText) => {
      if (searchText != null)
        this.searchViruses(searchText);
    })
  }

  loadViruses() {
    this.virusService.getViruses().subscribe(resp => {
      if (resp.success == true) {
        this.viruses = resp.data;
        this.viruses = this.transformList(this.viruses);
        this.filteredViruses = this.viruses;
      }
    });
  }

  searchViruses(searchText: string) {
    console.log("Search term = ", searchText);
    
    if (!searchText)
      this.filteredViruses = this.viruses; 
  
    else {
      this.filteredViruses = this.viruses.filter(x => {
        // console.log(x.species_name);
        // console.log(x.species_name.includes(searchText));
        return x.species_name.includes(searchText);
      });
    }
    console.log(this.viruses);
  }

  // countResults(): number {
  //   let count: number = 0;
    
  //   // total: the accumulator for the count in each loop
  //   count = this.filteredViruses.reduce((total, virus) => {
  //     return total += virus.discoveries.length;
  //   }, 0);

  //   return count;
  // }

  transformList(viruses:any[]): any {
    let tmp_list = [];

    viruses.map(virus => {
      let species_name = virus.species_name;
      virus.discoveries.map(
        x => {
          const virus = {
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
