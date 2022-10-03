import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfjs from 'pdfjs-dist'

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
    if (this.file.type === 'application/pdf') {
      this.loadPdfPreview()
    }
  }

  async loadPdfPreview() {
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${ pdfjs.version }/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL;
    }
    const pdf = await pdfjs.getDocument(URL.createObjectURL(this.file)).promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 0.5, offsetX: -40, offsetY: -10 })
    const canvas = document.getElementById(`${ this.file.name }-preview`)! as HTMLCanvasElement
    canvas.width = 70
    canvas.height = 70
    const context = canvas.getContext('2d')
    const renderContext = {
      canvasContext: context as CanvasRenderingContext2D,
      viewport
    }
    const renderTask = page.render(renderContext)
    renderTask.promise.then(() => {
      console.log("pdf preview rendered")
    })
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
