import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {DatePipe, formatDate, NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import { DatePicker } from 'primeng/datepicker';
import {dt} from '@primeuix/themes';

@Component({
  selector: 'app-weather-table',
  imports: [
    TableModule,
    InputTextModule,
    NgClass,
    DatePipe,
    FormsModule,
    Button,
    NgForOf,
    Checkbox,
    DatePicker
  ],
  templateUrl: './weather-table.html',
  styleUrl: './weather-table.css',
  standalone: true
})
export class WeatherTable implements OnInit {
  data: any[] = [];
  dateRange: Date[] = [];
  today = new Date();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadForecast();
  }

  mapData(res: any) {
    const now = new Date();

    return res.hourly.time.map((time: string, i: number) => {

      const date = new Date(time);

      return {
        weather: this.getWeatherLabel(res.hourly.weather_code[i]),
        datetime: date,
        temperature: res.hourly.temperature_2m[i],
        humidity: res.hourly.relative_humidity_2m[i],
        pressure: res.hourly.surface_pressure[i],
        type: date.getTime() < now.getTime() ? 'historical' : 'forecast'
      };
    });
  }

  getWeatherLabel(code: number): string {

    if (code === 0) return '☀️ Clear sky';

    if ([1, 2, 3].includes(code)) return '⛅ Cloudy';

    if ([45, 48].includes(code)) return '🌫️ Fog';

    if ([51, 53, 55].includes(code)) return '🌦️ Drizzle';

    if ([56, 57].includes(code)) return '🥶 Freezing Drizzle';

    if ([61, 63, 65].includes(code)) return '🌧️ Rain';

    if ([66, 67].includes(code)) return '🌧️ Freezing Rain';

    if ([71, 73, 75].includes(code)) return '❄️ Snow';

    if (code === 77) return '🌨️ Snow grains';

    if ([80, 81, 82].includes(code)) return '🌦️ Showers';

    if ([85, 86].includes(code)) return '🌨️ Snow showers';

    if (code === 95) return '⛈️ Thunderstorm';

    if ([96, 99].includes(code)) return '⛈️ Thunderstorm with hail';

    return '❓ Unknown';
  }

  clear(table: any) {
    table.clear();
  }

  loadForecast() {
    this.weatherService.getForecast().subscribe(res => {
      this.data = this.mapData(res);
      this.weatherService.setData(this.data);
    });
  }

  loadHistorical() {

    if (!this.dateRange || this.dateRange.length < 2) return;

    const start = formatDate(this.dateRange[0], 'yyyy-MM-dd', 'en-GB');
    const end   = formatDate(this.dateRange[1], 'yyyy-MM-dd', 'en-GB');

    this.weatherService.getHistorical(start, end)
      .subscribe(res => {
        this.data = this.mapData(res);
        this.weatherService.setData(this.data);
      });
  }

  onDateChange(value: Date[]) {
    if (!value || value.length < 2) return;

    this.loadHistorical();

  }

  clearDateRange() {
    this.dateRange = [];
    this.loadForecast();
  }

  protected readonly dt = dt;
}
