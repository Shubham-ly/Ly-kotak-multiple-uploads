import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[fileDragDrop]',
})
export class FileDragDropDirective {
  @Output() private filesChangedEmitter: EventEmitter<File[]> =
    new EventEmitter();
  @HostBinding('style.background') private background = '#f7faff';
  @HostBinding('style.border') private border = '1px dashed #1035664D';
  @HostBinding('style.border-radius') private borderRadius = '2px';

  constructor() {}

  @HostListener('dragover', ['$event']) public onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fff';
    this.border = '1px solid #1035664D';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f7faff';
    this.border = '1px dashed #1035664d';
    this.borderRadius = '2px';
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f7faff';
    this.border = '1px dashed #1035664d';
    this.borderRadius = '2px';
    let files = event.dataTransfer?.files;
    // @ts-ignore;
    let validFiles: File[] = files;
    this.filesChangedEmitter.emit(validFiles);
  }
}
