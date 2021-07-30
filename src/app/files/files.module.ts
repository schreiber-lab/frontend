import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedCatanieModule } from "shared/shared.module";
import { FilesDashboardComponent } from "./files-dashboard/files-dashboard.component";
import { FilesRoutingModule } from "./files.routing.module";

// TODO remove unneeded "store" structures in new componnets

@NgModule({
  declarations: [FilesDashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    SharedCatanieModule,
    FilesRoutingModule
  ],
  exports: [FilesDashboardComponent]
})
export class FilesModule { }
