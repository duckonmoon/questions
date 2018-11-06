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

    public submitAnswer(title: string, description: string, questionId: number): Observable<any> {
        console.log('here');
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            title: title,
            description: description,
            questionId: questionId
        })
        return this.http.post("api/Answers", body, { headers })
    }
}
