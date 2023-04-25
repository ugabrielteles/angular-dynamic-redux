import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Clients } from '../store/clients';
import { selectClientById } from '../store/clients.selector';
import { invokeUpdateClientAPI } from '../store/clients.action';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  clientForm: Clients = {
    id: 0,
    name: ''
  };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectClientById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.clientForm = { ...data };
      }
      else{
        this.router.navigate(['/clients']);
      }
    });
  }

  udapte() {
    this.store.dispatch(
      invokeUpdateClientAPI({ updateClient: { ...this.clientForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/clients']);
      }
    });
  }
}
