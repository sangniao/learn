import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FeatureHttpClient } from "./feature-http-client.service";

@Injectable()
export class FeatureApiService {
  constructor(private readonly http: FeatureHttpClient) {}

  getData(): Observable<any> {
    // Request url path with parameters will be 'https://api.com/api'
    return this.http.get("/data");
  }
}
