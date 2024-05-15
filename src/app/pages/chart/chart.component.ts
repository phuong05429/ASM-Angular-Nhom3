import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./chart.component.scss'],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    this.createChart();
  }
  @ViewChild('checkinChart', { static: true }) checkinChart: ElementRef<HTMLCanvasElement>;

  createChart(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('checkinChart');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const labels = ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN'];
      const datasets = [
        { label: 'Thuê ngày', data: [2, 3, 8, 14, 12, 20, 4], color: 'rgba(54, 162, 235, 0.6)' },
        { label: 'Qua đêm', data: [0, 10, 0, 1, 2, 0, 1], color: 'rgba(75, 192, 192, 0.6)' },
        { label: 'Thuê giờ', data: [0, 0, 0, 0, 0, 0, 0], color: 'rgba(153, 102, 255, 0.6)' }
      ];

      const chartHeight = 300;
      const chartWidth = 700;
      const padding = 50;
      const maxValue = Math.max(...datasets.reduce((acc, dataset) => acc.concat(dataset.data), [])); // Alternative to flatMap

      // Set canvas size
      canvas.width = chartWidth + 2 * padding;
      canvas.height = chartHeight + 2 * padding;

      // Draw X and Y axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, chartHeight + padding);
      ctx.lineTo(chartWidth + padding, chartHeight + padding);
      ctx.stroke();

      // Draw Y axis labels and grid lines
      const yStep = chartHeight / maxValue;
      const yAxisStep = 5; 
      for (let i = 0; i <= maxValue;  i+= yAxisStep) {
        const y = chartHeight + padding - i * yStep;
        ctx.fillText(i.toString(), padding - 20, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(chartWidth + padding, y);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
      }

      // Draw X axis labels
      const xStep = chartWidth / labels.length;
      labels.forEach((label, i) => {
        const x = padding + i * xStep + xStep / 2;
        ctx.fillText(label, x - 10, chartHeight + padding + 20);
      });

      // Draw bars
      datasets.forEach((dataset, datasetIndex) => {
        ctx.fillStyle = dataset.color;
        dataset.data.forEach((value, i) => {
          const x = padding + i * xStep + datasetIndex * (xStep / datasets.length);
          const y = chartHeight + padding - value * yStep;
          const barWidth = xStep / datasets.length - 10;
          ctx.fillRect(x, y, barWidth, value * yStep);
        });
      });
    }
  }

  updateChart(): void {
    // Logic to update the chart based on selected time range
    // This function can be implemented to fetch new data and update the chart accordingly
  }
  ngOnInit(): void { }
}
