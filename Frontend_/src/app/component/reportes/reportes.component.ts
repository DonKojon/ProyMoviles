import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  monthlyReports: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.monthlyReports.push(
      {
        month: 'Octubre',
        year: 2023,
        income: 5000,
        expenses: 2500,
        details: [
          { description: 'Venta de pollos', amount: 3000, type: 'ingreso' },
          { description: 'Venta de bebidas', amount: 2000, type: 'ingreso' },
          { description: 'Pago a proveedores', amount: 1500, type: 'egreso' },
          { description: 'Salarios', amount: 1000, type: 'egreso' }
        ]
      },
      {
        month: 'Noviembre',
        year: 2023,
        income: 6000,
        expenses: 3000,
        details: [
          { description: 'Venta de pollos', amount: 3500, type: 'ingreso' },
          { description: 'Venta de postres', amount: 2500, type: 'ingreso' },
          { description: 'Alquiler', amount: 2000, type: 'egreso' },
          { description: 'Servicios públicos', amount: 1000, type: 'egreso' }
        ]
      },
      {
        month: 'Diciembre',
        year: 2023,
        income: 7500,
        expenses: 4000,
        details: [
          { description: 'Venta de pollos', amount: 4000, type: 'ingreso' },
          { description: 'Venta de combos', amount: 3500, type: 'ingreso' },
          { description: 'Impuestos', amount: 2500, type: 'egreso' },
          { description: 'Publicidad', amount: 1500, type: 'egreso' }
        ]
      }
    );
  }

  getBalance(income: number, expenses: number): number {
    return income - expenses;
  }
}
