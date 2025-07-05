import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalComponentSubject = new BehaviorSubject<any>(null);
  private modalTitleSubject = new BehaviorSubject<string>('Details');

  modalComponent$ = this.modalComponentSubject.asObservable();
  modalTitle$ = this.modalTitleSubject.asObservable();

  open(component: any, title: string = 'Details') {
    // even if modal was open before, reset it first to trigger new component mount
    this.modalComponentSubject.next(null);
    setTimeout(() => {
      this.modalComponentSubject.next(component);
      this.modalTitleSubject.next(title);
    });
  }

  close() {
    this.modalComponentSubject.next(null);
  }
}