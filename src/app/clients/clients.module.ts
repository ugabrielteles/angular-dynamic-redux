import { NgModule } from '@angular/core';

import { ClientsComponent } from './clients.component';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ClientsEffect } from './store/clients.effect';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { clientReducer } from './store/clients.reducer';
import { CreateClientComponent } from './create-client/create-client.component';
import { FormsModule } from '@angular/forms';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Route[] = [
  {
    path: ``,
    component: ClientsComponent,
    children: [
      {
        path: `new`,
        component: CreateClientComponent
      },
      {
        path: `edit/:id`,
        component: EditClientComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('clients', clientReducer),
    EffectsModule.forFeature([ClientsEffect]),
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [ClientsComponent, CreateClientComponent, EditClientComponent],
  providers: [],
})
export class ClientsModule { }
