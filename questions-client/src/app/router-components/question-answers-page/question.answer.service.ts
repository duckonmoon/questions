import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FullQuestionService {
    constructor(private http: HttpClient) {

    }

    public getFullQuestion(questionId: number): Observable<any> {
        return this.http.get(`api/Questions/${questionId}`)
    }
}
