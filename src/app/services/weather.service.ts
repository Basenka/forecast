import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  setData(data: any[]) {
    this.dataSubject.next(data);
  }

  getForecast() {
    return this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,uv_index_max&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,apparent_temperature,rain&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,weather_code,surface_pressure&timezone=Europe%2FLondon&past_days=7`
    );
  }

  getHistorical(start: string, end: string) {
    return this.http.get<any>(
      `https://archive-api.open-meteo.com/v1/archive?latitude=51.5085&longitude=-0.1257&start_date=${start}&end_date=${end}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,weather_code&timezone=Europe/London`
    );
  }
}
