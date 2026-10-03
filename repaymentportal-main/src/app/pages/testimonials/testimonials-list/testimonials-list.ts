import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TestimonialService } from '../../../services/testimonial';

@Component({
  selector: 'app-testimonials-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './testimonials-list.html',
  styleUrl: './testimonials-list.css'
})
export class TestimonialsList implements OnInit {
  testimonials: any[] = [];
  loading = true;

  constructor(public router: Router, private testimonialService: TestimonialService) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.loading = true;
    this.testimonialService.getAll().subscribe({
      next: (res: any) => {
        this.testimonials = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching testimonials', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(approved: boolean) {
    return approved ? 'pill-active' : 'pill-pending';
  }

  deleteTestimonial(id: string) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialService.delete(id).subscribe({
        next: () => this.loadTestimonials(),
        error: (err) => console.error('Error deleting testimonial', err)
      });
    }
  }
}
