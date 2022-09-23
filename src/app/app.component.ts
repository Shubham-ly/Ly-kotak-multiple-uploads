import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ly-kotak';
  dir12Files: File[] = [];
  rocFiles: File[] = [];

  constructor(private _sanitizer: DomSanitizer) {}

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  rocFilesChanged(data: File[]) {
    this.rocFiles = [...this.rocFiles, ...data];
  }
  dir12FilesChanged(data: File[]) {
    this.dir12Files = [...this.dir12Files, ...data];
  }

  onRemoveClicked(index: number, from: string) {
    if (from === 'rocFiles')
      this.rocFiles = this.rocFiles.filter((_, i) => i !== index);
    else if (from === 'dir12Files')
      this.dir12Files = this.dir12Files.filter((_, i) => i !== index);
  }

  getImageDataUri(file: File) {
    if (file.type === 'application/pdf')
      return this._sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(file)
      );
    return this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}
