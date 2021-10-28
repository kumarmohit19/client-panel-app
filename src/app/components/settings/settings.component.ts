import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings';
import { SettingsService } from 'src/app/services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private settingService: SettingsService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingService.getSettings();
  }

  onSubmit() {
    this.settingService.updateSettings(this.settings);
    this.flashMessage.show('Your settings are updated and saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
