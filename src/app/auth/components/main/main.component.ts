import { Component, inject, OnInit } from '@angular/core';
import { AppConfigService } from '../../../services/app-config.service';
import {
  ClarityIcons,
  bitcoinIcon,
  printerIcon,
  popOutIcon,
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';

ClarityIcons.addIcons(bitcoinIcon, printerIcon, popOutIcon);

@Component({
  selector: 'app-main',
  imports: [ClarityModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  private appConfig = inject(AppConfigService);
  apiUrl: string = '';
  appName: string = '';

  ngOnInit() {
    this.apiUrl = this.appConfig.getConfig()?.apiUrl || 'Not Loaded';
    this.appName = this.appConfig.getConfig()?.appName || 'Not Loaded';
    console.log('API URL:', this.apiUrl, this.appName);
  }
}
