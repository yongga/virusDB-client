import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // default page = viruses
  currentPage:string = "Viruses";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public auth: AngularFireAuth
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.getNavPage(event.urlAfterRedirects);
        console.log('Event = ', event.urlAfterRedirects);
      }
    }));
  }

  getNavPage(path: string): string {
    path = path.slice(1).toLowerCase(); // omit the '/' backslash
    path = path.split('/')[0];
    path = path.length >= 2 ? path.charAt(0).toUpperCase() + path.slice(1) : path.charAt(0).toUpperCase();
    return path;
  }


  logout() {
    this.auth.signOut()
        .then(() => {
            console.log(`User has logged out`);
        })
        .catch((err) => {
          console.error(`${err["message"]}`);
        })
  }

}
