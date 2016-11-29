"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Timer_1 = require('./Timer');
var Distractor = (function () {
    function Distractor() {
        this.declaredAnswer = false;
    }
    return Distractor;
}());
exports.Distractor = Distractor;
var DistractorEvent = (function () {
    function DistractorEvent(position, selected) {
        this.position = position;
        this.selected = selected;
    }
    return DistractorEvent;
}());
var Question = (function () {
    function Question() {
        this.question = "this is a placeholder.";
        this.answer = [];
        this.distractors = [];
        this.timingInSeconds = 0;
    }
    return Question;
}());
exports.Question = Question;
var QuestionWrapper = (function () {
    function QuestionWrapper() {
        this.question = new Question();
    }
    return QuestionWrapper;
}());
var Section = (function () {
    function Section() {
        this.timingInSeconds = 0;
        this.questions = [];
        this.header = "";
        this.currentQuestion = new QuestionWrapper();
    }
    Section.prototype.queueNextQuestion = function () {
        try {
            this.questionNumber = this.questionNumber || 0;
            if (this.questions.length - 1 >= this.questionNumber) {
                this.currentQuestion.question = this.questions[this.questionNumber];
                this.questionNumber++;
                return true;
            }
            return false;
        }
        catch (e) {
            console.log("queue next question: " + e);
            throw e;
        }
    };
    return Section;
}());
exports.Section = Section;
var SectionIdQuestion = (function () {
    function SectionIdQuestion(sectionNumber, question) {
        this.sectionNumber = sectionNumber;
        this.question = question;
    }
    return SectionIdQuestion;
}());
var Assessment = (function () {
    function Assessment(timer) {
        this.timer = timer;
        this.sectionNumber = 0;
        this.remainingSections = 0;
        this.currentSection = new Section();
        var that = this;
        this.updateTime = function (milliseconds) { return that.doUpdateTime(milliseconds); };
    }
    Object.defineProperty(Assessment.prototype, "time", {
        get: function () {
            var minutes = Math.floor(this.timeInSeconds / 60);
            var seconds = this.timeInSeconds % 60;
            return minutes + ":" + ((seconds < 10) ? '0' : '') + seconds;
        },
        enumerable: true,
        configurable: true
    });
    Assessment.prototype.doUpdateTime = function (milliseconds) {
        this.timeInSeconds += (milliseconds / 1000);
        console.log(this.timeInSeconds);
    };
    Object.defineProperty(Assessment.prototype, "allQuestions", {
        get: function () {
            return this.sections.map(function (s) { return s.questions.map(function (q) { return new SectionIdQuestion(s.sectionNumber, q); }); })
                .reduce(function (a, b) { return a.concat(b); });
        },
        enumerable: true,
        configurable: true
    });
    Assessment.prototype.unsubscribeTimer = function () {
        return this.timer.unsubscribe(this.updateTime);
    };
    Assessment.prototype.subscribeTimer = function () {
        this.timer.subscribe(this.updateTime);
    };
    Assessment.prototype.setUpTimer = function () {
        this.unsubscribeTimer();
        this.timeInSeconds = 0;
        this.subscribeTimer();
    };
    Assessment.prototype.loadAssessment = function (sections) {
        this.sections = sections;
        this.currentSection = null;
        this.remainingSections = 0;
        this.sectionNumber = 0;
        this.endOfAssessmentReached = false;
        this.setUpTimer();
        this.queueNextQuestion();
    };
    Assessment.prototype.scoreQuestion = function (question) {
        var answer = question.distractors.
            map(function (d) {
            return d.answer === !!d.declaredAnswer;
        }).
            reduce(function (p, c) { return p && c; }, true);
        question.score = (answer) ? 1 : 0;
    };
    Assessment.prototype.queueNextSection = function () {
        try {
            if (this.sections.length - 1 < this.sectionNumber) {
                return false;
            }
            this.sectionNumber = this.sectionNumber || 0;
            this.currentSection = this.sections[this.sectionNumber];
            this.sectionNumber++;
            this.currentSection.queueNextQuestion();
            return true;
        }
        catch (e) {
            console.log("queue next section " + e);
            throw e;
        }
    };
    Assessment.prototype.queueNextQuestion = function () {
        if ((!this.currentSection || !this.currentSection.queueNextQuestion()) && !this.queueNextSection()) {
            this.endOfAssessmentReached = true;
            this.unsubscribeTimer();
        }
    };
    Assessment.prototype.getScoredQuestion = function (sectionNumber, questionNumber) {
        var questions = this.sections[sectionNumber].questions.filter(function (x) { return x.number === questionNumber; });
        if (questions.length === 0) {
            throw "Question Number not found: " + questionNumber;
        }
        return questions[0];
    };
    Assessment = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Timer_1.Timer])
    ], Assessment);
    return Assessment;
}());
exports.Assessment = Assessment;
//# sourceMappingURL=Question.js.map