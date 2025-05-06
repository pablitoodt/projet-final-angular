import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, expand, reduce, map, catchError } from 'rxjs';

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private readonly api = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<{
    data: T;
    status: number;
    statusMessage: string;
  }> {
    return this.http
      .get<T>(`${this.api}/${endpoint}`, { observe: 'response' })
      .pipe(
        map((res) => ({
          data: res.body as T,
          status: res.status,
          statusMessage: res.statusText,
        })),
        catchError((err: HttpErrorResponse) =>
          throwError(() => ({
            data: {} as T,
            status: err.status,
            statusMessage: err.statusText || 'Unknown error',
          }))
        )
      );
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    const firstPage$ = this.http.get<ApiResponse<T>>(
      `${this.api}/${endpoint}`
    );

    return firstPage$.pipe(
      expand((page) =>
        page.info.next ? this.http.get<ApiResponse<T>>(page.info.next) : []
      ),
      reduce<ApiResponse<T>, T[]>((acc, page) => acc.concat(page.results), []),
      catchError((err: HttpErrorResponse) => throwError(() => err))
    );
  }
}
