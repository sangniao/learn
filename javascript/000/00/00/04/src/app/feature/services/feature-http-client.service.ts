import { Inject, Injectable } from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

import { FEATURE_HTTP_INTERCEPTORS } from "../tokens";
import { InterceptingHandler } from "../models";

@Injectable()
export class FeatureHttpClient extends HttpClient {
  constructor(
    backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
    @Inject(FEATURE_HTTP_INTERCEPTORS) featureInterceptors: HttpInterceptor[]
  ) {
    super(
      new InterceptingHandler(backend, interceptors.concat(featureInterceptors))
    );
  }
}
