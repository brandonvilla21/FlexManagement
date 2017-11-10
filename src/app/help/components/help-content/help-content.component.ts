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
  public ventas3: string
  public ventas4: string
  public ventas5: string
  public ventas6: string
  public reportes = []
  public utilidades = []
  public configUrlService;
  constructor( configUrlService: ConfigUrlService) {

    this.configUrlService = configUrlService;

    this.productos1 = `${configUrlService.getBaseUrl()}/assets/productos1.png`
    this.productos2 = `${configUrlService.getBaseUrl()}/assets/productos2.png`
    this.productos3 = `${configUrlService.getBaseUrl()}/assets/productos3.png`
    this.productos4 = `${configUrlService.getBaseUrl()}/assets/productos4.png`
    this.productos5 = `${configUrlService.getBaseUrl()}/assets/productos5.png`
    this.ventas1 = `${configUrlService.getBaseUrl()}/assets/ventas1.png`
    this.ventas2 = `${configUrlService.getBaseUrl()}/assets/ventas2.jpg`
    this.ventas3 = `${configUrlService.getBaseUrl()}/assets/ventas3.png`
    this.ventas4 = `${configUrlService.getBaseUrl()}/assets/ventas4.png`
    this.ventas5 = `${configUrlService.getBaseUrl()}/assets/ventas5.png`
    this.ventas6 = `${configUrlService.getBaseUrl()}/assets/ventas6.png`

  }

  ngOnInit() {
  this.loadReportImages();
  this.loadUtilityImages();

  }

  loadReportImages() {
    for (let i = 0; i < 12; i++) { this.reportes[i] = `${this.configUrlService.getBaseUrl()}/assets/reporte${i + 1}.png` }
  }

  loadUtilityImages() {
    for (let i = 0; i < 5; i++) { this.utilidades[i] = `${this.configUrlService.getBaseUrl()}/assets/utilidad${i + 1}.png` }
  }


}
