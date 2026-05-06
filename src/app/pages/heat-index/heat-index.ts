import {Component, OnInit} from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-heat-index',
  imports: [
    FormsModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    CardModule,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './heat-index.html',
  styleUrl: './heat-index.css',
  standalone: true
})
export class HeatIndex{

  temperature: number | null = null;
  humidity: number | null = null;
  unit: 'C' | 'F' = 'C';

  result: number | null = null;
  error: string = '';

  units = [
    { label: 'Celsius (°C)', value: 'C' },
    { label: 'Fahrenheit (°F)', value: 'F' }
  ];

  calculate() {
    this.error = '';
    this.result = null;

    if (this.temperature == null || this.humidity == null) return;

    let tempF = this.unit === 'C'
      ? (this.temperature * 9/5) + 32
      : this.temperature;

    if (tempF < 80) {
      this.error = 'Heat Index valid only ≥ 26.7°C (80°F)';
      return;
    }

    const RH = this.humidity;
    const T = tempF;

    const HI =
      -42.379 +
      2.04901523 * T +
      10.14333127 * RH -
      0.22475541 * T * RH -
      0.00683783 * T * T -
      0.05481717 * RH * RH +
      0.00122874 * T * T * RH +
      0.00085282 * T * RH * RH -
      0.00000199 * T * T * RH * RH;

    this.result = this.unit === 'C'
      ? (HI - 32) * 5/9
      : HI;
  }
}
