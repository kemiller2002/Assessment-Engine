import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {Http, Response, HttpModule} from '@angular/http';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import {AssessmentService} from "./QuestionsService";
import {NameAndPath} from "./NameAndPath";

import {Routes, RouterModule} from "@angular/router";
import {AssessmentComponent} from './Assessment'

import
{
    NgModule, Component
} from '@angular/core';



@Component(
{
        template: `<div *ngFor="let assessment of assessments"><a [routerLink]="['./assessment', assessment.Path]">{{assessment.Name}}</a></div>`,
        providers: [AssessmentService],
        
})
export class AssessmentListComponent {

    assessments: NameAndPath[];

    constructor(private assessmentService: AssessmentService) {
    
        assessmentService.getAssessmentList().toPromise().then(x => this.assessments = x);
    }

}