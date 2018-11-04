import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGuard } from 'src/app/__guards/auth.guards';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient,private auth: AuthGuard) {
    }


    public login(userName, password) {
            this.http
            .post('api/token',
                `grant_type=password&username=${userName}&password=${password}`
            ).subscribe(
                result => {
                    localStorage.setItem('currentUser', result['access_token']);
                    this.auth.next();
                    location.reload(true);
                },
                (e) => console.log(e)
            )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.auth.next();
    }
}