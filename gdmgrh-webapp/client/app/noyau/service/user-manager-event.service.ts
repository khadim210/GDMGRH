import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class UserManagerEventService {

  // Observable string sources
  private groupeAnnouncedSource = new Subject<any>();
  private groupeConfirmedSource = new Subject<any>();

  private userAnnouncedSource = new Subject<any>();
  private userConfirmedSource = new Subject<any>();

  // Observable streams
  groupeAnnounced = this.groupeAnnouncedSource.asObservable();
  groupeConfirmed = this.groupeConfirmedSource.asObservable();

  userAnnounced = this.userAnnouncedSource.asObservable();
  userConfirmed = this.userConfirmedSource.asObservable();

  announceGroupe(itemGroupeSelected: any) {
    this.groupeAnnouncedSource.next(itemGroupeSelected);
  }

  confirmGroupe(itemGroupe: any) {
    this.groupeConfirmedSource.next(itemGroupe);
  }

  announceUser(itemUserSelected: any) {
    this.userAnnouncedSource.next(itemUserSelected);
  }

  confirmUser(itemUser: any) {
    this.userConfirmedSource.next(itemUser);
  }
}
