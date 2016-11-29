import {Component} from '@angular/core'

import {Assessment, Question} from './Question'

import {ActivatedRoute} from '@angular/router'

@Component(
{
        template: `
                <a [routerLink]="['../../']">Results List</a>

            <div><pre class="header">{{sectionHeader}}</pre></div>
            <div class="questionWrapper">
                <div class="questionHeader">
                    Question Number: {{question.number}}
                </div>
                <div class="questionContentsWrapper">
                    <span>{{question.question}}</span>
                    <br/><br/>
                    <div *ngFor="let distractor of question.distractors" style="clear: both;">
                        <input #{{distractor.originalPosition}} type="checkbox" id="#{{distractor.originalPosition}}"  [(ngModel)]="distractor.declaredAnswer" /> 
                        <label attr.for="#{{distractor.originalPosition}}" class="distractor">
                            {{distractor.text}}
                        </label> 
                        <div style="padding-left:30px">
                            <span [hidden]="distractor.answer !== !!distractor.declaredAnswer" class="correct">
                                Correct
                            </span>

                            <span [hidden]="distractor.answer === !!distractor.declaredAnswer" class="incorrect">
                                Incorrect
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `


})
export class QuestionDetailComponent {

    question: Question = new Question();
    sectionHeader: string = "";

    constructor(private activeRoute: ActivatedRoute,
        private assessment: Assessment) {
        activeRoute.params.subscribe(params => {
            let number = parseInt(params['number'].toString(), 10);
            let section = parseInt(params['section'].toString(), 10);

            this.question = this.assessment.getScoredQuestion(section, number);

            this.sectionHeader = this.assessment.sections[section].header;
        });
    }
}

