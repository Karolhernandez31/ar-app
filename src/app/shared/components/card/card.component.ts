import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modern-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {
  @Input() icon: string = 'assets/images/default-icon.png';
  @Input() title: string = 'Título de la tarjeta';
  @Input() tags: string[] = ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'];
  @Input() isSelected: boolean = false;

  @Output() onSelect = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  // Manejo de errores en la imagen
  onImageError(event: any) {
    event.target.src = 'assets/images/default-icon.png';
  }
}
