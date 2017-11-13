import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };
  public constructor( private router: Router) {

  }
  ngOnInit(): void {
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public scrollTo( tag ) {
    window.scroll(0, this.findPos(document.getElementById(tag)));
    console.log(1)
  }

  private findPos(obj) {
    let curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return curtop;
    }
  }
}
