import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "shared/modules/error-page/error-page.component";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  // {
  //   path: "error",
  //   component: ErrorPageComponent,
  //   data: { errorTitle: "Location Not Found", breadcrumb: "Error" },
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
  constructor() {}
}




