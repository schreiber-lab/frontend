
import { EffectsModule } from "@ngrx/effects";
import { AppConfigModule } from "app-config.module";
import { LinkyModule, LinkyPipe } from "ngx-linky";
import { AsyncPipe, CommonModule, DatePipe } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { NgModule } from "@angular/core";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { RouterModule } from "@angular/router";
import { SharedCatanieModule } from "shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { datasetsReducer } from "state-management/reducers/datasets.reducer";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatNativeDateModule,
  MatOptionModule,
} from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LogbooksModule } from "logbooks/logbooks.module";


import { AnonymousDetailsDashboardComponent } from "./anonymous-details-dashboard/anonymous-details-dashboard.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DatasetEffects } from "state-management/effects/datasets.effects";
import { AnonymousDashboardComponent } from "./anonymous-dashboard/anonymous-dashboard.component";
import { ScientificMetadataModule } from "shared/modules/scientific-metadata/scientific-metadata.module";
import { FileSizePipe } from "shared/pipes/filesize.pipe";
import { DatasetsComponentsModule } from "datasets/datasets-components/datasets-components.module";
import { PublicDatasetsRoutingModule } from "./public-datasets.routing.module";
import { AnonymousDetailsModule } from "./anonymous-details/anonymous-details.module";

@NgModule({
  imports: [
    AppConfigModule,
    CommonModule,
    EffectsModule.forFeature([DatasetEffects]),
    FlexLayoutModule,
    FormsModule,
    LinkyModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
    RouterModule,
    SharedCatanieModule,
    ScientificMetadataModule,
    StoreModule.forFeature("datasets", datasetsReducer),
    LogbooksModule,
    DatasetsComponentsModule,
    PublicDatasetsRoutingModule,
    AnonymousDetailsModule
  ],
  declarations: [
    AnonymousDashboardComponent,
    AnonymousDetailsDashboardComponent,
  ],
  providers: [
    AsyncPipe,
    FileSizePipe,
    LinkyPipe,
    DatePipe
  ],
  exports: [],
})
export class PublicDatasetsModule {}
