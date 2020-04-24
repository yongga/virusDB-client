import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  tabs: string[] = [];

  activeTab: string = this.tabs[0];

  constructor() { }

  ngOnInit(): void {

  }

  set currentTab(tab: string) {
    this.activeTab = tab;
  }

}
