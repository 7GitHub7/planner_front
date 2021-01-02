import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';

const STORAGE_KEY = 'local_user';

@Injectable()
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  private missionAnnouncedSource = new Subject<number>();
  private logoutAnnoucedSource = new Subject<number>();

  loginAnnounced$ = this.missionAnnouncedSource.asObservable();
  logoutAnnounced$ = this.logoutAnnoucedSource.asObservable();

  announceLogin(mission: number) {
    this.missionAnnouncedSource.next(mission);
    this.storage.set(STORAGE_KEY, mission);
  }

  announceLogout() {
    this.logoutAnnoucedSource.next(null);
    this.storage.remove(STORAGE_KEY);
  }

  // public storeOnLocalStorage(userId: number): void {
  //   let currentUser = this.storage.get(STORAGE_KEY) || [];
  //   currentUser = userId;
  //   this.storage.set(STORAGE_KEY, currentUser);
  //   console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  // }

  public getUserIdFromLocalStorage(): number {
    return this.storage.get(STORAGE_KEY);
  }
}
