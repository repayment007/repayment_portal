import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cases-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cases-edit.html',
  styleUrl: './cases-edit.css',
})
export class CasesEdit implements OnInit {
  caseForm = {
    id: 1,
    caseNumber: 'CASE-1001',
    clientName: 'Alice Johnson',
    type: 'Legal',
    status: 'active',
    openedDate: '2024-01-10',
    description: 'Initial legal consultation and documentation for the client.'
  };

  caseTypes = ['Legal', 'Health', 'Financial', 'Social', 'Employment'];
  caseStatuses = ['active', 'pending', 'closed'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // In a real app, you would get the ID and fetch the data
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Editing case ID:', id);
  }

  saveCase() {
    console.log('Saving case:', this.caseForm);
    this.router.navigate(['/cases', this.caseForm.id]);
  }
}
