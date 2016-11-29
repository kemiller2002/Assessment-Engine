import
{
    NgModule, Component
} from '@angular/core';

import {AssessmentService} from './QuestionsService'
import {ActivatedRoute} from '@angular/router'

import {Assessment, Question, Distractor, Section} from './Question'


@Component({
    template: `
        <div style="text-align:right"><span>Used Time:{{assessment.time}}</span></div>
        <div><pre class="header">{{assessment.currentSection.header}}</pre></div>

        <div class="questionWrapper" [hidden]="assessment.remainingSections > 0">
            <div class="questionHeader">
                Question Number: {{assessment.currentSection.currentQuestion.question.number}}
            </div>
            <div class="questionContentsWrapper">
                <span>{{assessment.currentSection.currentQuestion.question.question}}</span>
                <br/><br/>
                
                <div *ngFor="let distractor of assessment.currentSection.currentQuestion.question.distractors" style="clear: both;">
                    <input #{{distractor.originalPosition}} type="checkbox" id="#{{distractor.originalPosition}}"  [(ngModel)]="distractor.declaredAnswer" /> 
                    <label attr.for="#{{distractor.originalPosition}}" class="distractor">
                        {{distractor.text}}
                    </label> 
                    <div style="padding-left:30px">
                        <span [hidden]="((!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score))
                            ||distractor.answer !== !!distractor.declaredAnswer" class="correct">
                            Correct
                        </span>

                        <span [hidden]="((!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score))
                            ||distractor.answer === !!distractor.declaredAnswer" class="incorrect">
                            Incorrect
                        </span>

                    </div>
                </div>

            </div>
        <div class="buttonWrapper">
            <button type="button" (click)="scoreQuestion(assessment.currentSection.currentQuestion.question)"
                [hidden]="(assessment.currentSection.currentQuestion.question.score == 0) || assessment.currentSection.currentQuestion.question.score">
                Answer
            </button> 
            <button type="button" (click)="queueNextQuestion()" 
                [hidden]="(!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score) 
                    ||assessment.endOfAssessmentReached" >
                Next Question
            </button>
        </div>
    </div>

        <div [hidden]="!assessment.endOfAssessmentReached"> 
            <a [routerLink]="['./Results']">Results</a>
        </div>
        
        `, 
        providers: [AssessmentService]
    }
)
export class AssessmentComponent {

    

    constructor(
        private assessmentService: AssessmentService,
        private activeRoute: ActivatedRoute,
        private assessment: Assessment) {
        activeRoute.params.subscribe(params => this.retrieveAssessment(params['id'].toString()));
    }


    randomize<T>(items: T[]): T[] {
        return items.map(i => new ItemWithWeight<T>(i, Math.random()))
            .sort((x, y) => x.weight - y.weight)
            .map(w => w.item);
    }

    private randomizeQuestions(questions: Question[]) : Question[] {
        let qNumber = 1;
        let randomizedQuestions = <Question[]>this.randomize(questions);

        let questionsWithRandomDistractors = randomizedQuestions.map(q => {
            q.number = qNumber;
            qNumber++;
            q.distractors = this.randomize(q.distractors);
            return q;
        });//.reverse();

        return questionsWithRandomDistractors;
    }

    private randomizeSections(sections: Section[]): Section[] {
        let sNumber = 0;
        let randomizeSections = <Section[]>this.randomize(sections);

        randomizeSections.forEach(s => {
            s.sectionNumber = sNumber;
            sNumber ++;
        });

        return randomizeSections;
    }

    private retrieveAssessment(id: string) {
    
        this.assessmentService.getAssessment(id).subscribe(sections => {

            let randomizedSections = this.randomizeSections(sections);

            let randomized = randomizedSections.map(x => {
                let section = new Section();
                section.header = x.header;
                section.questions = this.randomizeQuestions(x.questions);
                section.sectionNumber = x.sectionNumber;
                return section;
            });


            this.assessment.loadAssessment(randomized);

        });
        
    }

    scoreQuestion(question: Question) {
        this.assessment.scoreQuestion(question);
    }

    queueNextQuestion() {
        this.assessment.queueNextQuestion();
    }

    updateDistractorAnswer(distractor: Distractor, selected: Boolean): void {
        distractor.declaredAnswer = selected;
    }


}


class ItemWithWeight<T> {

    constructor(public item: T,
        public weight: number
    ) {}
}