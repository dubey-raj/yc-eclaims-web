import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private eventSubject = new BehaviorSubject<{ eventName: string, payload?: any } | null>(null);

  //Publish an event
  broadcast(eventName: string, payload?: any) {
    this.eventSubject.next({ eventName: eventName, payload: payload });
  }

  on(eventName: string): Observable<any> {
    return this.eventSubject.asObservable().pipe(
      filter(event => event?.eventName === eventName),
      map(evt => evt!.payload)
    );
  }
}
