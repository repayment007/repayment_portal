import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  notifications: any[] = [];
  loading = true;
  selectedNotification: any = null;
  isModalOpen = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.notificationService.getMyNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notifications', err);
        this.loading = false;
      }
    });
  }

  viewNotification(notif: any) {
    this.selectedNotification = notif;
    this.isModalOpen = true;
    
    if (!notif.read) {
      this.notificationService.markAsRead(notif._id).subscribe({
        next: () => {
          notif.read = true;
        }
      });
    }
  }

  onModalClose() {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }

  getStatusClass(status: string) {
    if (!status) return 'pill-active';
    switch (status.toLowerCase()) {
      case 'active': case 'sent': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'failed': case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return 'pill-active';
    }
  }
}
