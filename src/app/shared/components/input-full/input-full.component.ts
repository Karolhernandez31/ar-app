import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-full',
  templateUrl: './input-full.component.html',
  styleUrls: ['./input-full.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFullComponent),
      multi: true
    }
  ]
})
export class InputFullComponent implements OnInit, ControlValueAccessor {
  @Input() form!: FormGroup;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() fieldName: string = '';
  @Input() readonly: boolean = false;

  value: string = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    const value = event.detail.value;
    this.value = value;
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }

  constructor() {}

  ngOnInit() {}

  isFieldInvalid(): boolean {
    const field = this.form.get(this.fieldName);
    return field ? field.invalid && (field.touched || field.dirty) : false;
  }

  getErrorMessage(): string {
    const field = this.form.get(this.fieldName);

    if (!field || !field.errors || !(field.touched || field.dirty)) return '';

    const errors = field.errors;

    if (errors['required']) return "El Campo es obligatorio";
    if (errors['minlength'])
      return `Minimo, ${errors['minlength'].requiredLength }`;
    if (errors['email']) return "Email no es valido";

    return 'Campo inválido';
  }
}
