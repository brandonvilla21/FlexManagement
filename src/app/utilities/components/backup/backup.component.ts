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
  public errors = false;
  public success = false;
  
  constructor( private utilitiesService: UtilitiesService ) { }

  ngOnInit() {
    // this.utilitiesService.getBackup().subscribe( blob => {
    //   saveAs(blob, 'backup.sql');
    //  })
  }

  onSubmitBackup(value: NgForm){
    if (value.valid) {

      console.log("valido", this.db);
      this.utilitiesService.getBackup(this.db)
      .map(res => res.blob())      
      .subscribe(
        blob => {
          this.errors = false;
          this.success = true;
          saveAs(blob, 'backup.sql');
        },
        err => {
          this.success = false;
          this.errors = true;
        }
      );
    }

  }

}
