import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss'
})
export class ModalComponent {
  @Input() component!: any;
  @Input() title = 'Modal';

  constructor(private modalService: ModalService){}

  close() {
    this.modalService.close();
  }
}
