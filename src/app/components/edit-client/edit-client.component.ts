import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private settingService: SettingsService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // get id from url
    this.id = this.route.snapshot.params['id'];

    // get client
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client != null) {
        this.client = client;
      }
    });

    // get disable value from settings service
    this.disableBalanceOnEdit =
      this.settingService.getSettings().disableBalanceOnEdit ?? true;
  }

  onSubmit({ value, valid }: NgForm) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // add id to client
      value.id = this.id;
      // update client
      this.clientService.updateClient(value);
      // show message
      this.flashMessage.show('Client updated succesfully', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
