

import {Injectable} from '@angular/core';


@Injectable()
export class Timer {

    actions: ((increment: number) => void)[];

    constructor() {
        this.actions = [];
        let intervalInMilliseconds = 1000;
        setInterval(() => this.execute(intervalInMilliseconds), intervalInMilliseconds);
    }

    private execute(seconds: number) {
        this.actions.forEach(a => a(seconds));
    }

    public subscribe(action: (increment: number) => void): boolean {
        this.actions.push(action);

        return true;
    }

    public unsubscribe(action: (increment: number) => void) {

        var index = this.actions.indexOf(action);

        if (index > -1){
            this.actions.splice(index, 1);
            return true;
        }

        return false;
    }

}


