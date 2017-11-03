import { ConfigUrlService } from './../../../services/config-url/config.url.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {
  public endPoint: string;
  public uploader:FileUploader;

  constructor( private configUrlService: ConfigUrlService ) { 
    this.endPoint = `${configUrlService.getBaseUrl()}/utilities/restore`;
    this.uploader = new FileUploader({url: this.endPoint });
  }

  ngOnInit() {
  }

}
