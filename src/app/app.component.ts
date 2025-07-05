import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './core/services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './shared/app-modal/app-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yc-eclaims-web';
  modalComponent: any;
  modalTitle = '';
  
  constructor(private modalService: ModalService) {
    this.modalService.modalComponent$.subscribe(component => {
      this.modalComponent = component;
    });
    this.modalService.modalTitle$.subscribe(title => {
      this.modalTitle = title;
    });
  }
}
