import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './orders-view.html',
  styleUrl: './orders-view.css',
})
export class OrdersView implements OnInit {
  order: any = null;
  loading: boolean = true;
  errorMsg: string = '';
  updating: boolean = false;

  statuses = ['PENDING', 'COMPLETED', 'CANCELLED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'undefined' && id !== 'null') {
      this.loadOrder(id);
    } else {
      this.errorMsg = 'Invalid or missing order ID';
      this.loading = false;
      // Optionally redirect after a delay
      setTimeout(() => this.router.navigate(['/orders']), 3000);
    }
  }

  loadOrder(id: string) {
    this.loading = true;
    this.orderService.getById(id).subscribe({
      next: (res) => {
        this.order = res.resultData || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching order', err);
        this.errorMsg = 'Failed to load order details';
        this.loading = false;
      }
    });
  }

  updateStatus(newStatus: string) {
    if (!this.order || !this.order.id) return;
    this.updating = true;
    
    this.orderService.update(this.order.id, { status: newStatus }).subscribe({
      next: (res) => {
        const updated = res.resultData || res;
        this.order.status = updated.status;
        this.updating = false;
        alert('Order status updated successfully');
      },
      error: (err) => {
        console.error('Error updating order status', err);
        alert('Failed to update order status');
        this.updating = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return '';
    const s = status.toUpperCase();
    switch (s) {
      case 'PENDING': return 'pill-pending';
      case 'COMPLETED': return 'pill-active';
      case 'CANCELLED': return 'pill-closed';
      default: return 'pill-active';
    }
  }
}
