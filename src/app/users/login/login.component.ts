import { DOCUMENT } from "@angular/common";
import { Component, OnDestroy, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  fetchCurrentUserAction,
  fetchUserAction,
  loginAction,
  loginOIDCAction,
} from "state-management/actions/user.actions";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { selectLoginPageViewModel } from "state-management/selectors/user.selectors";
import { MatDialog } from "@angular/material/dialog";
import { PrivacyDialogComponent } from "users/privacy-dialog/privacy-dialog.component";
import { AppConfig, AppConfigService, OAuth2Endpoint } from "app-config.service";

interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Component to handle user login. Allows for AD and
 * functional account login.
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  private proceedSubscription = new Subscription();
  vm$ = this.store.select(selectLoginPageViewModel);

  appConfig: AppConfig = this.appConfigService.getConfig();
  facility: string | null = null;
  loginFormEnabled = false;
  oAuth2Endpoints: OAuth2Endpoint[] = [];
  loginFormPrefix: string;

  returnUrl: string;
  hide = true;
  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    rememberMe: true,
  });

  constructor(
    private appConfigService: AppConfigService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    @Inject(DOCUMENT) public document: Document
  ) {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "";
  }

  redirectOIDC(authURL: string) {
    this.document.location.href = `${this.appConfig.lbBaseURL}/${authURL}`;
  }

  openPrivacyDialog() {
    this.dialog.open(PrivacyDialogComponent, {
      width: "auto",
    });
  }

  /**
   * Default to an Active directory login attempt initially. Fallback to `local`
   * accounts if fails
   * @memberof LoginComponent
   */
  onLogin() {
    const form: LoginForm = this.loginForm.value;
    this.store.dispatch(loginAction({ form }));
  }

  ngOnInit() {
    this.facility = this.appConfig.facility;
    this.loginFormPrefix = this.appConfig.externalAuthEndpoint ? this.facility: "Service";
    this.loginFormEnabled = this.appConfig.loginFormEnabled;
    this.oAuth2Endpoints = this.appConfig.oAuth2Endpoints;

    this.proceedSubscription = this.vm$
      .pipe(filter((vm) => vm.isLoggedIn))
      .subscribe(() => {
        this.store.dispatch(fetchCurrentUserAction());
        console.log(this.returnUrl);
        this.router.navigateByUrl(this.returnUrl || "/datasets");
      });

    this.route.queryParams.subscribe((params) => {
      // OIDC logins eventually redirect to this componenet, adding information about user
      // which are parsed here.
      if (!!params.returnUrl) {
        const urlqp = new URLSearchParams(params.returnUrl.split("?")[1]);
        // dispatching to the loginOIDCAction passes information to eventually be added to Loopback AccessToken
        const accessToken = urlqp.get("access-token");
        const userId = urlqp.get("user-id");
        this.store.dispatch(
          loginOIDCAction({ oidcLoginResponse: { accessToken, userId } })
        );
        this.store.dispatch(
          fetchUserAction({
            adLoginResponse: { access_token: accessToken, userId },
          })
        );
      }
    });
  }

  ngOnDestroy() {
    this.proceedSubscription.unsubscribe();
  }
}
