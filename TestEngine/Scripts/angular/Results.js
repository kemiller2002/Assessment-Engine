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
var core_1 = require("@angular/core");
var Question_1 = require("./Question");
var ResultsComponent = (function () {
    function ResultsComponent(assessment) {
        this.assessment = assessment;
        console.log(assessment.allQuestions);
    }
    ResultsComponent.prototype.showCount = function () {
    };
    ResultsComponent = __decorate([
        core_1.Component({
            template: "\n                <div>Used Time: {{assessment.time}}</div>\n                <div *ngFor=\"let sectionIdAndQuestion of assessment.allQuestions\">\n                    <div>{{sectionIdAndQuestion.question.number}} : \n                        <a [routerLink]=\"[sectionIdAndQuestion.sectionNumber,sectionIdAndQuestion.question.number]\"> \n                                <span [hidden]=\"sectionIdAndQuestion.question.score <= 0\" class=\"correct\">\n                                    Correct\n                                </span>\n\n                                <span [hidden]=\"sectionIdAndQuestion.question.score > 0\" class=\"incorrect\">\n                                    Incorrect\n                                </span>          \n                        </a>\n                    </div>\n                </div>",
            providers: []
        }), 
        __metadata('design:paramtypes', [Question_1.Assessment])
    ], ResultsComponent);
    return ResultsComponent;
}());
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=Results.js.map