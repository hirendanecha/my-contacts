import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { ContactService } from 'src/app/@shared/services/contact.service';
import { SidebarService } from 'src/app/@shared/services/sidebar.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  destroyed = new Subject<void>();
  contacts: any = [];
  searchCtrl!: FormControl;

  page: number = 1;
  limit: number = 20;
  term: string = '';
  isNextPageDisabled = false;

  constructor(
    public sidebarService: SidebarService,
    private contactService: ContactService
  ) {
    this.getAllContacts();

    this.createFrom();
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(distinctUntilChanged(), debounceTime(1000), takeUntil(this.destroyed)).subscribe((term: string) => {
      this.term = term;
      this.getAllContacts();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  createFrom(): void {
    this.searchCtrl = new FormControl('');
  }

  prevPage(): void {
    this.page--;
    this.getAllContacts();
  }

  nextPage(): void {
    this.page++;
    this.getAllContacts();
  }

  getAllContacts(): void {
    let params: any = {
      '_page': this.page,
      '_limit': this.limit
    };

    if (this.term) {
      params = {
        ...params,
        'name_like': this.term
        // 'email_like': term,
        // 'phoneNumber_like': term,
      }
    }

    this.contactService.getAll(params).pipe(take(1)).subscribe((res: any) => {
      this.isNextPageDisabled = !(res?.length === this.limit);

      if (res?.length > 0) {
        this.contacts = res || [];
      }
    });
  }
}
