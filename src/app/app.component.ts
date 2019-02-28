import {ChangeDetectorRef, Component, OnDestroy,  OnInit,OnChanges,SimpleChanges} from '@angular/core';
import { SeoService } from './seo.service';
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import {MediaMatcher} from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
        transition('1 => 2, 2 => 3', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('3 => 2, 2 => 1', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
    ])
]
})
export class AppComponent implements OnInit,OnChanges,OnDestroy {
  queryString:string;
  closeResult: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
    title = 'mochoApp';
  navLinks = [{label:'home',path:'/'},{label:'music',path:'/'}, 
  {label:'channels',path:'/channels'}, 
  {label:'arts & dance',path:'/'}
  ];
  activeLink = this.navLinks[0];
  _posts:any;
  constructor(public modalService: NgbModal,private seo:SeoService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
   ngOnChanges(){
   }
   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  } 
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
 
   ngOnInit(){

   }
   getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
}
  
}
