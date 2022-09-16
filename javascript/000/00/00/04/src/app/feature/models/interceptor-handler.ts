import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

export class InterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}
