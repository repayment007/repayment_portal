import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-casenotes-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './casenotes-create.html',
  styleUrl: './casenotes-create.css',
})
export class CasenotesCreate implements OnInit {
  noteForm = {
    caseId: '',
    author: '',
    status: 'new',
    content: '',
    date: new Date().toISOString().split('T')[0]
  };

  statuses = ['new', 'active', 'pending', 'closed', 'urgent'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['caseId']) {
        this.noteForm.caseId = params['caseId'];
      }
    });
  }

  saveNote() {
    console.log('Saving note:', this.noteForm);
    this.router.navigate(['/casenotes']);
  }
}
