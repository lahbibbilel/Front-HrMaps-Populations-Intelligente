import { Component, OnInit } from '@angular/core';
import Chart, {ChartOptions} from 'chart.js/auto';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {ChartStatService} from "../../services/chart-stat.service";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: any = [];


  constructor(private apiService: ApiService
  ,private chartService : ChartStatService
  ) {} // Inject the ApiService
  mostCommonPopulationName!: string;


  ngOnInit() {
    // Fetch the most common population name
    this.apiService.countMostCommonPopulationName().subscribe(name => {
      this.mostCommonPopulationName = name;

      // Update the chart with the most common population name
      this.updateChart();
    });

    this.chartService.getPopulationStats().subscribe(data => {
      const populationNames = Object.keys(data);
      const hommeData = [];
      const femmeData = [];

      for (const populationName of populationNames) {
        hommeData.push(data[populationName].Homme);
        femmeData.push(data[populationName].Femme);
      }

      this.createGroupedBarChart(populationNames, hommeData, femmeData);
    });


  }

  updateChart() {
    this.apiService.countCollaboratorsWithPopulationName().subscribe(countWith => {
      this.apiService.countCollaboratorsWithoutPopulationName().subscribe(countWithout => {
        const totalCount = countWith + countWithout;
        const percentageWith = ((countWith / totalCount) * 100).toFixed(2);
        const percentageWithout = ((countWithout / totalCount) * 100).toFixed(2);

        const chartOptions = {
          plugins: {
            title: {
              display: true,
              text: `The most common population is: ${this.mostCommonPopulationName}`,
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.formattedValue || '';
                return `${label}: ${value}%`; // Include the percentage sign here
              },
            },
          },
        };

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: ['With Population', 'Without Population'],
            datasets: [
              {
                data: [percentageWith, percentageWithout],
                backgroundColor: ['rgb(54, 162, 235)', 'rgb(169, 169, 169)'],
              },
            ],
          },
          options: chartOptions,
        });
      });
    });
  }

  createGroupedBarChart(labels: string[], hommeData: number[], femmeData: number[]) {
    new Chart('groupedBarCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'male',
            data: hommeData,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'feminine',
            data: femmeData,
            backgroundColor: 'rgb(169, 169, 169)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Set the step size to 1 to display integer values
              precision: 0, // Set the number of decimal places to 0
            },
          },
        },
      },
    });
  }

}
