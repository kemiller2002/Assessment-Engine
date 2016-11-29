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
var Question_1 = require('./Question');
var router_1 = require('@angular/router');
var QuestionDetailComponent = (function () {
    function QuestionDetailComponent(activeRoute, assessment) {
        var _this = this;
        this.activeRoute = activeRoute;
        this.assessment = assessment;
        this.question = new Question_1.Question();
        this.sectionHeader = "";
        activeRoute.params.subscribe(function (params) {
            var number = parseInt(params['number'].toString(), 10);
            var section = parseInt(params['section'].toString(), 10);
            _this.question = _this.assessment.getScoredQuestion(section, number);
            _this.sectionHeader = _this.assessment.sections[section].header;
        });
    }
    QuestionDetailComponent = __decorate([
        core_1.Component({
            template: "\n                <a [routerLink]=\"['../../']\">Results List</a>\n\n            <div><pre class=\"header\">{{sectionHeader}}</pre></div>\n            <div class=\"questionWrapper\">\n                <div class=\"questionHeader\">\n                    Question Number: {{question.number}}\n                </div>\n                <div class=\"questionContentsWrapper\">\n                    <span>{{question.question}}</span>\n                    <br/><br/>\n                    <div *ngFor=\"let distractor of question.distractors\" style=\"clear: both;\">\n                        <input #{{distractor.originalPosition}} type=\"checkbox\" id=\"#{{distractor.originalPosition}}\"  [(ngModel)]=\"distractor.declaredAnswer\" /> \n                        <label attr.for=\"#{{distractor.originalPosition}}\" class=\"distractor\">\n                            {{distractor.text}}\n                        </label> \n                        <div style=\"padding-left:30px\">\n                            <span [hidden]=\"distractor.answer !== !!distractor.declaredAnswer\" class=\"correct\">\n                                Correct\n                            </span>\n\n                            <span [hidden]=\"distractor.answer === !!distractor.declaredAnswer\" class=\"incorrect\">\n                                Incorrect\n                            </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, Question_1.Assessment])
    ], QuestionDetailComponent);
    return QuestionDetailComponent;
}());
exports.QuestionDetailComponent = QuestionDetailComponent;
//# sourceMappingURL=QuestionDetailComponent.js.map