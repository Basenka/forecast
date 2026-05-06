import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ChartModule } from 'primeng/chart';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './temperature-chart.html'
})
export class TemperatureChart implements OnInit {

  chartData: any;
  chartOptions: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.data$.subscribe(data => {
      this.prepareChartFromTable(data);
    });

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    };
  }

  prepareChartFromTable(data: any[]) {

    if (!data || data.length === 0) return;

    const labels = data.map(d =>
      formatDate(d.datetime, 'dd.MM HH:mm', 'en-GB')
    );

    const temps = data.map(d => d.temperature);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature °C',
          data: temps,
          tension: 0.4
        }
      ]
    };
  }
}
