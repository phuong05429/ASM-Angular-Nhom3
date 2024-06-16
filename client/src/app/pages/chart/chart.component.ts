import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CheckInService } from 'app/@core/services/apis/checkin.service';

@Component({
  selector: 'ngx-chart',
  styleUrls: ['./chart.component.scss'],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit {
  roomTypeStatistics: any[] = [];
  rentalTypeStatistics: any[] = [];
  selectedStatisticsType: string = 'roomType';
  settingsFormObject: any = [];

  @ViewChild('checkinChart', { static: true })
  checkinChart: ElementRef<HTMLCanvasElement>;

  constructor(private checkinService: CheckInService) {}

  ngOnInit() {
    const listRoomType = localStorage.getItem('listRoomType');
    this.settingsFormObject = JSON.parse(listRoomType);
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadStatistics(): void {
    if (this.selectedStatisticsType === 'roomType') {
      this.checkinService.getStatisticsByRoomType().subscribe({
        next: (data) => {
          console.log(data);
          
          this.roomTypeStatistics = data.map((i) => ({
            ...i,
            roomName: this.settingsFormObject?.filter(
              (ob) => ob.value == i.roomType
            )?.[0]?.type,
          }));
          this.createChart();
        },
        error: (err) => {
          console.error('Có lỗi xảy ra khi tải thống kê loại phòng', err);
        },
      });
    } else {
      this.checkinService.getStatisticsByRentalType().subscribe({
        next: (data) => {
          this.rentalTypeStatistics = data;
          this.createChart();
        },
        error: (err) => {
          console.error('Có lỗi xảy ra khi tải thống kê loại thuê', err);
        },
      });
    }
  }

  createChart(): void {
    const canvas = this.checkinChart.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      let labels, data;
      const colors = [
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(0, 128, 128, 0.6)',
      ];

      if (this.selectedStatisticsType === 'roomType') {

        labels = this.roomTypeStatistics.map(
          (stat) =>
            this.settingsFormObject.filter(
              (ob) => ob.value == stat.roomType
            )?.[0]?.type
        );
        data = this.roomTypeStatistics.map((stat) => stat.totalRooms);
      } else {
        labels = this.rentalTypeStatistics.map((stat) =>
          stat.times == 'hour' ? 'Giờ' : 'Qua đêm'
        );
        data = this.rentalTypeStatistics.map((stat) => stat.totalRooms);
      }

      const chartHeight = 300;
      const chartWidth = 700;
      const padding = 50;
      const maxValue = Math.max(...data);

      // Set canvas size
      canvas.width = chartWidth + 2 * padding;
      canvas.height = chartHeight + 2 * padding + 50; // Increased height to make room for labels

      // Draw X and Y axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, chartHeight + padding);
      ctx.lineTo(chartWidth + padding, chartHeight + padding);
      ctx.stroke();

      // Draw Y axis labels and grid lines
      const yStep = chartHeight / maxValue;
      const yAxisStep = Math.ceil(maxValue / 10);
      for (let i = 0; i <= maxValue; i += yAxisStep) {
        const y = chartHeight + padding - i * yStep;
        ctx.font = 'bold 12px Arial'; // Set font to bold and larger size
        ctx.fillText(i.toString(), padding - 20, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(chartWidth + padding, y);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
      }

      // Draw X axis labels and bars
      const xStep = chartWidth / labels.length;
      labels.forEach((label, i) => {
        const x = padding + i * xStep + xStep / 2;

        // Draw labels under the bars
        ctx.font = 'bold 14px Arial'; // Set font to bold and larger size
        ctx.fillStyle = 'black';
        ctx.fillText(label, x - 10, chartHeight + padding + 30);

        // Draw bars
        const barHeight = data[i] * yStep;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x - 20, chartHeight + padding - barHeight, 40, barHeight);
      });
    }
  }

  onStatisticsTypeChange(event: any): void {
    this.selectedStatisticsType = event.target.value;
    this.loadStatistics();
  }

  updateChart(): void {
    this.loadStatistics();
  }
}
