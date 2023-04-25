import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectClients } from './store/clients.selector';
import { invokeClientsAPI, invokeDeleteClientAPI, invokeSaveNewClientAPI } from './store/clients.action';
import { Appstate } from '../shared/store/appstate';
import { selectAppState } from '../shared/store/app.selector';
import { setAPIStatus } from '../shared/store/app.action';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  clients$ = this.store.pipe(select(selectClients));

  ngOnInit(): void {
    this.store.dispatch(invokeClientsAPI());
  }

  delete(id: number) {
    this.store.dispatch(
      invokeDeleteClientAPI({
        id
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }

}
