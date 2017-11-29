import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UserApi} from 'shared/sdk/services';
import * as ua from 'state-management/actions/user.actions';
import * as selectors from 'state-management/selectors';
@Component({
  selector : 'app-user-settings',
  templateUrl : './user-settings.component.html',
  styleUrls : [ './user-settings.component.css' ]
})
export class UserSettingsComponent implements OnInit {

  user: object;
  settings$ = null;

  constructor(private us: UserApi, private store: Store<any>) {
    this.store.select(selectors.users.getCurrentUser).subscribe(user => {
      this.user = user;
    });
    console.log(this.us.getCurrentToken());
    this.settings$ = this.store.select(selectors.users.getSettings);
    // TODO handle service and endpoint for user settings
  }

  ngOnInit() {}

  onSubmit(values) {
    // TODO validate here
    this.store.dispatch({type : ua.SAVE_SETTINGS, payload : values});
    this.store.dispatch({
      type : ua.SHOW_MESSAGE,
      payload : {
        content : 'Settings Saved Locally',
        timeout : 3,
        class : 'ui positive message'
      }
    });
  }
}
