import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum TabOptions {
  HOME = 'Home',
  VIRUSES = 'Viruses',
  ADD_VIRUS = 'Add Virus',
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  tabs: TabOptions;

  activeTab:TabOptions = TabOptions.HOME;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
  }

}
