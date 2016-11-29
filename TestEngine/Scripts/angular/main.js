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
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require('@angular/http');
var QuestionsService_1 = require("./QuestionsService");
var Question_1 = require("./Question");
var router_1 = require("@angular/router");
var Assessment_1 = require('./Assessment');
var AssessmentListComponent_1 = require('./AssessmentListComponent');
var forms_1 = require('@angular/forms');
var QuestionDetailComponent_1 = require("./QuestionDetailComponent");
var Results_1 = require("./Results");
var Timer_1 = require("./Timer");
exports.ROUTER_DIRECTIVES = [router_1.RouterOutlet, router_1.RouterLink, router_1.RouterLinkWithHref,
    router_1.RouterLinkActive];
var TestTaker = (function () {
    function TestTaker() {
        //this.assessmentService.getAssessment().toPromise().then(x => alert(x)).catch(x => alert(x));
    }
    TestTaker = __decorate([
        core_1.Component({
            selector: 'test-taker',
            template: "<a [routerLink]=\"['./']\">Assessment List</a>\n                    <br/><br/>\n                    <router-outlet></router-outlet>\n                ",
            providers: [QuestionsService_1.AssessmentService, Question_1.Assessment, Timer_1.Timer]
        }), 
        __metadata('design:paramtypes', [])
    ], TestTaker);
    return TestTaker;
}());
var routes = [
    { path: '', component: AssessmentListComponent_1.AssessmentListComponent },
    { path: 'assessment/:id', component: Assessment_1.AssessmentComponent },
    { path: 'assessment/:id/Results', component: Results_1.ResultsComponent },
    { path: 'assessment/:id/Results/:section/:number', component: QuestionDetailComponent_1.QuestionDetailComponent }
];
var TestTakerAppModule = (function () {
    function TestTakerAppModule() {
    }
    TestTakerAppModule = __decorate([
        core_1.NgModule({
            declarations: [TestTaker, Assessment_1.AssessmentComponent, AssessmentListComponent_1.AssessmentListComponent, QuestionDetailComponent_1.QuestionDetailComponent, Results_1.ResultsComponent],
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes), forms_1.FormsModule],
            bootstrap: [TestTaker]
        }), 
        __metadata('design:paramtypes', [])
    ], TestTakerAppModule);
    return TestTakerAppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(TestTakerAppModule);
//# sourceMappingURL=main.js.map