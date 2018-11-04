import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ThemeProvider {

    constructor(private http: HttpClient) {
    }


    public getJSON(): Observable<any> {
        return this.http.get('/api/Themes');
    }
}
