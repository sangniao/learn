import {
  HttpBackend,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

import { InterceptorHandler } from "./interceptor-handler";

export class InterceptingHandler {
  private chain: HttpHandler;

  constructor(
    private backend: HttpBackend,
    private interceptors: HttpInterceptor[]
  ) {
    this.buildChain();
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.chain.handle(req);
  }

  private buildChain(): void {
    this.chain = this.interceptors.reduceRight(
      (next, interceptor) => new InterceptorHandler(next, interceptor),
      this.backend
    );
  }
}
