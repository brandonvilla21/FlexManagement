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
  public uploaderOptions = {url: '', headers: [], maxFileSize: 1000*1024*1024 }; // 1000 MB
  public message;
  public loading = false;

  constructor(private configUrlService: ConfigUrlService) {
    this.endPoint = `${configUrlService.getBaseUrl()}/utilities/restore`;
    this.uploader = new FileUploader(this.uploaderOptions);

  }

  ngOnInit() {
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.message = JSON.parse(response);
      this.message.status = status;
      this.loading = false;
    };
  }

  addCredentialsBeforeUpload(item) {

    //Cleaning the message object
    this.message = {};


    this.uploaderOptions.url = this.endPoint;
    this.uploaderOptions.headers = [];
    this.uploaderOptions.headers.push({ name: 'username', value: this.db.username });
    this.uploaderOptions.headers.push({ name: 'pass', value: this.db.password });
    this.uploader.setOptions(this.uploaderOptions);
    item.upload();
    this.loading = true;

  }



}
