import { Component, OnInit } from '@angular/core';
import { Report, ReportRepository } from '../../../core/domain/report/report.barrel';
import { ToastService } from '../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Visit } from '../../../core/domain/visits/visits';
import { TagModule } from 'primeng/tag';

interface Column {
  field: string;
  header: string;
}

/*

export interface Visit {
  id: number;
  reference_number: string;
  customer_name: string;
  phone_number: string;
  status: string;
  visit_date_time: string;
  total_service_time: string;
  waiting_time: number;
}
*/

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  report: Report | any;
  visits: Visit[] = [];
  cols!: Column[];

  constructor(
    private reportRepository: ReportRepository,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.subscribeToReport();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'reference_number', header: 'Reference Number' },
      { field: 'customer_name', header: 'Customer Name' },
      { field: 'phone_number', header: 'Phone Number' },
      { field: 'status', header: 'Status' },
      { field: 'visit_date_time', header: 'Visit Date Time' },
      { field: 'total_service_time', header: 'Total Service Time' },
      { field: 'waiting_time', header: 'Waiting Time' }
    ];
  }

  subscribeToReport() {
    this.reportRepository.getReport().subscribe({
      next: (report: Report | any) => {
        this.report = report;
        this.visits = report.visits;
      },
      error: (error: any) => {
        this.toastService.showError(
          'Error',
          'An error occurred while fetching the report'
        );
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'canceled':
        return 'danger';
      default:
        return 'info';
    }
  }
}
