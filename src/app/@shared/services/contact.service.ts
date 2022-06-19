import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from '../constants/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(config: any = { '_page': 1, '_limit': 10 }): Observable<any> {
    return this.httpClient.get(urlConstants.CONTRACT.BASE, { params: config });
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get(`${urlConstants.CONTRACT.BASE}/${id}`);
  }
}
