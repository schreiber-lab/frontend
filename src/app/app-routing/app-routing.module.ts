import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { JobsDashboardComponent } from "jobs/jobs-dashboard/jobs-dashboard.component";
import { JobsDashboardNewComponent } from "jobs/jobs-dashboard-new/jobs-dashboard-new.component";

import { JobsDetailComponent } from "../jobs/jobs-detail/jobs-detail.component";

import { ErrorPageComponent } from "shared/modules/error-page/error-page.component";

import { LoginComponent } from "../users/login/login.component";
import { UserSettingsComponent } from "../users/user-settings/user-settings.component";

import { ViewProposalPageComponent } from "../proposals/view-proposal-page/view-proposal-page.component";

import { AuthGuard } from "./auth.guard";
import { SampleDetailComponent } from "../samples/sample-detail/sample-detail.component";

import { LogbooksDashboardComponent } from "../logbooks/logbooks-dashboard/logbooks-dashboard.component";
import { LogbooksTableComponent } from "../logbooks/logbooks-table/logbooks-table.component";
import { AboutComponent } from "about/about/about.component";
import { HelpComponent } from "help/help/help.component";
import { PublisheddataDashboardComponent } from "publisheddata/publisheddata-dashboard/publisheddata-dashboard.component";
import { PublisheddataDetailsComponent } from "publisheddata/publisheddata-details/publisheddata-details.component";
import { PublisheddataEditComponent } from "publisheddata/publisheddata-edit/publisheddata-edit.component";

// handles external URLs by lookup in the env config
import { RedirectGuard } from "app-routing/redirect.guard";
import { ProposalDashboardComponent } from "proposals/proposal-dashboard/proposal-dashboard.component";
import { SampleDashboardComponent } from "samples/sample-dashboard/sample-dashboard.component";
import { LoginLayoutComponent } from "_layout/login-layout/login-layout.component";
import { AppLayoutComponent } from "_layout/app-layout/app-layout.component";
import { PoliciesDashboardComponent } from "policies/policies-dashboard/policies-dashboard.component";
import { InstrumentsDashboardComponent } from "instruments/instruments-dashboard/instruments-dashboard.component";
import { InstrumentDetailsComponent } from "instruments/instrument-details/instrument-details.component";
import { AnonymousLayoutComponent } from "_layout/anonymous-layout/anonymous-layout.component";
import { JobsGuard } from "app-routing/jobs.guard";
import { PoliciesGuard } from "app-routing/policies.guard";
import { LogbookGuard } from "app-routing/logbook.guard";
import { FilesDashboardComponent } from "files/files-dashboard/files-dashboard.component";
import { ProposalDashboardNewComponent } from "proposals/proposal-dashboard-new/proposal-dashboard-new.component";

export const routes: Routes = [
  {
    path: "",
    component: AnonymousLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "anonymous/datasets",
        pathMatch: "full",
      },
      {
        path: "anonymous/datasets",
        loadChildren: () => import("../datasets/public-datasets/public-datasets.module").then(m => m.PublicDatasetsModule)
      },
      {
        path: "anonymous/about",
        component: AboutComponent,
      },
      {
        path: "anonymous/help",
        component: HelpComponent,
      },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      { path: "", redirectTo: "/login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      {
        path: "login/error",
        component: ErrorPageComponent,
        data: { errorTitle: "Location Not Found", breadcrumb: "Error" },
      },
    ],
  },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/datasets",
        pathMatch: "full",
      },
      {
        path: "datasets",
        loadChildren: () => import("../datasets/private-datasets/private-datasets.module").then(m => m.PrivateDatasetsModule),
      },
      {
        path: "files",
        component: FilesDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "instruments",
        component: InstrumentsDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "instruments/:id",
        component: InstrumentDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "proposals",
        component: ProposalDashboardNewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "proposalsold",
        component: ProposalDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "proposals/:id",
        component: ViewProposalPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "publishedDatasets",
        component: PublisheddataDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "publishedDatasets/:id/edit",
        component: PublisheddataEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "publishedDatasets/:id",
        component: PublisheddataDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "samples",
        component: SampleDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "samples/:id",
        component: SampleDetailComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "policies",
        component: PoliciesDashboardComponent,
        canActivate: [AuthGuard, PoliciesGuard],
      },

      {
        path: "user",
        component: UserSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user/settings",
        component: UserSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user/jobsold",
        component: JobsDashboardComponent,
        canActivate: [AuthGuard, JobsGuard],
      },
      {
        path: "user/jobs",
        component: JobsDashboardNewComponent,
        canActivate: [AuthGuard, JobsGuard],
      },
      {
        path: "user/jobs/:id",
        component: JobsDetailComponent,
        canActivate: [AuthGuard, JobsGuard],
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "help",
        component: HelpComponent,
      },
      {
        path: "logbooks",
        component: LogbooksTableComponent,
        canActivate: [AuthGuard, LogbookGuard],
      },
      {
        path: "logbooks/:name",
        component: LogbooksDashboardComponent,
        canActivate: [AuthGuard, LogbookGuard],
      },
      {
        path: "error",
        component: ErrorPageComponent,
        data: { errorTitle: "Location Not Found" },
      },
      {
        path: "help/ingestManual",
        canActivate: [RedirectGuard],
        component: RedirectGuard,
        data: {
          urlConfigItem: "ingestManual",
        },
      },
      {
        path: "help/SciCatGettingStartedSLSSummary",
        canActivate: [RedirectGuard],
        component: RedirectGuard,
        data: {
          urlConfigItem: "gettingStarted",
        },
      },
      {
        path: "logout",
        component: LoginLayoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "404",
        component: ErrorPageComponent,
        data: { errorTitle: "404 Page not found", message: "Sorry, the page you are trying to view doesn't exist" }
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/404",
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
  constructor() { }
}
