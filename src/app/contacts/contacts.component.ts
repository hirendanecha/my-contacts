import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../@shared/services/sidebar.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }
}
