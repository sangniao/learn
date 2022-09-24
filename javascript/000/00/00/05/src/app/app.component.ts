import { Component } from "@angular/core";

@Component({
  selector: "cdk-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  dataSource = [
    {
      label: "Parent 1",
      children: [{ label: "Child 1" }, { label: "Child 2" }]
    },
    { label: "Parent 2" }
  ];
}
