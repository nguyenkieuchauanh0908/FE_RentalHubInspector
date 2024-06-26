import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { resDataDTO } from '../shared/resDataDTO';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';
import { User } from '../auth/user.model';
import { handleError } from '../shared/handle-errors';

@Injectable({ providedIn: 'root' })
export class AccountService {
  // currentUser: any;
  currentUserId = new Subject<string>();
  private currentUser = new BehaviorSubject<User | null>(null);
  constructor(
    private http: HttpClient // private authService: AuthService
  ) {}

  getCurrentUser = this.currentUser.asObservable();
  setCurrentUser(updatedUser: User | null) {
    this.currentUser.next(updatedUser);
  }

  getCurrentUserId(): string | null {
    console.log('on getting current userId ...');
    let uId: string | null | undefined = null;
    this.getCurrentUser.subscribe((user) => {
      uId = user?._id;
    });
    console.log('current uId: ', uId);
    return uId;
  }

  getProfile(uId: string) {
    console.log('current uId: ', uId);
    let profile: User | null = null;
    this.getCurrentUser.subscribe((user) => {
      profile = user;
    });
    return profile;
  }

  updateProfile(updatedProfile: any) {
    console.log('on calling update profile api...', updatedProfile);
    let updatedtUser: User;
    return this.http
      .patch<resDataDTO>(environment.baseUrl + 'users/update-profile', {
        _fname: updatedProfile._fname,
        _lname: updatedProfile._lname,
        _dob: updatedProfile._dob,
        _address: '',
        _phone: updatedProfile._phone,
        _email: updatedProfile._email,
      })
      .pipe(
        catchError(handleError),
        tap((res) => {
          this.getCurrentUser.subscribe((currentUser) => {
            if (currentUser) {
              currentUser._fname = res.data._fname;
              currentUser._lname = res.data._lname;
              currentUser._email = res.data._email;
              currentUser._phone = res.data._phone;
              updatedtUser = currentUser;
            }
          });
          this.setCurrentUser(updatedtUser);
        })
      );
  }

  updateAvatar(avatar: File) {
    console.log('Your updated avatar type: ', avatar);
    let body = new FormData();
    body.append('_avatar', avatar);
    const headers = new HttpHeaders().set(
      'content-type',
      'multipart/form-data'
    );
    let updatedtUser: User;
    return this.http
      .patch<resDataDTO>(environment.baseUrl + 'users/update-avatar', body, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          this.getCurrentUser.subscribe((currentUser) => {
            if (currentUser) {
              currentUser._avatar = res.data._avatar;
              updatedtUser = currentUser;
            }
          });
          this.setCurrentUser(updatedtUser);
        })
      )
      .pipe(catchError(handleError));
  }

  updateEmailPasswordInspector(oldpwd: string, newpwd: string, repwd: string) {
    return this.http
      .patch<resDataDTO>(environment.baseUrl + 'inspector/update-password', {
        _oldpw: oldpwd,
        _pw: newpwd,
        _pwconfirm: repwd,
      })
      .pipe(
        catchError(handleError),
        tap((res) => {
          if (res.data) {
            console.log('Update password successfully!');
          }
        })
      );
  }

  verifyAccount(phone: string) {
    return this.http
      .post<resDataDTO>(environment.baseUrl + 'users/accounts/active-host', {
        _phone: phone,
      })
      .pipe(catchError(handleError));
  }

  confirmOtp(otp: string) {
    console.log('On verify otp...', otp);
    return this.http
      .post<resDataDTO>(environment.baseUrl + 'users/accounts/verify-host', {
        otp: otp,
      })
      .pipe(catchError(handleError));
    //Xử lý otp hết hạn hoặc yêu cầu gửi lại otp
  }

  resetOtp() {
    return this.http
      .post<resDataDTO>(environment.baseUrl + 'users/accounts/reset-otp', {})
      .pipe(catchError(handleError));
  }

  updateEmailPassword(email: string, pw: string, repw: string) {
    return this.http
      .patch<resDataDTO>(environment.baseUrl + 'users/update-login-info', {
        _email: email,
        _pw: pw,
        _pwconfirm: repw,
      })
      .pipe(catchError(handleError));
  }
  findHostByEmailOrId(keyword: string, status: string | null) {
    let queryParams = new HttpParams().append('keyword', keyword);
    if (status) {
      queryParams = queryParams.append('status', status);
    }
    return this.http
      .get<resDataDTO>(environment.baseUrl + 'inspector/get-host-keyword', {
        params: queryParams,
      })
      .pipe(catchError(handleError));
  }
}
