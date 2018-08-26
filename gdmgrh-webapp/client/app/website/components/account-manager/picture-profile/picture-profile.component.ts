import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { WebsiteService } from '../../../service/website.service';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'picture-profile',
    template: require('./picture-profile.component.html')
})

export class PictureProfileComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() src: any;
  @Input() urlCompleted: string;
  @Output() uploadResponse = new EventEmitter();
  idProfilePicture = '';
  progress: string;

  constructor(
    private websiteService: WebsiteService
  ) {
    this.urlCompleted = '';
    this.disabled = true;
  }

  ngOnInit() { }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 130,
    resizeMaxWidth: 130
  };

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.websiteService.uploadPicture(imageResult.file, this.src, this.urlCompleted).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(events.loaded / events.total) * 100 + '%';
      } else if (events.type === HttpEventType.Response) {
        this.emitResponse(events.body);
      }
    });
  }
  emitResponse(response) {
    this.uploadResponse.emit(response.data[0]._media);
  }
}
