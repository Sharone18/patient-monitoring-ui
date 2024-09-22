import {Component, OnDestroy, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-ecg',
  templateUrl: './ecg.component.html',
  styleUrls: ['./ecg.component.css']
})
export class EcgComponent implements OnInit, OnDestroy {
  chart: Chart | undefined;
  private time: number = 0;
  private intervalId: any;
  private ecgIntervalId: any;
  data: number[] = [0];
  labels: number[] = [0];
  ecgData: number[] = [0];

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.fetchData(); // Initial fetch

    // Invoke API every 80ms
    this.ecgIntervalId = setInterval(() => {
      this.fetchData();
    }, 80);
    this.createChart();
    this.startUpdatingChart();
  }

  private fetchData(): void {
    this.apiService.getData().subscribe((ecgData: number) => {
      if (!ecgData) {
        clearInterval(this.ecgIntervalId);
      }
      this.ecgData.push(ecgData); // Store received messages
    });
  }

  createChart() {
    // const labels = Array.from({ length: 100 }, (_, i) => i); // X values (0, 0.1, ..., 9.9)
    // this.data = labels.map(x => Math.sin(x)); // Y values (sine of x)

    this.chart = new Chart('ecgWaveform', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'ECG Waveform',
          data: this.data,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: false, // Set to false to hide the x-axis label
            },
            ticks: {
              display: false // Optionally hide tick marks on x-axis
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Voltage (mV)'
            },
            ticks: {
              min: -10,
              max: 10
            }
          }]
        }
      }
    });
  }

  startUpdatingChart() {
    let index: number = 0;
    this.intervalId = setInterval(() => {
      this.time += 1; // Increment time
      const newLabel = this.time; // New label for x-axis
      const newDataPoint = this.ecgData[index] / 1000; // Calculate new y value (sine of x)
      // Shift labels and data to simulate continuous drawing
      if (this.chart) {
        this.labels.push(newLabel);
        this.data.push(newDataPoint);

        // Maintain only the last 100 data points
        if (this.data.length > 100) {
          this.labels.shift();
          this.data.shift();
        }

        this.chart.update();
        index+=1;
      }
    }, 100); // Update every 100 milliseconds
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Clear interval on component destruction
    clearInterval(this.ecgIntervalId);
  }
}
