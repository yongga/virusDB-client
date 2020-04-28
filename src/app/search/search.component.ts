import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.searchService.changeMessage(this.searchText);
  }

}
