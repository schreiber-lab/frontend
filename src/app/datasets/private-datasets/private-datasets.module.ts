import { EffectsModule } from "@ngrx/effects";
import { AppConfigModule } from "app-config.module";
import { LinkyModule } from "ngx-linky";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { NgModule } from "@angular/core";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { RouterModule } from "@angular/router";
import { SharedCatanieModule } from "shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { LogbooksModule } from "logbooks/logbooks.module";
import { DatasetEffects } from "state-management/effects/datasets.effects";
import { DatasetsComponentsModule } from "datasets/datasets-components/datasets-components.module";
import { DatasetDetailsDashboardComponent } from "./dataset-details-dashboard/dataset-details-dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrivateDatasetsRoutingModule } from "./private-datasets.routing.module";
import { AnonymousDetailsModule } from "datasets/public-datasets/anonymous-details/anonymous-details.module";
@NgModule({
  imports: [
    AppConfigModule,
    CommonModule,
    EffectsModule.forFeature([DatasetEffects]),
    FlexLayoutModule,
    FormsModule,
    LinkyModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    NgxJsonViewerModule,
    RouterModule,
    SharedCatanieModule,
    LogbooksModule,
    DatasetsComponentsModule,
    PrivateDatasetsRoutingModule,
    AnonymousDetailsModule
  ],
  declarations: [
    DashboardComponent,
    DatasetDetailsDashboardComponent,
    DatasetDetailComponent,
  ],
  providers: [ ],
  exports: [
    DashboardComponent,
    DatasetDetailsDashboardComponent,
    DatasetDetailComponent,
  ],
})
export class PrivateDatasetsModule {}
