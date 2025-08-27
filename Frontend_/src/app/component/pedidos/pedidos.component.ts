import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  orders: any[] = [];
  pendingOrders: any[] = [];
  deliveredOrders: any[] = [];
  cancelledOrders: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Datos de pedidos de ejemplo
    this.orders.push(
      { id: 1, productName: 'Pechuga de Pollo', quantity: 2, price: 11.00, status: 'pending' },
      { id: 2, productName: 'Patatas Fritas', quantity: 5, price: 10.00, status: 'delivered' },
      { id: 3, productName: 'Refresco Cola', quantity: 3, price: 6.00, status: 'pending' },
      { id: 4, productName: 'Pan de Hamburguesa', quantity: 10, price: 8.00, status: 'cancelled' },
      { id: 5, productName: 'Salsa de Tomate', quantity: 1, price: 3.50, status: 'delivered' },
    );

    this.filterOrdersByStatus();
  }

  filterOrdersByStatus(): void {
    this.pendingOrders = this.orders.filter(order => order.status === 'pending');
    this.deliveredOrders = this.orders.filter(order => order.status === 'delivered');
    this.cancelledOrders = this.orders.filter(order => order.status === 'cancelled');
  }
}
