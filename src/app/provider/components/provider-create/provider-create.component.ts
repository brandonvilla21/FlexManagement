import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProviderService } from './../../services/provider/provider.service';
import { Provider } from './../../provider.model';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.scss']
})
export class ProviderCreateComponent implements OnInit {
  public provider: Provider = {
    name: '',
    descrition: '',
    contact: '',
    email: '',
    phone: '',
    provider_id: ''
  }
  constructor( private providerService: ProviderService ) { }

  ngOnInit() {
  }

  onSubmitProvider(value: NgForm) {
    if (value.valid) {
      this.providerService.create( this.provider )
        .subscribe( res => {
          console.log(res);
        })
    }
  }
}
