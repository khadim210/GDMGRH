import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-found',
    template: require('./404.component.html')
})
export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
