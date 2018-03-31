import { ProviderService } from './../../services/provider/provider.service';
import { Provider } from './../../provider.model';
import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  public providers: Provider[];

  constructor( private providerService: ProviderService ) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders(): void {
    this.providerService.all()
      .subscribe( providers => {
        this.providers = providers;
      });
  }

  downloadCSV() {
    
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.providers[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.providers, 'Catálogo de proveedores', options);
  }

}
