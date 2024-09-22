// src/app/vitals/vitals.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServiceService} from "../api-service.service";
import {VitalModel} from "../VitalModel";

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit, OnDestroy {
  private vitalIntervalId: any;

  respiratoryRate: number = 16; // Example value
  spo2: number = 98; // Example value
  temperature: number = 36.6; // Example value
  systolic: number = 120; // Example systolic value
  diastolic: number = 80; // Example diastolic value
  pulse: number = 75; // Example value

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.fetchVitals(); // Initial fetch

    // Invoke API every 80ms
    this.vitalIntervalId = setInterval(() => {
      this.fetchVitals();
    }, 5000);
  }

  getRespiratoryRateColor(): string {
    return this.respiratoryRate >= 12 && this.respiratoryRate <= 18 ? 'green' : 'pink';
  }

  getPulseColor(): string {
    return this.pulse >= 60 && this.pulse <= 100 ? 'green' : 'pink';
  }

  getTemperatureColor(): string {
    return this.temperature >= 36 && this.temperature <= 37.5 ? 'green' : 'pink';
  }

  getBloodPressureColor(): string {
    return (this.systolic >= 90 && this.systolic <= 130) && (this.diastolic >= 50 && this.diastolic <= 90) ? 'green' : 'pink';
  }

  getSpO2Colour(): string {
    return this.spo2 >= 95 ? 'green' : 'pink';
  }

  ngOnDestroy() {
    clearInterval(this.vitalIntervalId); // Clear interval on component destruction
  }

  private fetchVitals() {
    this.apiService.getVitals().subscribe((vitalData: VitalModel) => {
      if (!vitalData) {
        clearInterval(this.vitalIntervalId);
      }
      this.respiratoryRate = vitalData.respiratoryRate;
      this.spo2 = vitalData.oxygen;
      this.systolic = vitalData.systolic;
      this.diastolic = vitalData.diastolic;
      this.pulse = vitalData.pulse;
      this.temperature = vitalData.temperature;
    });
  }
}
