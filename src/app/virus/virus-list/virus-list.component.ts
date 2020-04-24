import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VirusesService } from 'src/app/services/viruses.service';
import { Virus } from '../../virus';

@Component({
  selector: 'app-virus-list',
  templateUrl: './virus-list.component.html',
  styleUrls: ['./virus-list.component.css']
})
export class VirusListComponent implements OnInit {

  viruses: any;

  constructor(
    private virusService: VirusesService,
  ) { }

  ngOnInit(): void {
    this.loadViruses();
  }

  loadViruses() {
    this.virusService.getViruses().subscribe(resp => {
      if (resp.success == true) {
        this.viruses = resp.data;
      }
      
    });
  }

}
