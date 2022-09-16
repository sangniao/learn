import { Component, OnInit } from "@angular/core";
import { FeatureApiService } from "./services";

@Component({
  selector: "app-feature",
  template: ""
})
export class FeatureComponent implements OnInit {
  constructor(private api: FeatureApiService) {}

  ngOnInit(): void {
    this.api.getData().subscribe();
  }
}
