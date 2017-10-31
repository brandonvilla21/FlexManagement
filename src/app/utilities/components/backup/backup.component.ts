import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  
  public db = {};
  
  constructor( private utilitiesService: UtilitiesService ) { }

  ngOnInit() {
    // this.utilitiesService.getBackup().subscribe( blob => {
    //   saveAs(blob, 'backup.sql');
    //  })
  }

  onSubmitBackup(value: NgForm){
    if (value.valid) {

      console.log("valido", this.db);

    }

  }

}
