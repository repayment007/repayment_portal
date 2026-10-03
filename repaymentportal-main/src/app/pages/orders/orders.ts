import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (res: any) => {
        this.orders = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'paid': case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'failed': case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return 'pill-active';
    }
  }
}
