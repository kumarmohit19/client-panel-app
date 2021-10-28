import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnEdit: true,
    disableBalanceOnAdd: true,
  };

  constructor() {
    if (localStorage.getItem('clientPanelSettings') != null) {
      this.settings = JSON.parse(
        localStorage.getItem('clientPanelSettings') ?? ''
      );
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  updateSettings(settings: Settings) {
    localStorage.setItem('clientPanelSettings', JSON.stringify(settings));
  }
}
