import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'picture-profile',
    template: require('./picture-profile.component.html')
})

export class PictureProfileComponent implements OnInit {
    @Input() src: any;
    @Output() uploadResponse = new EventEmitter();
    idProfilePicture = '';

    constructor() { }

    ngOnInit() { }

    selected(imageResult) {

    }
}
