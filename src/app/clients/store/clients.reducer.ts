import { createReducer, on } from '@ngrx/store';
import { Clients } from './clients';
import { clientsFetchAPISuccess, deleteClientAPISuccess, saveNewClientAPISucess, updateClientAPISucess } from './clients.action';

export const initialState: ReadonlyArray<Clients> = [];

export const clientReducer = createReducer(
  initialState,
  on(clientsFetchAPISuccess, (state, { all }) => {
    return all;
  }),
  on(saveNewClientAPISucess, (state, { newClient }) => {
    let newState = [...state];
    newState.unshift(newClient);
    return newState;
  }),
  on(updateClientAPISucess, (state, { updateClient }) => {
    let newState = state.filter((_) => _.id != updateClient.id);
    newState.unshift(updateClient);
    return newState;
  }),
  on(deleteClientAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
)
