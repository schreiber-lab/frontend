import { Component, OnInit, Inject } from "@angular/core";
import { APP_CONFIG, AppConfig } from "app-config.module";
import { Store } from "@ngrx/store";
import {
  fetchCurrentUserAction,
  logoutAction,
} from "state-management/actions/user.actions";
import {
  selectUserState,
  selectIsLoggedIn,
  selectCurrentUserName,
  selectThumbnailPhoto,
} from "state-management/selectors/user.selectors";
import { selectUserSettingsPageViewModel, selectScicatToken } from "state-management/selectors/user.selectors";
import { selectDatasetsInBatchIndicator } from "state-management/selectors/datasets.selectors";
import { AppConfigService } from "app-config.service";
import { Router } from "@angular/router";
import { LoopBackAuth, SDKToken } from "shared/sdk";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent implements OnInit {
  config = this.appConfigService.getConfig();
  facility = this.config.facility ?? "";
  status = this.appConfig.production ? "" : "test";
  siteIcon = this.config.siteIcon ?? "site-logo.png";
  authToken: SDKToken;

  username$ = this.store.select(selectCurrentUserName);
  profileImage$ = this.store.select(selectThumbnailPhoto);
  inBatchIndicator$ = this.store.select(selectDatasetsInBatchIndicator);
  loggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private loopBackAuthService: LoopBackAuth,
    public appConfigService: AppConfigService,
    private router: Router,
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    private store: Store
  ) {
  }
  
  logout(): void {
    this.store.dispatch(logoutAction());
  }
  
  openExtension(): void {
    const authToken = this.loopBackAuthService.getToken()?.id?.replace("Bearer ", "");

    window.open(`${this.config.extraSiteURL}/?auth_token=${authToken}`)
  }

  ngOnInit() {
    this.store.dispatch(fetchCurrentUserAction());

    this.username$.subscribe(() => {
      console.log(this.authToken)
    });
  }
}
