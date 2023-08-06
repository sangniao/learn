import { Component } from "@angular/core";
import { map } from "rxjs/operators";
import { UserService } from "./user/user.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private readonly userService: UserService) {}

  public usersRoles$ = this.userService.getUserPoles();

  public updatedAt$ = this.usersRoles$.pipe(map(() => new Date()));

  refreshUserList(): void {
    this.userService.refreshData();
  }
}
