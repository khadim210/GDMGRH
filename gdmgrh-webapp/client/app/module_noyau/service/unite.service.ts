import { Injectable } from '@angular/core';
import { apiUrl } from '../../app.constants';

@Injectable()
export class UniteService {

    // URL vers le server api
    private serverUrl = `${apiUrl}`;

    constructor() { }

}
