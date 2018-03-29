import { UtilitiesService } from './../../services/utilities.service';
import { UtilitiesComponent } from './../../utilities.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  public year: any;
  public years: any[] = [];
  public loading = { errors: false, success: false, waitingServer: false }
  

  constructor( private utilitiesService: UtilitiesService ) { 

  }

  ngOnInit() {
    this.initializeYears()
  }

  setYear( value ) {
    this.year = this.years.find( year => value == year.option )
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = 2014; i <= currentYear; i++) {
      this.years.push({ initialDate: new Date(i, 0, 1),  finalDate : new Date(i + 1, 0, 0),  option: i })
    }

    this.year = this.years[0];
  }

  onSubmitHistoric() {

    this.loading.waitingServer = true;
    this.loading.errors = this.loading.success = false;

    this.utilitiesService.generateHistoric(this.year)
    .subscribe( 
      res => {
        console.log('res: ', res);
        this.loading.waitingServer = this.loading.errors = false;
        this.loading.success = true;
      },
      err => {
        console.log('err: ', err);
        this.loading.waitingServer = this.loading.success = false;
        this.loading.errors = true;
      }
     );
  }

}
