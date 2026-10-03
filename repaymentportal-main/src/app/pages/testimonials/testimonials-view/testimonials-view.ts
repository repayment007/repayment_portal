import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TestimonialService } from '../../../services/testimonial';

@Component({
  selector: 'app-testimonials-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './testimonials-view.html',
  styleUrl: './testimonials-view.css',
})
export class TestimonialsView implements OnInit {
  testimonial: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTestimonial(id);
    }
  }

  loadTestimonial(id: string) {
    this.loading = true;
    this.testimonialService.getById(id).subscribe({
      next: (res: any) => {
        this.testimonial = res.resultData || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching testimonial', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(approved: boolean) {
    return approved ? 'pill-active' : 'pill-pending';
  }
}
