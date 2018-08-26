import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class RecrutementEventService {

  // Observable string sources

  private promotionAnnouncedSource = new Subject<any>();
  private promotionConfirmedSource = new Subject<any>();

  promotionAnnounced = this.promotionAnnouncedSource.asObservable();
  promotionConfirmed = this.promotionConfirmedSource.asObservable();

  announcePromotion(itemPromotionSelected: any) {
    this.promotionAnnouncedSource.next(itemPromotionSelected);
  }

  confirmPromotion(itemPromotion: any) {
    this.promotionConfirmedSource.next(itemPromotion);
  }

  private candidatAnnouncedSource = new Subject<any>();
  private candidatConfirmedSource = new Subject<any>();

  candidatAnnounced = this.candidatAnnouncedSource.asObservable();
  candidatConfirmed = this.candidatConfirmedSource.asObservable();

  announceCandidat(itemCandidatSelected: any) {
    this.candidatAnnouncedSource.next(itemCandidatSelected);
  }

  confirmCandidat(itemCandidat: any) {
    this.candidatConfirmedSource.next(itemCandidat);
  }
}
