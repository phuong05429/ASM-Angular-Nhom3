import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() closeModal : EventEmitter<any> = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  close() {
    this.isOpen = false;
    this.closeModal.emit()
  }
}
