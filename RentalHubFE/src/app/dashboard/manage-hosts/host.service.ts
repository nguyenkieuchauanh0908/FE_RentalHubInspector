import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';
import { handleError } from 'src/app/shared/handle-errors';
import { resDataDTO } from 'src/app/shared/resDataDTO';

@Injectable({ providedIn: 'root' })
export class HostService {
  constructor(private http: HttpClient) {}

  getActiveHostByRequests(status: number, page: number, limit: number) {
    let queryParams = new HttpParams()
      .append('status', status)
      .append('page', page)
      .append('limit', limit);
    return this.http
      .get<resDataDTO>(environment.baseUrl + 'inspector/get-active-host', {
        params: queryParams,
      })
      .pipe(catchError(handleError));
  }

  getActiveHostDetailByUId(uId: string) {
    let queryParams = new HttpParams().append('userId', uId);
    return this.http
      .get<resDataDTO>(
        environment.baseUrl + 'inspector/get-active-host-by-id',
        {
          params: queryParams,
        }
      )
      .pipe(catchError(handleError));
  }

  sensorHostRequest(identId: string, status: number, reason: string) {
    console.log('🚀 ~ HostService ~ sensorHostRequest ~ reason:', reason);
    return this.http
      .patch<resDataDTO>(environment.baseUrl + 'inspector/sensor-active-host', {
        identId: identId,
        status: status,
        reason: reason,
      })
      .pipe(catchError(handleError));
  }
}
