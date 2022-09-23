import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const allowedFileTypes = ['png', 'jpg', 'jpeg', 'pdf'];
const FILE_SIZE_LIMIT = 5e6; // In bytes 5 MB

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Output() private onFileChange: EventEmitter<File[]> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onFilesChanged(data: any) {
    let files = [];
    if (data.files) {
      files = [...data.files].filter(
        (file: File) => file.size <= FILE_SIZE_LIMIT
      );
    } else {
      files = [...data]
        .filter((file: File) => {
          const fileExtension = file.name.split('.').pop();
          if (
            fileExtension &&
            allowedFileTypes.includes(fileExtension.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
        .filter((file: File) => file.size <= FILE_SIZE_LIMIT);
    }
    this.onFileChange.emit(files);
  }
}
