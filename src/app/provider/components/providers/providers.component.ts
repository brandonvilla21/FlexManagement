import { ProviderService } from './../../services/provider/provider.service';
import { Provider } from './../../provider.model';
import { Component, OnInit } from '@angular/core';

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
}
