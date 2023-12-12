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
import { LoopBackAuth } from "shared/sdk";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null
}

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
  authToken = getCookie("$LoopBackSDK$id");

  vm$ = this.store.select(selectScicatToken);
  username$ = this.store.select(selectCurrentUserName);
  user$ = this.store.select(selectUserState);
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
    // this.vm$.subscribe(
    //   (settings) => {
    //     // @ts-ignore
    //     console.log(settings)
    //     (this.authToken = settings.scicatToken.replace("Bearer ", ""))
    //   }   
    // );
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnInit() {
    this.store.dispatch(fetchCurrentUserAction());
  }
}
