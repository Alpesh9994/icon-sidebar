import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-analyzer-dashboard',
  templateUrl: './analyzer-dashboard.component.html',
  styleUrls: ['./analyzer-dashboard.component.css']
})
export class AnalyzerDashboardComponent implements OnInit, AfterViewInit {

  charts: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCharts();
  }

  @HostListener('window:resize')
  onResize() {
    this.charts.forEach(chart => {
      chart.resize();
    });
  }

  initCharts() {
    this.createDoughnutCharts();
    this.createBarCharts();
  }

  createDoughnutCharts() {
    const colors = ['#4A6CF7', '#00C9A7', '#FF6F61'];

    for (let i = 1; i <= 3; i++) {
      const chart = new Chart(`doughnut${i}`, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [65, 35],
            backgroundColor: [colors[i-1], '#E9ECEF'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 75,
          legend: { display: false }
        }
      });

      this.charts.push(chart);
    }
  }

  createBarCharts() {

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: { display: false },
          barPercentage: 0.5,
          categoryPercentage: 0.5
        }],
        yAxes: [{
          ticks: { beginAtZero: true },
          gridLines: { color: '#F0F2F5' }
        }]
      }
    };

    const chart1 = new Chart('barChart1', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [120, 190, 150, 220, 180, 250],
          backgroundColor: '#4A6CF7'
        }]
      },
      options: commonOptions
    });

    const chart2 = new Chart('barChart2', {
      type: 'bar',
      data: {
        labels: ['Analyzer A', 'Analyzer B', 'Analyzer C', 'Analyzer D'],
        datasets: [{
          data: [80, 140, 110, 170],
          backgroundColor: '#00C9A7'
        }]
      },
      options: commonOptions
    });

    this.charts.push(chart1, chart2);
  }

  
}
