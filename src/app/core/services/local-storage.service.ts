import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  public setValue(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(key, value);
    }
  }

  public getValueByKey(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
    const value = localStorage.getItem(key);
    return value;
    }
    return null;
  }

  public clearKey(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAllKeys(): void {
    localStorage.clear();
  }

  public clearLocalStorage() {
    localStorage.clear();
  }
}
