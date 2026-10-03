import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseNoteService } from '../../../services/case-note';

@Component({
  selector: 'app-casenotes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './casenotes-list.html',
  styleUrl: './casenotes-list.css',
})
export class CasenotesList implements OnInit {
  notes: any[] = [];
  loading = true;

  constructor(private caseNoteService: CaseNoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.loading = true;
    this.caseNoteService.getAll().subscribe({
      next: (res: any) => {
        this.notes = res.resultData || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching case notes', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string) {
    if (!status) return 'pill-active';
    switch (status.toLowerCase()) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return 'pill-active';
    }
  }

  deleteNote(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.caseNoteService.delete(id).subscribe(() => {
        this.loadNotes();
      });
    }
  }
}
