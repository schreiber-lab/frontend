import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app-routing/auth.guard";
import { DatasetsGuard } from "app-routing/datasets.guard";
import { LeavingPageGuard } from "app-routing/pending-changes.guard";
import { BatchViewComponent } from "datasets/datasets-components/batch-view/batch-view.component";
import { DatablocksComponent } from "datasets/datasets-components/datablocks-table/datablocks-table.component";
import { PublishComponent } from "datasets/datasets-components/publish/publish.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailsDashboardComponent } from "./dataset-details-dashboard/dataset-details-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "batch",
    component: BatchViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "batch/publish",
    component: PublishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    component: DatasetDetailsDashboardComponent,
    canActivate: [DatasetsGuard],
    canDeactivate: [LeavingPageGuard]
  },
  {
    path: ":id/datablocks",
    component: DatablocksComponent,
    canActivate: [DatasetsGuard],
  },
  // Do we need this path? seems like one could go to datafile in dataset detail
  // {
  //   path: ":id/datafiles",
  //   component: DatafilesComponent,
  //   canActivate: [DatasetsGuard],
  // },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PrivateDatasetsRoutingModule {}
