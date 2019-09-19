import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endPoint = '/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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

  getManager(projId): Observable<any> {
    console.log("Rest - getUser : ", projId);
    let taskId = 0;
    return this.http.get<any>(endPoint + 'users' + '/' + projId + '/' + taskId).pipe(
      map(this.extractData));
  }

  putUser(user): Observable<any> {
    console.log("Rest - putUser : ", user);
    return this.http.put<any>(endPoint + 'users', JSON.stringify(user), httpOptions).pipe(
      catchError(this.handleError<any>('putUser'))
    );
  }

  deleteUser(empId): Observable<any> {
    console.log("Rest - deleteUser : ", empId);
    return this.http.delete<any>(endPoint + 'users' + '/' + empId, httpOptions).pipe(
      catchError(this.handleError<any>('deleteUser'))
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

  deleteProject(projId): Observable<any> {
    console.log("Rest - deleteProject : ", projId);
    return this.http.delete<any>(endPoint + 'projects' + '/' + projId, httpOptions).pipe(
      catchError(this.handleError<any>('deleteProject'))
    );
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

  getPtaskById(parentId): Observable<any> {
    return this.http.get(endPoint + `parenttasks/${parentId}`).pipe(
      map(this.extractData));
  }

  getPtaskByName(ptaskName, parentId): Observable<any> {
    return this.http.get(endPoint + `parenttasks/${ptaskName}/${parentId}`).pipe(
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

  getTaskByProjId(projId, taskId): Observable<any> {
    return this.http.get(endPoint + `tasks/${projId}/${taskId}`).pipe(
      map(this.extractData));
  }

  setEndTask(taskId): Observable<any> {
    return this.http.put<any>(endPoint + `tasks/${taskId}`, httpOptions).pipe(
      catchError(this.handleError<any>('setEndTask'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);
      // console.log(`${operation} has been failed : ${error.message}`);
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