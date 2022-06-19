import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '../@shared/shared.module';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent
  ],
  imports: [
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
