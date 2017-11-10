import { Component, OnInit } from '@angular/core';
import { ConfigUrlService } from 'app/services/config-url/config.url.service';

@Component({
  selector: 'app-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.scss']
})
export class HelpContentComponent implements    OnInit {
  public productos1: string
  public productos2: string
  public productos3: string
  public productos4: string
  public productos5: string
  public ventas1: string
  public ventas2: string
  constructor( configUrlService: ConfigUrlService) {
    this.productos1 = `${configUrlService.getBaseUrl()}/assets/productos1.png`
    this.productos2 = `${configUrlService.getBaseUrl()}/assets/productos2.png`
    this.productos3 = `${configUrlService.getBaseUrl()}/assets/productos3.png`
    this.productos4 = `${configUrlService.getBaseUrl()}/assets/productos4.png`
    this.productos5 = `${configUrlService.getBaseUrl()}/assets/productos5.png`
    this.ventas1 = `${configUrlService.getBaseUrl()}/assets/ventas1.jpg`
    this.ventas2 = `${configUrlService.getBaseUrl()}/assets/ventas2.png`
  }

  ngOnInit() {
  }


}