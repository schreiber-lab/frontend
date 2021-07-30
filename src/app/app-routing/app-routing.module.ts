import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ErrorPageComponent } from "shared/modules/error-page/error-page.component";

import { AuthGuard } from "./auth.guard";


// handles external URLs by lookup in the env config
import { LoginLayoutComponent } from "_layout/login-layout/login-layout.component";
import { AppLayoutComponent } from "_layout/app-layout/app-layout.component";
import { AnonymousLayoutComponent } from "_layout/anonymous-layout/anonymous-layout.component";

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
        loadChildren: () => import("../about/about.module").then( m => m.AboutModule)
      },
      {
        path: "anonymous/help",
        loadChildren: () => import("../help/help.module").then( m => m.HelpModule)
      },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      { path: "", redirectTo: "/login", pathMatch: "full" },
      {
        path: "login",
        loadChildren: () => import("../users/login/login.module").then( m => m.LoginModule)
      },
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
        loadChildren: () => import("../files/files.module").then( m => m.FilesModule)
      },
      {
        path: "instruments",
        loadChildren: () => import("../instruments/instruments.module").then( m => m.InstrumentsModule)
      },
      {
        path: "proposals",
        loadChildren: () => import("../proposals/proposals.module").then( m => m.ProposalsModule)
      },
      {
        path: "publishedDatasets",
        loadChildren: () => import("../publisheddata/publisheddata.module").then( m => m.PublisheddataModule)
      },
      {
        path: "samples",
        loadChildren: () => import("../samples/samples.module").then( m => m.SamplesModule)
      },

      {
        path: "policies",
        loadChildren: () => import("../policies/policies.module").then( m => m.PoliciesModule)
      },

      {
        path: "user",
        loadChildren: () => import("../users/users.module").then( m => m.UsersModule)
      },
      {
        path: "about",
        loadChildren: () => import("../about/about.module").then( m => m.AboutModule)
      },
      {
        path: "help",
        loadChildren: () => import("../help/help.module").then( m => m.HelpModule)
        // component: HelpComponent,
      },
      // {
      //   path: "logbooks",
      //   loadChildren: () => import("../logbooks/logbooks.module").then( m => m.LogbooksModule)
      //   component: LogbooksTableComponent,
      //   canActivate: [AuthGuard, LogbookGuard],
      // },
      // {
      //   path: "logbooks/:name",
      //   component: LogbooksDashboardComponent,
      //   canActivate: [AuthGuard, LogbookGuard],
      // },
      {
        path: "error",
        component: ErrorPageComponent,
        data: { errorTitle: "Location Not Found" },
      },
      // {
      //   path: "help/ingestManual",
      //   canActivate: [RedirectGuard],
      //   component: RedirectGuard,
      //   data: {
      //     urlConfigItem: "ingestManual",
      //   },
      // },
      // {
      //   path: "help/SciCatGettingStartedSLSSummary",
      //   canActivate: [RedirectGuard],
      //   component: RedirectGuard,
      //   data: {
      //     urlConfigItem: "gettingStarted",
      //   },
      // },
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
