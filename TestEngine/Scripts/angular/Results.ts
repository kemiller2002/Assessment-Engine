import {Component} from "@angular/core";
import {Assessment} from "./Question";

@Component (
    {
        template: `
                <div>Used Time: {{assessment.time}}</div>
                <div *ngFor="let sectionIdAndQuestion of assessment.allQuestions">
                    <div>{{sectionIdAndQuestion.question.number}} : 
                        <a [routerLink]="[sectionIdAndQuestion.sectionNumber,sectionIdAndQuestion.question.number]"> 
                                <span [hidden]="sectionIdAndQuestion.question.score <= 0" class="correct">
                                    Correct
                                </span>

                                <span [hidden]="sectionIdAndQuestion.question.score > 0" class="incorrect">
                                    Incorrect
                                </span>          
                        </a>
                    </div>
                </div>`,
        providers: []
    }
)
export class ResultsComponent {
    
    constructor(private assessment: Assessment) {
        console.log(assessment.allQuestions);
    }

    public showCount() {
    }

}