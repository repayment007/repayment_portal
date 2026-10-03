import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { ModalComponent } from '../modal/modal.component';
import { Subscription, interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModalComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle = 'Dashboard';
  @Output() toggleSidebar = new EventEmitter<void>();

  user: any = null;
  notifications: any[] = [];
  unreadCount = 0;
  selectedNotification: any = null;
  isModalOpen = false;

  isProfileOpen = signal(false);
  isNotifOpen = signal(false);
  isMobSearchOpen = signal(false);
  isDark = signal(false);

  private notifSubscription?: Subscription;

  constructor(
    public router: Router, 
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    // Poll for notifications every 60 seconds
    this.notifSubscription = interval(60000).pipe(
      startWith(0),
      switchMap(() => this.notificationService.getUnreadCount())
    ).subscribe({
      next: (res) => {
        this.unreadCount = res.count;
        if (this.isNotifOpen()) {
          this.loadNotifications();
        }
      }
    });
  }

  ngOnDestroy() {
    this.notifSubscription?.unsubscribe();
  }

  loadNotifications() {
    this.notificationService.getMyNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.resultData || [];
      }
    });
  }

  toggleDropdown(type: 'profile' | 'notif' | 'search') {
    if (type === 'profile') {
      this.isProfileOpen.set(!this.isProfileOpen());
      this.isNotifOpen.set(false);
      this.isMobSearchOpen.set(false);
    } else if (type === 'notif') {
      const targetState = !this.isNotifOpen();
      this.isNotifOpen.set(targetState);
      if (targetState) {
        this.loadNotifications();
      }
      this.isProfileOpen.set(false);
      this.isMobSearchOpen.set(false);
    } else if (type === 'search') {
      this.isMobSearchOpen.set(!this.isMobSearchOpen());
      this.isProfileOpen.set(false);
      this.isNotifOpen.set(false);
    }
  }

  openNotification(notif: any) {
    this.selectedNotification = notif;
    this.isModalOpen = true;
    this.isNotifOpen.set(false);

    if (!notif.read) {
      this.notificationService.markAsRead(notif._id).subscribe({
        next: () => {
          notif.read = true;
          this.refreshUnreadCount();
        }
      });
    }
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.read = true);
        this.refreshUnreadCount();
      }
    });
  }

  refreshUnreadCount() {
    this.notificationService.getUnreadCount().subscribe(res => {
      this.unreadCount = res.count;
    });
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
    document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onModalClose() {
    this.isModalOpen = false;
    this.selectedNotification = null;
  }
}
