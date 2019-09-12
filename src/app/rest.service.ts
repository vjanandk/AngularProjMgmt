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
    console.log("Rest - addUser : ", user);
    return this.http.post<any>(endPoint + 'users', JSON.stringify(user), httpOptions).pipe(
      catchError(this.handleError<any>('addUser'))
    );
  }

  getUsers(): Observable<any> {
    console.log(`Rest - getUsers`);
    return this.http.get(endPoint + 'users').pipe(
      map(this.extractData));
  }

  getUser(userId): Observable<any> {
    console.log(`Rest - getUser : ${userId}`);
    return this.http.get<any>(endPoint + 'users' + '/' + userId).pipe(
      map(this.extractData));
  }

  putUser(user): Observable<any> {
    console.log("Rest - putUser : ", user);
    return this.http.put<any>(endPoint + 'users', JSON.stringify(user), httpOptions).pipe(
      catchError(this.handleError<any>('putUser'))
    );
  }

  addPrjoect(project): Observable<any> {
    console.log("Rest - addProject : ", project);
    return this.http.post<any>(endPoint + 'projects', JSON.stringify(project), httpOptions).pipe(
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

  addParentTask(ptask): Observable<any> {
    console.log("Rest - addParentTask : ", ptask);
    return this.http.post<any>(endPoint + 'parenttasks', JSON.stringify(ptask), httpOptions).pipe(
      catchError(this.handleError<any>('addParentTask'))
    );
  }

  getParentTasks(): Observable<any> {
    return this.http.get(endPoint + 'parenttasks').pipe(
      map(this.extractData));
  }

  getParentTask(ptaskName): Observable<any> {
    return this.http.get(endPoint + `projects/${ptaskName}`).pipe(
      map(this.extractData));
  }

  addTask(task): Observable<any> {
    console.log("Rest - addTask : ", task);
    return this.http.post<any>(endPoint + 'tasks', JSON.stringify(task), httpOptions).pipe(
      catchError(this.handleError<any>('addTask'))
    );
  }

  getTasks(): Observable<any> {
    return this.http.get(endPoint + 'tasks').pipe(
      map(this.extractData));
  }

  getTask(ptaskName): Observable<any> {
    return this.http.get(endPoint + `tasks/${ptaskName}`).pipe(
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



// updUserProj(userId, projId): Observable<any> {
//   console.log(`Rest - updUserProj : ${userId}, ${projId}`);
//   return this.http.put<any>(endPoint + 'users/updproj' + '/' + userId + '/' + projId, httpOptions).pipe(
//     tap((user) => console.log(`updUserProj : ${userId}, ${projId}`)),
//     catchError(this.handleError<any>('updUserProj'))
//   );
// }

// updUserTask(userId, taskId): Observable<any> {
//   console.log(`updUserTask : ${userId}, ${taskId}`);
//   return this.http.put<any>(endPoint + 'users' + '/' + userId + '/' + taskId, httpOptions).pipe(
//     tap((user) => console.log(`updUserTask : ${userId}, ${taskId}`)),
//     catchError(this.handleError<any>('updUserTask'))
//   );
// }