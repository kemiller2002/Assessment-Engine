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
var QuestionsService_1 = require('./QuestionsService');
var router_1 = require('@angular/router');
var Question_1 = require('./Question');
var AssessmentComponent = (function () {
    function AssessmentComponent(assessmentService, activeRoute, assessment) {
        var _this = this;
        this.assessmentService = assessmentService;
        this.activeRoute = activeRoute;
        this.assessment = assessment;
        activeRoute.params.subscribe(function (params) { return _this.retrieveAssessment(params['id'].toString()); });
    }
    AssessmentComponent.prototype.randomize = function (items) {
        return items.map(function (i) { return new ItemWithWeight(i, Math.random()); })
            .sort(function (x, y) { return x.weight - y.weight; })
            .map(function (w) { return w.item; });
    };
    AssessmentComponent.prototype.randomizeQuestions = function (questions) {
        var _this = this;
        var qNumber = 1;
        var randomizedQuestions = this.randomize(questions);
        var questionsWithRandomDistractors = randomizedQuestions.map(function (q) {
            q.number = qNumber;
            qNumber++;
            q.distractors = _this.randomize(q.distractors);
            return q;
        }); //.reverse();
        return questionsWithRandomDistractors;
    };
    AssessmentComponent.prototype.randomizeSections = function (sections) {
        var sNumber = 0;
        var randomizeSections = this.randomize(sections);
        randomizeSections.forEach(function (s) {
            s.sectionNumber = sNumber;
            sNumber++;
        });
        return randomizeSections;
    };
    AssessmentComponent.prototype.retrieveAssessment = function (id) {
        var _this = this;
        this.assessmentService.getAssessment(id).subscribe(function (sections) {
            var randomizedSections = _this.randomizeSections(sections);
            var randomized = randomizedSections.map(function (x) {
                var section = new Question_1.Section();
                section.header = x.header;
                section.questions = _this.randomizeQuestions(x.questions);
                section.sectionNumber = x.sectionNumber;
                return section;
            });
            _this.assessment.loadAssessment(randomized);
        });
    };
    AssessmentComponent.prototype.scoreQuestion = function (question) {
        this.assessment.scoreQuestion(question);
    };
    AssessmentComponent.prototype.queueNextQuestion = function () {
        this.assessment.queueNextQuestion();
    };
    AssessmentComponent.prototype.updateDistractorAnswer = function (distractor, selected) {
        distractor.declaredAnswer = selected;
    };
    AssessmentComponent = __decorate([
        core_1.Component({
            template: "\n        <div style=\"text-align:right\"><span>Used Time:{{assessment.time}}</span></div>\n        <div><pre class=\"header\">{{assessment.currentSection.header}}</pre></div>\n\n        <div class=\"questionWrapper\" [hidden]=\"assessment.remainingSections > 0\">\n            <div class=\"questionHeader\">\n                Question Number: {{assessment.currentSection.currentQuestion.question.number}}\n            </div>\n            <div class=\"questionContentsWrapper\">\n                <span>{{assessment.currentSection.currentQuestion.question.question}}</span>\n                <br/><br/>\n                \n                <div *ngFor=\"let distractor of assessment.currentSection.currentQuestion.question.distractors\" style=\"clear: both;\">\n                    <input #{{distractor.originalPosition}} type=\"checkbox\" id=\"#{{distractor.originalPosition}}\"  [(ngModel)]=\"distractor.declaredAnswer\" /> \n                    <label attr.for=\"#{{distractor.originalPosition}}\" class=\"distractor\">\n                        {{distractor.text}}\n                    </label> \n                    <div style=\"padding-left:30px\">\n                        <span [hidden]=\"((!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score))\n                            ||distractor.answer !== !!distractor.declaredAnswer\" class=\"correct\">\n                            Correct\n                        </span>\n\n                        <span [hidden]=\"((!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score))\n                            ||distractor.answer === !!distractor.declaredAnswer\" class=\"incorrect\">\n                            Incorrect\n                        </span>\n\n                    </div>\n                </div>\n\n            </div>\n        <div class=\"buttonWrapper\">\n            <button type=\"button\" (click)=\"scoreQuestion(assessment.currentSection.currentQuestion.question)\"\n                [hidden]=\"(assessment.currentSection.currentQuestion.question.score == 0) || assessment.currentSection.currentQuestion.question.score\">\n                Answer\n            </button> \n            <button type=\"button\" (click)=\"queueNextQuestion()\" \n                [hidden]=\"(!(assessment.currentSection.currentQuestion.question.score >= 0) && !assessment.currentSection.currentQuestion.question.score) \n                    ||assessment.endOfAssessmentReached\" >\n                Next Question\n            </button>\n        </div>\n    </div>\n\n        <div [hidden]=\"!assessment.endOfAssessmentReached\"> \n            <a [routerLink]=\"['./Results']\">Results</a>\n        </div>\n        \n        ",
            providers: [QuestionsService_1.AssessmentService]
        }), 
        __metadata('design:paramtypes', [QuestionsService_1.AssessmentService, router_1.ActivatedRoute, Question_1.Assessment])
    ], AssessmentComponent);
    return AssessmentComponent;
}());
exports.AssessmentComponent = AssessmentComponent;
var ItemWithWeight = (function () {
    function ItemWithWeight(item, weight) {
        this.item = item;
        this.weight = weight;
    }
    return ItemWithWeight;
}());
//# sourceMappingURL=Assessment.js.map