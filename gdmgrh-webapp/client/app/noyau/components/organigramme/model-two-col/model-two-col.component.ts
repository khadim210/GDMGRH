import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'org-model-two-col',
    template: require('./model-two-col.component.html')
})

export class ModelTwoColComponent implements OnInit {
    @Input() element: any;
    @Input() selectElement: string;
    @Input() btnAction: string;
    @Input() nameElement: string;
    @Output() actionElement = new EventEmitter<any>();

    constructor() {
        this.element = {};
        this.btnAction = 'Modifier';
        this.selectElement = '';
        this.nameElement = 'element';
    }

    ngOnInit() { }

    onActionElement(element, action) {
        this.actionElement.emit({element: element, action: action, name: this.nameElement});
    }
}
