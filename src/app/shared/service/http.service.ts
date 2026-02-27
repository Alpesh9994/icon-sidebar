import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {empty, from, Observable, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {ToasterService} from '../service/toaster.service';
import {Apiurl} from '../Enum/apiurl.enum';
import {environment} from '../../../environments/environment'
import {OidcSecurityService} from 'angular-auth-oidc-client';
//import { apiUrl } from '../Shared/helper/common';

import { ConfirmationDialogService } from '../../views/confirm-dialog/confirmation-dialog.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { storageConst } from '../helper/common';
import { getLatLongFromFlutter, getLatLongFromWeb } from "../../../assets/js/javascriptHandler";
import { ConstantMessage } from "../Constant/constant";

@Injectable()
export class HttpService {
  ToasterFlag: string = "Record"
  ControllerName: string;
  httpClient: HttpClient;
  baseUrl: string;
  parameterQuery: string
  Urltype: Apiurl = Apiurl.orgManagementAPI;
  private headers: HttpHeaders = new HttpHeaders();
  private httpOptions: any;
  isWebView: boolean = true;
  latLng: { lat: any, long: any } = null;


  //this.httpOptions = {
  //  headers: new HttpHeaders({
  //    'Content-Type': 'application/json',
  //    'access-control-allow-headers': 'cache-control',
  //    'Access-Control-Allow-Origin': '*',
  //  })
  //};
  constructor(private toasterService: ToasterService, private router: Router,
    private securityService: OidcSecurityService, private confirmationDialogService: ConfirmationDialogService
    , private spinner?: SpinnerVisibilityService
  ) {
    //this.appendToken("");
    this.isWebView = /wv/i.test(navigator.userAgent);
  }

  private SetHeader() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    //const token = this.securityService.getToken();

    let token = this.securityService.getToken();
    if (token == "" || token == null) {
      let tokenExist = JSON.parse(localStorage.getItem("ANGULAR_PERSISTENCE_STORAGE::" + storageConst.accessToken));
      if (tokenExist != null && tokenExist != "") {
        token = tokenExist.data;
      }
    }

    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    }

    this.httpOptions = { headers: this.headers }
  }
  private SetHeaderForExcel() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    const token = this.securityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    }
    this.httpOptions = { headers: this.headers, responseType: 'blob' }
  }

  private SetHeaderForUpload(){
    this.headers = new HttpHeaders();
    //this.headers = this.headers.set('Content-Type', 'multipart/form-data');

    const token = this.securityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    }
    this.httpOptions = { headers: this.headers };
  }

  httpGetForExcel(endpoint: string = '', queryValues: string = '', toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeaderForExcel();
    this.getBaseUrl(this.Urltype);
    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, this.httpOptions)
      .pipe(tap((res: any) => { return this.GetAPIResponse(res, toaster); }),
        catchError(this.handleError)
      );
  }

  httpPostForAMCSExcel(
    endpoint: string = '', 
    queryValues: string = '', 
    data: any, 
    toaster: boolean = false, 
    message: string = ''
  ): Observable<any> {
    this.SetHeaderForExcel();
    this.getBaseUrl(this.Urltype);
  
    const url = this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues;
  
    return this.httpClient.post(url, data, this.httpOptions).pipe(
      switchMap((res: any) => from(this.GetResponseForExcel(res, toaster, message))),
      catchError(this.handleError)
    );
  }

  httpPostForExcel(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeaderForExcel();
    this.getBaseUrl(this.Urltype);
    return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
      .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
        catchError(this.handleError));
  }
  //SetHeader() {
  //
  //  const token = this.securityService.getToken();
  //  if (token != undefined && token != '')
  //    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
  //  else
  //    this.router.navigateByUrl("/authPage")
  //}

  //appendToken(token: string) {
  //  token = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxRDlDOEJEMkEwMEY2NzUwNEMwNjIyQUQ0OUYyNzUxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE1OTczMTg1NzEsImV4cCI6MTU5NzMyMjE3MSwiaXNzIjoiaHR0cDovLzE3Mi4xNi4yLjE5NTo2ODIwIiwiY2xpZW50X2lkIjoicGRwb3JnbWFuYWdlbWVudGFwaV9zd2FnZ2VyIiwic3ViIjoiMSIsImF1dGhfdGltZSI6MTU5NzMxODU3MSwiaWRwIjoibG9jYWwiLCJqdGkiOiJBNTMxMDBFMEYxNkM5Q0U4REEyQ0QwRDI0RjkzODA3RSIsInNpZCI6IjNGNkEzQzQ5MkI1ODgwQjIyRDUyRURCRUM1QUVBQUQxIiwiaWF0IjoxNTk3MzE4NTcxLCJzY29wZSI6WyJwZHBvcmdtYW5hZ2VtZW50YXBpIl0sImFtciI6WyJwd2QiXX0.fJQuiiVmWofOC3P1ZlOnzjSrdU8rq0FtMd3gns5P5rt4ZdDayiyU-EtPG_ULMc5qjUO3zcPy1yPSENBrBp0um4S1zjX1HYFtxQ33lvXgqSWUHrbkyZ-ToOTfJWdOwLvvwVIVK5Q1P6cd0Q0QyIBhQMLxmoa51QTd02RHdg7Gtqdhx1d7i6pwnlni-Hu-wZMBw1wrZRF2p-dbxnPHIy4ejfjc7KTo62QuFtk-f0K3RxjKwT4ox7M44dEC7f-0lsZomxVd5_U3FSQyWywTJNzc30Uxz-UsBvhotZ4CLJsKq_wVHnNbZSf7BhzAzKWDC1HIUEYH_m9UOMA6Q9yWnZIFiw";
  //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token);
  //}

  httpGet(endpoint: string = '', queryValues: string = '', toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);
    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, this.httpOptions)
      .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
        catchError(this.handleError)
      );
  }

  httpGetNotification(endpoint: string = '', queryValues: string = '', toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);
    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, this.httpOptions)
      .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }), 
      catchError(() => {
        this.toasterService.showMessage(ConstantMessage.ErrorAlertType, ConstantMessage.InternalServerError);
        return null;
      })
    );
  }

  httpGetWithModel(endpoint: string = '', model: any = null, toaster: boolean = false, message: string = ''): Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);
    
    let params = new HttpParams();
    if (model) {
      Object.keys(model).forEach(key => {
        params = params.append(key, model[key]);
      });
    }

    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : ''), { params: params, headers: this.httpOptions.headers })
      .pipe(
        tap((res: any) => { return this.GetResponse(res, toaster, message); }),
        catchError(this.handleError)
      );
  }

  httpGetSerial(endpoint: string = '', queryValues: string = '', toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeader();
    this.Urltype = Apiurl.ConfigDeviceAPI;
    this.getBaseUrl(this.Urltype);
    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, this.httpOptions)
      .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
        catchError(this.handleError)
      );
  }

   httpPostSerial(endpoint: string = '', queryValues: string = '',data: any, toaster: boolean = false
    , message: string = ''): Observable<any> {
    this.SetHeader();
    this.Urltype = Apiurl.ConfigDeviceAPI;
    this.getBaseUrl(this.Urltype);
    return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
        .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
          catchError(this.handleError));
  }


  httpPost(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false
    , message: string = '', includeLocation: boolean = false, isQueryString: boolean = false)
    : Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);

    if (!includeLocation) {
      return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
        .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
          catchError(this.handleError));
    }
    else {
      let queryParams = isQueryString ? queryValues : data;
      return from(this.addLocationData(queryParams, isQueryString)).pipe(
        switchMap((updatedQuery) => {
          if (updatedQuery) {
            return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + (isQueryString ? updatedQuery : queryValues), data, this.httpOptions)
              .pipe(
                tap((res: any) => this.GetResponse(res, toaster, message)),
                catchError(this.handleError)
              );
          } else {
            return new Observable(null);
          }

        })
      );
    }

  }

  httpPostWithLocation(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false, message: string = ''): Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);

    return from(this.GetLocation()).pipe(
      switchMap((latLng) => {
        this.latLng = latLng;
        if (this.latLng == null || this.latLng.lat == null || this.latLng.long == null) {
          this.toasterService.showMessage(ConstantMessage.WarningAlertType, "Please allow location permission to proceed");
          return new Observable(null);
        } else {
          if (data !== undefined) {
            data.latitude = this.latLng.lat;
            data.longitude = this.latLng.long;
          }

          return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions).pipe(
            tap((res: any) => this.GetResponse(res, toaster, message)),
            catchError(this.handleError)
          );
        }
      })
    );
  }

  // httpPut(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false
  //   , message: string = '')
  //   : Observable<any> {
  //   this.SetHeader();
  //   this.getBaseUrl(this.Urltype);
  //   return this.httpClient.put(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
  //     .pipe(tap((res: any) => { return this.GetResponse(res, toaster, message); }),
  //       catchError(this.handleError));
  // }

  httpPut(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false,
    message: string = '', includeLocation: boolean = false, isQueryString: boolean = false
  ): Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);

    if (!includeLocation) {
      return this.httpClient.put(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
        .pipe(
          tap((res: any) => this.GetResponse(res, toaster, message)),
          catchError(this.handleError)
        );
    } else {
      let queryParams = isQueryString ? queryValues : data;
      return from(this.addLocationData(queryParams, isQueryString)).pipe(
        switchMap((updatedQuery) => {
          if (updatedQuery) {
            return this.httpClient.put(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + (isQueryString ? updatedQuery : queryValues), data, this.httpOptions)
              .pipe(
                tap((res: any) => this.GetResponse(res, toaster, message)),
                catchError(this.handleError)
              );
          } else {
            return new Observable(null);
          }
        })
      );
    }
  }


  httpDelete(endpoint: string = '', queryValues: string = '', toaster: boolean = false
    , message: string = '', includeLocation: boolean = false)
    : Observable<any> {
    this.SetHeader();
    this.getBaseUrl(this.Urltype);
    if (!includeLocation) {
      return this.httpClient.delete(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, this.httpOptions).pipe(
        tap((res: any) => {
          return this.GetResponse(res, toaster, message);
        }),
        catchError(this.handleError)
      );
    } else {
      return from(this.addLocationData(queryValues, true)).pipe(
        switchMap((updatedQuery) => {
          if (updatedQuery) {
            return this.httpClient.delete(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + updatedQuery, this.httpOptions).pipe(
              tap((res: any) => {
                return this.GetResponse(res, toaster, message);
              }),
              catchError(this.handleError)
            );
          } else {
            return new Observable(null);
          }
        })
      );
    }
  }

  GetResponse(data, toaster, message) {
    if (data !== undefined) {
      //if (data.body.statusCode >= 200 && data.body.statusCode < 300) {
      if (toaster) {
        this.toasterService.showMessage('success', message);
      }
    }
    else {
      this.toasterService.showMessage('warning', 'Error occur');
    }
    return data;
    // if (data.body !== undefined) {
    //   if (data.body.statusCode >= 200 && data.body.statusCode < 300) {
    //     console.log('success', data.body.message);
    //   }
    //   else {
    //     console.log('warning', data.body.message);
    //   }
    //   return data.body.data;
    // }
  }

  GetAPIResponse(data, toaster) {
    if (data !== undefined) {
      if (data.statusCode >= 200 && data.statusCode < 300) {
        if (toaster) {
          this.toasterService.showMessage('success', data.message);
        }
        return data.data;
      } else {
        this.toasterService.showMessage('warning', data.message);
        return data;
      }
    }
  }

async GetResponseForExcel(data: any, toaster: boolean, message: string): Promise<any> {
  let json;

  try {
    const text = await new Response(data).text();
    json = JSON.parse(text);
  } catch {
    this.toasterService.showMessage('error', 'Unexpected export format.');
    return { data: null, error: true };
  }

   if(json.data == null){
    return { data: null, error: true };
  }

  // decode base64
  const byteCharacters = atob(json.data.fileContents);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  const blob = new Blob(byteArrays, {
    type: json.data.contentType || 'application/octet-stream',
  });

  return {
    data: blob,
    fileName: json.data.fileDownloadName,
    error: json.isInternalServerHasError
  };
}


  private getBaseUrl(apiurl: Apiurl) {
    switch (apiurl) {
      case Apiurl.ConfigDeviceAPI: {
        this.baseUrl = environment.environment.configDeviceAPIUrl;
        break;
      }
      case Apiurl.configManagementAPI: {
        this.baseUrl = environment.environment.configManagementAPIUrl;
        break;
      }
      case Apiurl.bmcManagementAPI: {
        this.baseUrl = environment.environment.bmcManagementAPIUrl;
        break;
      }
      case Apiurl.orgManagementAPI: {
        this.baseUrl = environment.environment.orgManagementAPIUrl;
        break;
      }
      case Apiurl.aggregatorAPI: {
        this.baseUrl = environment.environment.aggregatorAPIUrl;
        break;
      }
      case Apiurl.PDPDeviceCalibration: {
        this.baseUrl = environment.environment.pdpCalibrationAPIUrl;
        break;
      }
      case Apiurl.PDPIdentityAPI: {
        this.baseUrl = environment.environment.pdpIdentityAPIUrl;
        break;
      }
      case Apiurl.subscriptionApi: {
        this.baseUrl = environment.environment.subscriptionapi;
        break;
      }
      case Apiurl.alertAPI: {
        this.baseUrl = environment.environment.alertapi;
        break;
      }
      case Apiurl.AhManagementAPI: {
        this.baseUrl = environment.environment.ahManagementAPIUrl;
        break;
      }
      case Apiurl.MBRTManagementAPI: {
        this.baseUrl = environment.environment.mbrtManagementAPIUrl;
        break;
      }
      case Apiurl.PDPWWWAPI: {
        this.baseUrl = environment.environment.pdpLoginUrl;
        break;
      }
      case Apiurl.NotificationAPIUrl: {
        this.baseUrl = environment.environment.notificationAPIUrl;
        break;
      }
      default: {
        this.baseUrl = environment.environment.orgManagementAPIUrl;
        break;
      }
    }
  }

  // private handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = ` Error Code: ${error.status}\nMessage: ${error.error.message}`
  //     //console.error('Backend - ' +
  //     //  `status: ${error.status}, ` +
  //     //  `statusText: ${error.statusText}, ` +
  //     //  `message: ${error.error.message}`);
  //   }
  //   //this.toasterService.showMessage('error', error.error.message)
  //   if (error.error.statusCode === 403 || error.error.statusCode === 401) {
  //   //  this.clearCache();
  //     this.router.navigate(['/login']);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(error || 'server error');
  // }
  handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = ` Error Code: ${error.status}\nMessage: ${error.message}`

    }
    // this.toasterService.showMessage('error', error.statusText)
    let tokenExist = JSON.parse(localStorage.getItem("ANGULAR_PERSISTENCE_STORAGE::" + storageConst.accessToken));
    if (error.status === 0 && (window.innerWidth > storageConst.mobileScreenWidth && tokenExist != null && tokenExist != "")) {
      this.openConfirmationDialog();
    }
    else if (error.status === 401 || error.status === 403) {
      this.toasterService.showMessage('error', "We're sorry, you are not authorized.");
      this.router.navigate(['/unauthorized']);
    }

    //else if (error.status === 403) {
    //  this.router.navigate(['/forbidden']);
    //}
    else if (error.error.status === 422) {
      this.toasterService.showMessage('error', error.error.detail);
    }
    else if(error.status === 400){
      if(error.error && error.error.errors && error.error.errors.length > 0){
         this.toasterService.showMessage(ConstantMessage.ErrorAlertType, error.error.errors.join(","));
      }
      else{
        this.toasterService.showMessage('error', "Error in api");
      }
    }
    else
      this.toasterService.showMessage('error', (error.error.Error != "" && error.error.Error != null) ? error.error.Error : error.statusText)
    // return an observable with a user-facing error message
    if (this.spinner !== undefined && this.spinner !== null)
      this.spinner.hide();
    return throwError(error || 'server error');
  }


  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Session Timeout', 'Your session time out. Please sign-in again', false)
      .then((confirmed) => {
        if (confirmed) {
          const isCalibrationMode = localStorage.getItem(storageConst.isCalibrationMode) === "true";
          localStorage.clear();
          if(isCalibrationMode){
            localStorage.setItem(storageConst.isCalibrationMode, "true");
          }
          this.securityService.logoff();
          return true;
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  jsEncode(param: string) {
    return encodeURIComponent(param);
  }

  CommonParameterstring(parameter: any[]) {
    this.parameterQuery = '?';
  
    for (let item of parameter) {
      if (Array.isArray(item.value)) {
        // Join array values with a comma or other delimiter
        this.parameterQuery += `${item.key}=${item.value.join(',')}&`;
      } else {
        this.parameterQuery += `${item.key}=${item.value === "" ? '' : this.jsEncode(item.value)}&`;
      }
    }
  
    if (this.parameterQuery.length > 1) {
      this.parameterQuery = this.parameterQuery.slice(0, -1);
    }
  
    return this.parameterQuery;
  }
  

  async GetLocation(){
    if (this.isWebView) {
      return await getLatLongFromFlutter()
    } else {
      return await getLatLongFromWeb();
    }
  }

  private async addLocationData(data: any, isQueryString: boolean = false): Promise<boolean> {
    let latLng;
    if (this.isWebView) {
      latLng = await getLatLongFromFlutter();
    } else {
      latLng = await getLatLongFromWeb();
    }

    let latitude;
    let longitude;
    if(latLng && latLng.lat && latLng.long) {
      latitude = latLng.lat.toString().length>15 ? (latLng.lat).toFixed(15).slice(0, 15) : latLng.lat.toString();
      longitude = latLng.long.toString().length > 15 ? (latLng.long).toFixed(15).slice(0,15) : latLng.long.toString();
    }

    if (isQueryString) {
      if (latLng && latLng.lat && latLng.long) {
        data += `&latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
        return data;
      }
      else {
        this.toasterService.showMessage(ConstantMessage.WarningAlertType, "Please allow location permission to proceed");
        return false;
      }
    }

    if (data == undefined || data == null)
      return true;

    if (latLng && latLng.lat && latLng.long) {
      data.latitude = latitude;
      data.longitude = longitude;
      return true;
    } else {
      this.toasterService.showMessage(ConstantMessage.WarningAlertType, "Please allow location permission to proceed");
      return false;
    }
  }

  httpPostForUpload(endpoint: string = '', queryValues: string = '', data: any, toaster: boolean = false, message: string = '', includeLocation: boolean = false, isQueryString: boolean = false): Observable<any> {
    this.SetHeaderForUpload();
    this.getBaseUrl(this.Urltype);
  
    if (!includeLocation) {
      return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues, data, this.httpOptions)
        .pipe(
          tap((res: any) => { return this.GetResponse(res, toaster, message); }),
          catchError(this.handleError)
        );
    } else {
      let queryParams = isQueryString ? queryValues : data;
      return from(this.addLocationData(queryParams, isQueryString)).pipe(
        switchMap((updatedQuery) => {
          if (updatedQuery) {
            return this.httpClient.post(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + (isQueryString ? updatedQuery : queryValues), data, this.httpOptions)
              .pipe(
                tap((res: any) => this.GetResponse(res, toaster, message)),
                catchError(this.handleError)
              );
          } else {
            return new Observable(null);
          }
        })
      );
    }
  }

  httpGetWithoutHeader(endpoint: string = '', queryValues: string = ''): Observable<any> {
    this.getBaseUrl(this.Urltype);
    return this.httpClient.get(this.baseUrl + (endpoint ? ('/' + endpoint) : '') + queryValues);
  }
}
