import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [disabled]="disabled"
      class="btn"
      type="{{ type }}"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 10px;
      border: 0;
      font-weight: 600;
      color: #ffffff;
      background: #2563EB;
      box-shadow: 0 6px 14px rgba(37, 99, 235, 0.25);
      cursor: pointer;
      transition: transform .08s ease, box-shadow .2s ease, background .2s ease, opacity .2s ease;
    }
    .btn:hover:not(:disabled) {
      background: #1e4fc1;
      box-shadow: 0 8px 18px rgba(30, 79, 193, 0.35);
      transform: translateY(-1px);
    }
    .btn:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 4px 10px rgba(30,79,193,0.3);
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
}
