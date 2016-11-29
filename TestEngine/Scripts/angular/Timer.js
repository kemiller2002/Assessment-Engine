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
var Timer = (function () {
    function Timer() {
        var _this = this;
        this.actions = [];
        var intervalInMilliseconds = 1000;
        setInterval(function () { return _this.execute(intervalInMilliseconds); }, intervalInMilliseconds);
    }
    Timer.prototype.execute = function (seconds) {
        this.actions.forEach(function (a) { return a(seconds); });
    };
    Timer.prototype.subscribe = function (action) {
        this.actions.push(action);
        return true;
    };
    Timer.prototype.unsubscribe = function (action) {
        var index = this.actions.indexOf(action);
        if (index > -1) {
            this.actions.splice(index, 1);
            return true;
        }
        return false;
    };
    Timer = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Timer);
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map