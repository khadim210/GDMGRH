import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'selector-search',
    template: require('./search.component.html')
})

export class SearchComponent implements OnInit {

    @Input() table: object[];
    @Input() filterOption: string[];
    @Output() tableFound = new EventEmitter<any>();
    searchFound: any;
    searchOption: string;
    searchForm: string;

    constructor() {
        this.table = [{}];
        this.filterOption = [''];
        this.searchFound = [];
        this.searchOption = '';
        this.searchForm = '';
    }

    ngOnInit() { }

    optionSelected(option = '') {
        this.searchOption = option;
    }

    searchHandler(input = '') {
        var _table = this.table;
        this.searchFound = [];
        input = input.toUpperCase();
        this.filterTable(_table, `${input}`);
        if (input === '') {
            this.searchFound = this.table;
        }
        this.tableFound.emit(this.searchFound);
    }

    filterTable(table = [], input) {
        if (table.length) {
            if (this.searchOption) {
                for (let index = 0; index < table.length; index++) {
                    if (this.matchString((table[index][`${this.searchOption}`]).toUpperCase(), input)) {
                    this.searchFound.push(table[index]);
                    }
                }
            }
        }
    }

    matchString(string1, string2) {
        if (RegExp(string2).test(string1.toString())) {
            return true;
        }
        return false;
    }
}
