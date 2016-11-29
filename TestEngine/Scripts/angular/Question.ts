import {Injectable} from '@angular/core';
import {Timer} from  './Timer'

export class Distractor {
    text: string;
    answer: Boolean;
    originalPosition: String;


    declaredAnswer: Boolean = false;
}

class DistractorEvent {
    constructor(public position: string, public selected: Boolean) {}
}

export class Question {
    header: string;
    question: string = "this is a placeholder."; 
    answer: string[] = [];
    distractors: Distractor[] = [];

    score: number;

    number: number;

    timingInSeconds: number = 0;
}

class QuestionWrapper {
    constructor() {
        this.question = new Question();
    }
    question : Question ;
}

export class Section  {

    constructor() {
        this.questions = [];
        this.header = "";
        this.currentQuestion = new QuestionWrapper();


    }

    timingInSeconds :number = 0;

    questions: Question[]; 
    header: string;

    questionNumber: number;
    sectionNumber: number;

    currentQuestion: QuestionWrapper;

    queueNextQuestion(): boolean {
        try {
            this.questionNumber = this.questionNumber || 0;

            if (this.questions.length -1 >= this.questionNumber) {
                this.currentQuestion.question = this.questions[this.questionNumber];

                this.questionNumber++;
                return true;
            }

            return false;
        } catch (e) {
            console.log("queue next question: " + e);

            throw e; 
        }
    }


}


class SectionIdQuestion {
    constructor(public sectionNumber: number, public question: Question) {}
}

@Injectable()
export class Assessment {

    sections: Section[];

    sectionNumber : number = 0;

    remainingSections: number = 0;

    currentSection: Section = new Section();

    endOfAssessmentReached: Boolean;

    private timeInSeconds: number;


    get time() : string {

        let minutes = Math.floor(this.timeInSeconds / 60);
        let seconds = this.timeInSeconds % 60;

        return `${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
    }

    constructor(private timer: Timer) {
        let that: Assessment = this;

        this.updateTime = (milliseconds: number) => that.doUpdateTime(milliseconds);
    }

    updateTime : (milliseconds : number) => void;

    doUpdateTime(milliseconds: number): void {
        this.timeInSeconds += (milliseconds / 1000);
        console.log(this.timeInSeconds);
    }

    get allQuestions(): SectionIdQuestion[] {
        return this.sections.map(s => s.questions.map(q => new SectionIdQuestion(s.sectionNumber, q)))
            .reduce((a, b) => a.concat(b));
    }

    private unsubscribeTimer() {
        return this.timer.unsubscribe(this.updateTime);
    }

    private subscribeTimer() {
        this.timer.subscribe(this.updateTime);
    }

    setUpTimer() {
        this.unsubscribeTimer();
        this.timeInSeconds = 0;
        this.subscribeTimer();
    }

    loadAssessment(sections: Section[]) {

        this.sections = sections;

        this.currentSection = null;
        this.remainingSections = 0;
        this.sectionNumber = 0;
        this.endOfAssessmentReached = false;

        this.setUpTimer();

        this.queueNextQuestion();

    }

    scoreQuestion(question: Question) {
        let answer = question.distractors.
            map(d => {
                return d.answer === !!d.declaredAnswer; 
            }).
            reduce((p,c) => p && c , true);

        question.score = (answer) ? 1 : 0;
    }

    queueNextSection() {

        try {

            if (this.sections.length -1 < this.sectionNumber) {
                return false;
            }

            this.sectionNumber = this.sectionNumber || 0;

            this.currentSection = this.sections[this.sectionNumber];

            this.sectionNumber++;

            this.currentSection.queueNextQuestion();

            return true;

        } catch (e) {
            console.log("queue next section " + e);
            throw e;
        }

    }


    queueNextQuestion() {

        if ((!this.currentSection || !this.currentSection.queueNextQuestion()) && !this.queueNextSection()) {
            this.endOfAssessmentReached = true;
            this.unsubscribeTimer();
        }
    }



    getScoredQuestion(sectionNumber: number, questionNumber: number) {
        var questions = this.sections[sectionNumber].questions.filter(x => x.number === questionNumber);

        if (questions.length === 0) {
            throw `Question Number not found: ${questionNumber}`;
        }

        return questions[0];

    }
    
}