import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnonymousDashboardComponent } from "./anonymous-dashboard/anonymous-dashboard.component";
import { AnonymousDetailsDashboardComponent } from "./anonymous-details-dashboard/anonymous-details-dashboard.component";
const routes: Routes = [
  {
    path: "",
    component: AnonymousDashboardComponent,
  },
  {
    path: ":id",
    component: AnonymousDetailsDashboardComponent,
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PublicDatasetsRoutingModule {}
