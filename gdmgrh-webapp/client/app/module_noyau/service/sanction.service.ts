import { Injectable } from '@angular/core';
import { apiUrl } from '../../app.constants';

@Injectable()
export class SanctionService {

    //URL vers le server api
    private serverUrl = `${apiUrl}`;

    constructor() { }
}
