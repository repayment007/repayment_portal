import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-casenotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './casenotes.html',
  styleUrl: './casenotes.css',
})
export class Casenotes {
  viewMode: 'list' | 'form' | 'view' = 'list';
  selectedNote: any = null;
  
  noteForm = {
    caseId: '',
    author: '',
    content: '',
    status: 'new'
  };

  notes = [
    { id: 1, caseId: 'CASE-1001', author: 'Dr. Smith', content: 'Initial assessment completed. Client shows positive response to therapy.', status: 'new', date: '2024-03-01' },
    { id: 2, caseId: 'CASE-1002', author: 'Nurse Kelly', content: 'Patient showed significant improvement in mobility after physiotherapy session.', status: 'active', date: '2024-03-02' },
    { id: 3, caseId: 'CASE-1001', author: 'Dr. Smith', content: 'Follow-up scheduled for next week to review progress.', status: 'pending', date: '2024-03-03' },
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'active': return 'pill-active';
      case 'pending': return 'pill-pending';
      case 'closed': return 'pill-closed';
      case 'urgent': return 'pill-urgent';
      case 'new': return 'pill-new';
      default: return '';
    }
  }

  showCreateForm() {
    this.selectedNote = null;
    this.noteForm = { caseId: '', author: '', content: '', status: 'new' };
    this.viewMode = 'form';
  }

  showEditForm(note: any) {
    this.selectedNote = note;
    this.noteForm = { ...note };
    this.viewMode = 'form';
  }

  viewNote(note: any) {
    this.selectedNote = note;
    this.viewMode = 'view';
  }

  saveNote() {
    if (this.selectedNote) {
      // Update
      const index = this.notes.findIndex(n => n.id === this.selectedNote.id);
      this.notes[index] = { ...this.selectedNote, ...this.noteForm };
    } else {
      // Create
      const newNote = {
        ...this.noteForm,
        id: this.notes.length + 1,
        date: new Date().toISOString().split('T')[0]
      };
      this.notes.unshift(newNote);
    }
    this.goBack();
  }

  deleteNote(id: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notes = this.notes.filter(n => n.id !== id);
    }
  }

  goBack() {
    this.viewMode = 'list';
    this.selectedNote = null;
  }
}
