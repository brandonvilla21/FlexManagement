import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Headers } from '@angular/http';
import { ConfigUrlService } from 'app/services/config-url/config.url.service';

@Component({
    selector: 'app-file-import',
    templateUrl: 'file-import.component.html'
})

export class FileImportComponent implements OnInit {
    public models: any;
    public modelSelected: string;
    public endPoint: string;
    public uploader: FileUploader;
    public db = { username: '', password: '' };
    public uploaderOptions = {url: '', headers: [], maxFileSize: 1000 * 1024 * 1024 }; // 1000 MB
    public message;
    public loading = false;

    constructor( private configUrlService: ConfigUrlService ) {
        this.endPoint = `${configUrlService.getBaseUrl()}/utilities/import-file`;
        this.uploader = new FileUploader(this.uploaderOptions);
        this.models = [
            {value: 'employee', name: 'Empleados'},
            {value: 'customer', name: 'Clientes'},
            {value: 'product', name: 'Productos'},
            {value: 'provider', name: 'Proveedores'},
        ];
        this.modelSelected = this.models[0].value;
     }

    ngOnInit() {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (response && status) {
              this.message = JSON.parse(response);
              this.message.status = status;
              this.loading = false;
            }
        };
    }
    onChangeModel( event ) {
        this.modelSelected = event.target.value;
    }
    addCredentialsBeforeUpload(item) {
        // Cleaning the message object
        this.message = {};

        this.uploaderOptions.url = this.endPoint;
        this.uploaderOptions.headers = [];
        this.uploaderOptions.headers.push({ name: 'username', value: this.db.username });
        this.uploaderOptions.headers.push({ name: 'pass', value: this.db.password });
        this.uploaderOptions.headers.push({ name: 'modelName', value: this.modelSelected });
        this.uploader.setOptions(this.uploaderOptions);
        item.upload();
        this.loading = true;
    }
}
