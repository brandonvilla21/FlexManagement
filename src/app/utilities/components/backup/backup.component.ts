import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  constructor( private utilitiesService: UtilitiesService ) { }

  ngOnInit() {
    this.utilitiesService.getBackup().subscribe( backupFile => console.log("backupFile",backupFile) )
  }

  onSubmitBackup(value: NgForm){
    // if (value.valid) {

    // }

  }

}
