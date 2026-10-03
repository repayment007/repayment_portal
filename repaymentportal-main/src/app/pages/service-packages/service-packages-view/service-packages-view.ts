import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-packages-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-packages-view.html',
  styleUrl: './service-packages-view.css',
})
export class ServicePackagesView implements OnInit {
  package = {
    id: 1,
    name: 'Basic Support',
    price: 49.99,
    description: 'Essential support services for individuals. This package includes access to basic documentation, community forums, and email support with a 48-hour response time.',
    status: 'active'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Viewing package ID:', id);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'inactive': return 'pill-closed';
      default: return '';
    }
  }
}
