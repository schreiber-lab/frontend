import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DatasetApi, DatablockApi } from 'shared/sdk/services';
import * as DatasetActions from 'state-management/actions/datasets.actions';
import {Dataset} from 'state-management/models';
import {
  getRectangularRepresentation,
  getFullqueryParams,
  getFullfacetsParams,
  getDatasetsInBatch
} from '../selectors/datasets.selectors';
import { map, switchMap, tap, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { getCurrentUser } from '../selectors/users.selectors';
import { LogoutAction, LOGOUT_COMPLETE } from '../actions/user.actions';

@Injectable()
export class DatasetEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private datasetApi: DatasetApi,
  ) {}

  private fullqueryParams$ = this.store.pipe(select(getFullqueryParams));
  private fullfacetParams$ = this.store.pipe(select(getFullfacetsParams));
  private rectangularRepresentation$ = this.store.pipe(select(getRectangularRepresentation));
  private datasetsInBatch$ = this.store.pipe(select(getDatasetsInBatch));
  private currentUser$ = this.store.pipe(select(getCurrentUser));

  private storeBatch(batch: Dataset[], userId: string): void {
    const json = JSON.stringify(batch);
    localStorage.setItem("batch", json);
    localStorage.setItem("batchUser", userId);
  }
  
  private retrieveBatch(ofUserId: string): Dataset[] {
    const json = localStorage.getItem("batch");
    const userId = localStorage.getItem("batchUser");
  
    if (json != null && userId === ofUserId) {
      return JSON.parse(json);
    } else {
      return [];
    }
  }

  @Effect()
  private fetchDatasets$: Observable<Action> = this.actions$.pipe(
    ofType(DatasetActions.FETCH_DATASETS),
    withLatestFrom(this.fullqueryParams$),
    map(([action, params]) => params),
    mergeMap(({query, limits}) =>
      this.datasetApi.fullquery(query, limits).pipe(
        map(datasets => new DatasetActions.FetchDatasetsCompleteAction(datasets as Dataset[])),
        catchError(() => of(new DatasetActions.FetchDatasetsFailedAction()))
      )
    ),
  );

  @Effect()
  private fetchFacetCounts$: Observable<Action> = this.actions$.pipe(
    ofType(DatasetActions.FETCH_FACET_COUNTS),
    withLatestFrom(this.fullfacetParams$),
    map(([action, params]) => params),
    mergeMap(({fields, facets}) => {
      return this.datasetApi.fullfacet(fields, facets).pipe(
        map(res => {
          const {all, ...facetCounts} = res[0];
          const allCounts = all && all.length > 0 ? all[0].totalSets : 0;
          return new DatasetActions.FetchFacetCountsCompleteAction(facetCounts, allCounts);
        }),
        catchError(() => of(new DatasetActions.FetchFacetCountsFailedAction()))
      )
    }),
  );

  @Effect({dispatch: false})
  protected exportToCsv$: Observable<Action> = this.actions$.pipe(
    ofType(DatasetActions.EXPORT_TO_CSV),
    mergeMap(() => this.rectangularRepresentation$),
    tap((rect: any) => {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        useBom: true,
        headers: Object.keys(rect[0])
      };

      const ts = new Angular5Csv(rect, 'Datasets', options);
    })
  );

  @Effect()
  protected getDatablocks$: Observable<Action> =
    this.actions$.pipe(
      ofType(DatasetActions.DATABLOCKS),
      map((action: DatasetActions.DatablocksAction) => action.id),
      switchMap(id => {
        const blockFilter = {
          include: [
            { relation: 'origdatablocks' },
            { relation: 'datablocks' },
            { relation: 'datasetattachments' },
            { relation: 'datasetlifecycle' }
          ]
        };

        // TODO separate action for dataBlocks? or retrieve at once?

        return this.datasetApi.findById(encodeURIComponent(id), blockFilter).pipe(
          map((dataset: Dataset) => new DatasetActions.SearchIDCompleteAction(dataset)),
          catchError(err => of(new DatasetActions.DatablocksFailedAction(err)))
        );
      })
    );

  @Effect({dispatch: false})
  protected storeBatch$ = this.actions$.pipe(
    ofType(DatasetActions.ADD_TO_BATCH, DatasetActions.CLEAR_BATCH),
    withLatestFrom(this.datasetsInBatch$, this.currentUser$),
    tap(([, batch, user]) => this.storeBatch(batch, user.id)),
  );

  @Effect({dispatch: false})
  protected clearBatchOnLogout$ = this.actions$.pipe(
    ofType(LOGOUT_COMPLETE),
    tap(() => this.storeBatch([], null))
  );

  @Effect()
  protected prefillBatch$ = this.actions$.pipe(
    ofType(DatasetActions.PREFILL_BATCH),
    withLatestFrom(this.currentUser$),
    filter(([, user]) => user != null),
    map(([, user]) => this.retrieveBatch(user.id)),
    map(batch => new DatasetActions.PrefillBatchCompleteAction(batch))
  );

      /*
  @Effect()
  protected facet$: Observable<Action> =
    this.action$.ofType(DatasetActions.FILTER_UPDATE)
      .debounceTime(300)
      .map((action: DatasetActions.UpdateFilterAction) => action.payload)
      .switchMap(payload => {
        const fq={}
        // remove fields not relevant for facet filters
        Object.keys(payload).forEach(key => {
           if (['mode','initial','sortField','skip','limit'].indexOf(key)>=0)return
           if (payload[key] === null) return
           if (typeof payload[key] === 'undefined' || payload[key].length == 0) return
           fq[key]=payload[key]
        })
        const facetObject = [  "type", "creationTime", "creationLocation", "ownerGroup","keywords"];
        return this.ds
          .fullfacet(JSON.stringify(fq), facetObject)
          .switchMap(res => {
            const filterValues = res[0];
            return of(new DatasetActions.UpdateFilterCompleteAction(filterValues));
          })
          .catch(err => {
            console.log(err);
            return of(new DatasetActions.FilterFailedAction(err));
          });
      });*/

  /*
  @Effect()
  protected facetDatasets$: Observable<Action> =
    this.action$.ofType(DatasetActions.FILTER_UPDATE)
      .debounceTime(300)
      .map((action: DatasetActions.UpdateFilterAction) => action.payload)
      .switchMap(payload => {
          const limits= {};
          limits['limit'] = payload['limit'] ? payload['limit'] : 30;
          limits['skip'] = payload['skip'] ? payload['skip'] : 0;
          limits['order'] = payload['sortField'] ? payload['sortField'] : "creationTime:desc";
          // remove fields not relevant for facet filters
          // TODO understand what defines the structure of the payload.
          // TODO What is the meaning of "initial"
          const fq={}
          Object.keys(payload).forEach(key => {
             // console.log("======key,payload[key]",key,payload[key])
             if (['initial','sortField','skip','limit'].indexOf(key)>=0)return
             if (payload[key] === null) return
             if (typeof payload[key] === 'undefined' || payload[key].length == 0) return
             if (key === 'mode'){
                 if (payload['mode']==='archive'){
                     fq['archiveStatusMessage']=config.archiveable
                 } else if (payload['mode']==='retrieve'){
                     fq['archiveStatusMessage']=config.retrieveable
                 }
             } else {
                 fq[key]=payload[key]
             }
          })
          return this.ds.fullquery(fq,limits)
              .switchMap(res => {
                return of(new DatasetActions.SearchCompleteAction(res));
              })
              .catch(err => {
                console.log(err);
                return of(new DatasetActions.SearchFailedAction(err));
           });
      });
      */


}


