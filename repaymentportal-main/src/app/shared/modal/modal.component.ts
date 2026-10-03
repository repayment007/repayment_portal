import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="show" (click)="close()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="modal-close" (click)="close()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer" *ngIf="showFooter">
          <button class="btn-ol" (click)="close()">Close</button>
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-card {
      background: var(--surface);
      width: 90%;
      max-width: 500px;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      border: 1px solid var(--border);
      overflow: hidden;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: var(--text);
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .modal-close:hover {
      background: var(--bg-hover);
      color: var(--text);
    }

    .modal-close svg {
      width: 20px;
      height: 20px;
    }

    .modal-body {
      padding: 24px;
      max-height: 70vh;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      background: var(--bg-hover);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { 
      from { opacity: 0; transform: translateY(20px) scale(0.95); } 
      to { opacity: 1; transform: translateY(0) scale(1); } 
    }
  `]
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = 'Notification Details';
  @Input() showFooter = true;
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.show = false;
    this.onClose.emit();
  }
}
