import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Dataset } from "shared/sdk";
import { selectIsAdmin, selectProfile } from "state-management/selectors/user.selectors";

@Injectable({
  providedIn: "root"
})
export class OwnershipService {
  checkPermission(dataset: Dataset | undefined, store: Store, router: Router) {
    if (dataset) {
      const userProfile$: Observable<any> = store.select(selectProfile);
      const isAdmin$ = store.select(selectIsAdmin);
      const accessGroups$: Observable<string[]> = userProfile$.pipe(
        map((profile) => (profile ? profile.accessGroups : []))
      );
      combineLatest([accessGroups$, isAdmin$]).subscribe(([groups, isAdmin]) => {
        const isInOwnerGroup =
          groups.indexOf(dataset.ownerGroup) !== -1 || isAdmin;
        if (!isInOwnerGroup) {
          router.navigate(["/401"], {
            skipLocationChange: true,
            queryParams: {
              url: router.routerState.snapshot.url,
            },
          });
        }
      }).unsubscribe();
    }
  }
}
