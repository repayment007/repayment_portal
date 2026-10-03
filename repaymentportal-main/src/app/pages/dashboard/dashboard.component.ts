import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  greeting = 'Good morning, Admin 🌿';
  
  stats = [
    { label: 'Active Cases', value: '124', change: '↑ 12%', icon: 'cases', color: 'c1' },
    { label: 'Consultations', value: '42', change: '↑ 8%', icon: 'consultations', color: 'c2' },
    { label: 'New Orders', value: '15', change: '↑ 24%', icon: 'orders', color: 'c3' },
    { label: 'Total Users', value: '1,284', change: '↑ 5%', icon: 'users', color: 'c4' }
  ];

  recentActivities = [
    { msg: 'New case #4298 opened for <strong>John Doe</strong>.', time: '10:32 AM', color: 'green' },
    { msg: 'Consultation scheduled with <strong>Dr. Smith</strong>.', time: '09:14 AM', color: 'blue' },
    { msg: 'Order #ORD-772 paid successfully.', time: 'Yesterday, 4:50 PM', color: 'gold' },
    { msg: 'New testimonial received from <strong>Sarah J.</strong>', time: 'Yesterday, 2:10 PM', color: 'purple' }
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good morning, Admin 🌿';
    else if (hour < 17) this.greeting = 'Good afternoon, Admin ☀️';
    else this.greeting = 'Good evening, Admin 🌙';
  }
}
