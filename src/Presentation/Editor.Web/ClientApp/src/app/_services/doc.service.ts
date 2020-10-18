import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HtmlDoc } from '../_dto/htmlDoc';

@Injectable()
export class DocService {
  private apiSubUrl = 'doc';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public ConvertDocxToHtml(docToConvert: File): Promise<HtmlDoc> {
    const formData: FormData = new FormData();
    formData.append('fileKey', docToConvert, docToConvert.name);

    return this.http
      .put<HtmlDoc>(`${this.baseUrl}${this.apiSubUrl}/docxtohtml`, formData)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
