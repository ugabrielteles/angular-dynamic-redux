import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Clients } from './clients';

export const selectClients = createFeatureSelector<Clients[]>(`clients`)
export const selectClientById = (clientId: number) =>
  createSelector(selectClients, (clients: Clients[]) => {
    var clientbyId = clients.filter((_) => _.id == clientId);
    if (clientbyId.length == 0) {
      return null;
    }
    return clientbyId[0];
  });
