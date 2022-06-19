import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { ContactService } from 'src/app/@shared/services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  id: string = '';
  contact!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
          this.id = params.get('id') || '';
          return this.contactService.getById(this.id);
      })
    ).subscribe((res: any) => {
      this.contact = res;
    });
  }

  ngOnInit(): void {
  }
}
