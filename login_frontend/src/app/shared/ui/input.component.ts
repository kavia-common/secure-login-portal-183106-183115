import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  viewProviders: [{ provide: ControlContainer, useExisting: ControlContainer }],
  template: `
    <label class="label">{{ label }}</label>
    <input
      [type]="type"
      [placeholder]="placeholder"
      class="input"
      [formControl]="control"
      [attr.autocomplete]="autocomplete"
    />
    <div class="error" *ngIf="control?.invalid && (control?.dirty || control?.touched)">
      {{ errorText }}
    </div>
  `,
  styles: [`
    .label {
      display: block;
      font-size: 0.9rem;
      color: #111827;
      margin-bottom: 6px;
      font-weight: 600;
    }
    .input {
      width: 100%;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      background: #ffffff;
      color: #111827;
      outline: none;
      transition: border-color .2s ease, box-shadow .2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .input:focus {
      border-color: #2563EB;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
    }
    .error {
      margin-top: 6px;
      color: #EF4444;
      font-size: 0.85rem;
    }
  `]
})
export class InputComponent {
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() errorText = 'This field is required';
  @Input() control!: FormControl;
  @Input() autocomplete: string | null = null;
}
