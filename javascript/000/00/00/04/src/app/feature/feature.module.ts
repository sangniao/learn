import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FeatureApiPathInterceptor } from "./feature-api.interceptor";
import { FeatureApiService, FeatureHttpClient } from "./services";
import { FEATURE_HTTP_INTERCEPTORS } from "./tokens";
import { FeatureComponent } from "./feature.component";

@NgModule({
  declarations: [FeatureComponent],
  providers: [
    FeatureApiPathInterceptor,
    {
      provide: FEATURE_HTTP_INTERCEPTORS,
      useClass: FeatureApiPathInterceptor,
      multi: true
    },
    FeatureHttpClient,
    FeatureApiService
  ],
  exports: [HttpClientModule, FeatureComponent]
})
export class FeatureModule {}
