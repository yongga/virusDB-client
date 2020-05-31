import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log("outgoing request",request);
    request = request.clone({
      withCredentials: true
    });
    //console.log("new outgoing request",request);

    return next
      .handle(request)
      .pipe(
          tap(ev=>{
              //console.log(`Event triggered= ${JSON.stringify(ev)}`);
              // if (ev instanceof HttpResponse)
              //   console.log(`Http response received= ${JSON.stringify(ev.headers.keys())}`);
          })
      )
  }
}