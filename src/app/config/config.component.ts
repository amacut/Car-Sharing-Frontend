import { Component, OnInit } from '@angular/core';
import {Config, ConfigService} from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: Config;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data:Config) => this.config = {
          vehiclesUrl: data.vehiclesUrl,
            textFile: data.textFile
    });
  }

}
