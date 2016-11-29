import
{
    NgModule, Component
} from '@angular/core';


import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Http, Response, HttpModule} from '@angular/http';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import {AssessmentService} from "./QuestionsService";

import {Assessment} from "./Question";

import {NameAndPath} from "./NameAndPath";

import {Routes, RouterModule, RouterOutlet, RouterLink, RouterLinkWithHref,
    RouterLinkActive} from "@angular/router";
import {AssessmentComponent} from './Assessment';

import {AssessmentListComponent} from './AssessmentListComponent';

import {FormsModule} from '@angular/forms';

import {QuestionDetailComponent} from "./QuestionDetailComponent"

import {ResultsComponent} from "./Results"

import {Timer} from "./Timer"

export const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref,
    RouterLinkActive];

@Component (
    {
        selector: 'test-taker',
        template: `<a [routerLink]="['./']">Assessment List</a>
                    <br/><br/>
                    <router-outlet></router-outlet>
                `,
        providers: [AssessmentService, Assessment, Timer]
    }
)
class TestTaker {


    constructor() {
        //this.assessmentService.getAssessment().toPromise().then(x => alert(x)).catch(x => alert(x));
    }

}


const routes: Routes = [
    { path: '', component: AssessmentListComponent },
    { path: 'assessment/:id', component: AssessmentComponent },
    { path: 'assessment/:id/Results', component: ResultsComponent },
    {path: 'assessment/:id/Results/:section/:number', component:QuestionDetailComponent }
];


@NgModule({
    declarations: [TestTaker, AssessmentComponent, AssessmentListComponent, QuestionDetailComponent, ResultsComponent],
    imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), FormsModule],
    bootstrap: [TestTaker]
})
class TestTakerAppModule {


}


platformBrowserDynamic().bootstrapModule(TestTakerAppModule);
