import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-casenotes-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './casenotes-edit.html',
  styleUrl: './casenotes-edit.css',
})
export class CasenotesEdit implements OnInit {
  noteForm = {
    id: 1,
    caseId: 'CASE-1001',
    author: 'Dr. Smith',
    status: 'new',
    content: 'Initial assessment completed. Client shows positive response to therapy.',
    date: '2024-03-01'
  };

  statuses = ['new', 'active', 'pending', 'closed', 'urgent'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Editing note ID:', id);
  }

  saveNote() {
    console.log('Saving note:', this.noteForm);
    this.router.navigate(['/casenotes', this.noteForm.id]);
  }
}
