import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { WebsiteService } from '../../../service/website.service';

@Component({
    selector: 'picture-profile',
    template: require('./picture-profile.component.html')
})

export class PictureProfileComponent implements OnInit {
  @Input() src: any;
  @Output() uploadResponse = new EventEmitter();
  idProfilePicture = '';

  constructor(
    private websiteService: WebsiteService
  ) { }

  ngOnInit() { }

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 180,
    resizeMaxWidth: 180
  };

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
      console.log(imageResult.file);
    this.websiteService.uploadPicture(imageResult.file, this.src).subscribe(res => {
      console.log(res);
    });
  }
}
