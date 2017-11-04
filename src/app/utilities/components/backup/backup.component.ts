import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  
  public db = {};
  public loading = { errors: false, success: false, waitingServer: false }
  
  constructor( private utilitiesService: UtilitiesService ) { }

  ngOnInit() { }

  onSubmitBackup(value: NgForm){

    if (value.valid) {
      
      this.loading.waitingServer = true;
      this.loading.errors = this.loading.success = false;


      this.utilitiesService.getBackup(this.db)
      .map(res => res.blob())      
      .subscribe(
        blob => {
          this.loading.waitingServer = this.loading.errors = false;
          this.loading.success = true;
          saveAs(blob, 'backup.sql');
        },
        err => {
          this.loading.waitingServer = this.loading.success = false;
          this.loading.errors = true;
        }
      );
    }

  }

}
