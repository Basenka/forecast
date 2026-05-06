import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

import { WeatherTable } from './pages/weather-table/weather-table';
import { TemperatureChart } from './pages/temperature-chart/temperature-chart';
import { HeatIndex } from './pages/heat-index/heat-index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TabsModule,
    WeatherTable,
    TemperatureChart,
    HeatIndex
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
