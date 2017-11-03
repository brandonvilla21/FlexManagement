import { Headers } from '@angular/http';
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
  public uploader: FileUploader;
  public db = { username: '', password: '' };
  public uploaderOptions = {url: '', headers: []};

  constructor(private configUrlService: ConfigUrlService) {
    this.endPoint = `${configUrlService.getBaseUrl()}/utilities/restore`;
    this.uploader = new FileUploader(this.uploaderOptions);
    // Add in the other upload form parameters.        

  }

  ngOnInit() {
  }

  addCredentialsBeforeUpload(item) {
    this.uploaderOptions.url = this.endPoint;
    this.uploaderOptions.headers = [];
    this.uploaderOptions.headers.push({ name: 'username', value: this.db.username });
    this.uploaderOptions.headers.push({ name: 'pass', value: this.db.password });
    this.uploader.setOptions(this.uploaderOptions);
    item.upload();
  }



}
