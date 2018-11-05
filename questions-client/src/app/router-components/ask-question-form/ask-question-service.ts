import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AskQuestionService {
    constructor(private http: HttpClient) {

    }

    public postQuestion(title: string, description: string, themeId: number): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append( 'Content-Type', 'application/json' );

        const body = JSON.stringify({
            title: title,
            description: description,
            themeId: themeId
        });
        return this.http.post(`/api/Questions`, body, {headers});
    }
}
