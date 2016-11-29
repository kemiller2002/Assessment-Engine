import {Injectable} from '@angular/core';

import {Http, Response, HttpModule} from '@angular/http';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import {NameAndPath} from "./NameAndPath";

import {Question, Section} from "./Question"

@Injectable()
export class AssessmentService {
    constructor(private http: Http) { }

    //private url = 'Assessments/C sharp.json';


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public getAssessmentList(): Observable<NameAndPath[]> {
        return this.http.get('Assessment')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getAssessment(path: string): Observable<Section[]> {
        return this.http.get(path)
            .map(this.extractData)
            .catch(this.handleError);
    }


    private handleError(error: any)  {

        let errMsg = (error.message) ? error.message : 

        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }

}
