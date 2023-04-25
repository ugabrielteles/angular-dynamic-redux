import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientsService } from "../clients.service";
import { Store, select } from "@ngrx/store";
import { clientsFetchAPISuccess, deleteClientAPISuccess, invokeClientsAPI, invokeDeleteClientAPI, invokeSaveNewClientAPI, invokeUpdateClientAPI, saveNewClientAPISucess, updateClientAPISucess } from "./clients.action";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { selectClients } from "./clients.selector";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";

@Injectable()
export class ClientsEffect {
  constructor(
    private actions$: Actions,
    private service: ClientsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeClientsAPI),
      withLatestFrom(this.store.pipe(select(selectClients))),
      mergeMap(([, clientformStore]) => {
        if (clientformStore?.length > 0) {
          return EMPTY;
        }
        return this.service
          .get()
          .pipe(map((data) => clientsFetchAPISuccess({ all: data })));
      })
    )
  );

  saveNewClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewClientAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.create(action.newClient).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewClientAPISucess({ newClient: data });
          })
        )
      })
    )
  })

  updateClientAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateClientAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.update(action.updateClient).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateClientAPISucess({ updateClient: data });
          })
        );
      })
    );
  });

  deleteClientsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteClientAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteClientAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
