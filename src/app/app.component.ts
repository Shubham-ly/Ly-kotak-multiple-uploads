import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ly-kotak';
  dir12Files: File[] = [];
  rocFiles: File[] = [];

  constructor() { }

  rocFilesChanged(data: File[]) {
    this.rocFiles = [...this.rocFiles, ...data];
  }
  dir12FilesChanged(data: File[]) {
    this.dir12Files = [...this.dir12Files, ...data];
  }

  onRemoveClicked({ key, index }: { key: string, index: number }) {
    switch (key) {
      case 'dir12Files':
        this.dir12Files = this.dir12Files.filter((_, i) => i != index)
        break;
      case 'rocFiles':
        this.rocFiles = this.rocFiles.filter((_, i) => i != index);
        break;
      default: break;
    }
  }
}
