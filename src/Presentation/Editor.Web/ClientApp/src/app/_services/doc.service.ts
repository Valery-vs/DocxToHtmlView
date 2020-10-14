import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Doc } from '../_models/doc';

@Injectable()
export class DocService {
  private apiSubUrl = 'doc';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public ConvertDocxToHtml(docToConvert: File): Promise<Doc> {
    const formData: FormData = new FormData();
    formData.append('fileKey', docToConvert, docToConvert.name);

    return this.http
      .put<Doc>(`${this.baseUrl}${this.apiSubUrl}/docxtohtml`, formData)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
