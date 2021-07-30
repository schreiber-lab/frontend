
import { AppConfigModule } from "app-config.module";
import { LinkyModule, LinkyPipe } from "ngx-linky";
import { CommonModule, DatePipe } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule } from "@angular/material/chips";
import { NgModule } from "@angular/core";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { RouterModule } from "@angular/router";
import { SharedCatanieModule } from "shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { FileSizePipe } from "shared/pipes/filesize.pipe";
import { AnonymousDetailsComponent } from "./anonymous-details.component";

@NgModule({
  imports: [
    AppConfigModule,
    CommonModule,
    FlexLayoutModule,
    LinkyModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    NgxJsonViewerModule,
    RouterModule,
    SharedCatanieModule,
  ],
  declarations: [
    AnonymousDetailsComponent,
  ],
  providers: [
    FileSizePipe,
    LinkyPipe,
    DatePipe
  ],
  exports: [
    AnonymousDetailsComponent,
  ],
})
export class AnonymousDetailsModule {}
