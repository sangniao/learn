import { InjectionToken } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

export const FEATURE_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
  "An abstraction on feature HttpInterceptor[]"
);
