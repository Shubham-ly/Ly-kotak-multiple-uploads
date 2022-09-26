import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {

  @Input() file!: File;
  @Input() key!: string;
  @Input() index!: number;
  @Output() onDeleteClicked: EventEmitter<{ key: string, index: number }> = new EventEmitter()

  showPopup = false;

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${ parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) } ${ sizes[i] }`;
  }

  getImageDataUri(file: File) {
    return this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  getPdfUrlWithPreview(file: File, toolbar: boolean = false) {
    if (toolbar) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file) + '#toolbar=1&scrollbar=1&navpanes=1');
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file) + '#toolbar=0&scrollbar=0&navpanes=0')
  }

}
