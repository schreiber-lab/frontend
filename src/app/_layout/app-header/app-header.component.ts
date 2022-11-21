import { Component, OnInit, Inject } from "@angular/core";
import { APP_CONFIG, AppConfig } from "app-config.module";
import { Store } from "@ngrx/store";
import {
  fetchCurrentUserAction,
  logoutAction,
} from "state-management/actions/user.actions";
import {
  selectIsLoggedIn,
  selectCurrentUserName,
  selectThumbnailPhoto,
} from "state-management/selectors/user.selectors";
import { selectDatasetsInBatchIndicator } from "state-management/selectors/datasets.selectors";
import { AppConfigService } from "app-config.service";
import { LoopBackAuth } from "shared/sdk";
@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent implements OnInit {
  config = this.appConfigService.getConfig();
  facility = this.config.facility ?? "";
  status = this.appConfig.production ? "" : "test";
  authToken = this.loopBackAuthService.getToken().id;

  username$ = this.store.select(selectCurrentUserName);
  profileImage$ = this.store.select(selectThumbnailPhoto);
  inBatchIndicator$ = this.store.select(selectDatasetsInBatchIndicator);
  loggedIn$ = this.store.select(selectIsLoggedIn);
  
  constructor(
    private loopBackAuthService: LoopBackAuth,
    public appConfigService: AppConfigService,
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    private store: Store
  ) {}

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnInit() {
    this.store.dispatch(fetchCurrentUserAction());
  }
}
