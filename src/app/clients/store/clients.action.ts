import { createAction, props } from "@ngrx/store"
import { Clients } from "./clients";

export const invokeClientsAPI = createAction(
  '[Clients API] Invoke clients Fetch API'
)

export const clientsFetchAPISuccess = createAction(
  '[Clients API] Fetch API Success',
  props<{ all: Clients[] }>()
);

export const invokeSaveNewClientAPI = createAction(
  '[Clients API] Inovke save new Client api',
  props<{ newClient: Clients }>()
);

export const saveNewClientAPISucess = createAction(
  '[Clients API] save new Client api success',
  props<{ newClient: Clients }>()
);

export const invokeUpdateClientAPI = createAction(
  '[Clients API] Inovke update Client api',
  props<{ updateClient: Clients }>()
);

export const updateClientAPISucess = createAction(
  '[Clients API] update  Client api success',
  props<{ updateClient: Clients }>()
);

export const invokeDeleteClientAPI = createAction(
  '[Clients API] Inovke delete Client api',
  props<{id:number}>()
);

export const deleteClientAPISuccess = createAction(
  '[Clients API] deleted Client api success',
  props<{id:number}>()
);
