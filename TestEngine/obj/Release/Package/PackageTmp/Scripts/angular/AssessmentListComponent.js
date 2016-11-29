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
var QuestionsService_1 = require("./QuestionsService");
var core_1 = require('@angular/core');
var AssessmentListComponent = (function () {
    function AssessmentListComponent(assessmentService) {
        var _this = this;
        this.assessmentService = assessmentService;
        assessmentService.getAssessmentList().toPromise().then(function (x) { return _this.assessments = x; });
    }
    AssessmentListComponent = __decorate([
        core_1.Component({
            template: "<div *ngFor=\"let assessment of assessments\"><a [routerLink]=\"['./assessment', assessment.Path]\">{{assessment.Name}}</a></div>",
            providers: [QuestionsService_1.AssessmentService],
        }), 
        __metadata('design:paramtypes', [QuestionsService_1.AssessmentService])
    ], AssessmentListComponent);
    return AssessmentListComponent;
}());
exports.AssessmentListComponent = AssessmentListComponent;
//# sourceMappingURL=AssessmentListComponent.js.map