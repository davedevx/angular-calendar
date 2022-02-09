import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, SharedModule, HttpClientModule],
  providers: [WeatherService],
})
export class WeatherModule {}
