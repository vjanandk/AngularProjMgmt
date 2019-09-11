import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endPoint = '/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    // 'Access-Control-Allow-Methods': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  addUser(user): Observable<any> {
    console.log("Add User : ", user);
    return this.http.post<any>(endPoint + 'users', JSON.stringify(user), httpOptions).pipe(
      tap((user) => console.log(`added user ', ${user}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  putUser(user): Observable<any> {
    console.log("Put User : ", user);
    return this.http.put<any>(endPoint + 'users', JSON.stringify(user), httpOptions).pipe(
      tap((user) => console.log(`put user ', ${user}`)),
      catchError(this.handleError<any>('putUser'))
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(endPoint + 'users').pipe(
      map(this.extractData));
  }

  addPrjoect(project): Observable<any> {
    console.log("Add Project : ", project);
    return this.http.post<any>(endPoint + 'projects', JSON.stringify(project), httpOptions).pipe(
      tap((project) => console.log("Added Project ", project)),
      catchError(this.handleError<any>('addProject'))
    );
  }

  getProjects(): Observable<any> {
    return this.http.get(endPoint + 'projects').pipe(
      map(this.extractData));
  }

  getProject(projName): Observable<any> {
    return this.http.get(endPoint + `projects/${projName}`).pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);
      console.log(`${operation} has been failed : ${error.message}`);
      return of(result as T);

    }
  }
}
