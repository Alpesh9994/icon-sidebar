import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';
import { storageConst } from '../helper/common'


@Injectable({
  providedIn: 'root'
})

export class BaseService {
  cultureLabelList: {};
  cultureLabel = {};
  apiUrl: string = 'enter-your-api-url';
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  //headers = new HttpHeaders({
  //  'Content-Type': 'application/json',
  //  'Access-Control-Allow-Credentials': 'true',
  //  'Access-Control-Allow-Origin': '*',
  //  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
  //  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  //});

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'access-control-allow-headers': 'cache-control'
  });

  constructor(private http: HttpClient, private persistenceService: PersistenceService) { }

  // Create
  createTask(data): Observable<any> {
    
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.error)
      )
  }

  // Read
  showTasks() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  updateTask(id, data): Observable<any> {
    let API_URL = `${this.apiUrl}/update-task/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Delete
  deleteTask(id): Observable<any> {
    var API_URL = `${this.apiUrl}/delete-task/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  GetResponse(data) {
    
    if (data.body !== undefined) {
      if (data.body.statusCode >= 200 && data.body.statusCode < 300) {
        console.log('success', data.body.message);    
        }
       else {
        console.log('warning', data.body.message);
      }
      return data.body.data;
    }
  }

  /** save data to local storage with encryption */
  saveLocalData(keyId: string, val: string) {
    if (keyId && val) {
      //const encrypted = AES.encrypt(enc.Utf8.parse(val), strKey, {
      //  keySize: 128 / 8,
      //  iv: strIv,
      //  mode: mode.CBC,
      //  padding: pad.Pkcs7
      //});
      //const encryptedData = encrypted;
      this.persistenceService.set(keyId, val, { type: StorageType.LOCAL });
    }
  }

  /** get data from local storage with decryption */
  getLocalData(keyId: string) {
    if (keyId) {
      const val = this.persistenceService.get(keyId, StorageType.LOCAL);
      if (val !== undefined) {
        return val;
      } else {
        return '';
      }
    }
  }

  pageAction(str) {
    const pageActionObj = JSON.parse(this.getLocalData(storageConst.menuPermission));
    let flag;
    switch (str) {
      case 'add':
        flag = pageActionObj.canAdd;
        break;
      case 'view':
        flag = pageActionObj.canView;
        break;
      case 'edit':
        flag = pageActionObj.canEdit;
        break;
      case 'delete':
        flag = pageActionObj.canDelete;
        break;
    }
    return flag;
  }

  // currentUser
  removeLocalData(keyId: string) {
    this.persistenceService.remove(keyId, StorageType.LOCAL);
  }

  getByResourceSet() {
    var culutreLableValue = this.getLocalData(storageConst.cultureValue) !== '' ?
      JSON.parse(this.getLocalData(storageConst.cultureValue)) : null;
    if (culutreLableValue !== null) {
      culutreLableValue.forEach(item => {
        this.cultureLabel[item.resourceName] = item.resourceValue;
      });
      this.cultureLabelList = this.cultureLabel;
    }
    return this.cultureLabelList;
  }

  getValueByKey(key) {
    if (key in this.cultureLabel) { return this.cultureLabel[key]; } else {
      return key; // Return the key itself if it's not found
    }
  }
}
