import { NgModule } from "@angular/core";
import { UserApiService } from "./user-api.service";
import { UserService } from "./user.service";

@NgModule({
  providers: [UserApiService, UserService]
})
export class UserModule {}
