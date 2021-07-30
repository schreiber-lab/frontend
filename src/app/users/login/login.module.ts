import { EffectsModule } from "@ngrx/effects";
import { AsyncPipe, CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SharedCatanieModule } from "shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "state-management/reducers/user.reducer";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoginComponent } from "./login.component";
import { UserEffects } from "state-management/effects/user.effects";
import { LoginRoutingModule } from "./login.routing.module";

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature("users", userReducer),
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}
