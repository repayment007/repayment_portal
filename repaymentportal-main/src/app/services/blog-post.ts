import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private apiUrl = `${environment.apiUrl}/api/v1/blog-posts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  update(id: string, post: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, post);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
