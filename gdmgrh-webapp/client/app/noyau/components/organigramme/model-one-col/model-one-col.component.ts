import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'org-model-one-col',
    template: require('./model-one-col.component.html')
})

export class ModelOneColComponent implements OnInit {

    @Input() element: any;
    @Input() selectElement: string;
    @Input() btnAction: string;
    @Input() nameElement: string;
    @Output() actionElement = new EventEmitter<any>();

    actionName: string;

    constructor() {
        this.element = {};
        this.btnAction = 'Modifier';
        this.selectElement = '';
        this.nameElement = 'element';
        this.actionName = '';
    }

    ngOnInit() { }

    btnName(name) {
        this.actionName = name;
        console.log(name);
        console.log(this.actionName);
    }

    onActionElement(element, action) {
        this.actionElement.emit({element: element, action: action, name: this.nameElement});
    }
}
