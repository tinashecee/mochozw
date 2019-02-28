import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo.service";
import {  VlogerCard} from "../models/VlogerCardTrending";
@Component({
  selector: 'app-vloger',
  templateUrl: './vloger.component.html',
  styleUrls: ['./vloger.component.css']
})
export class VlogerComponent implements OnInit {
videos:VlogerCard[];
drip:string;
  constructor(private service:SeoService) { 
    this.service.data5.subscribe(v=>{
      this.videos=v
    })
  }

  ngOnInit() {
  }
  setDrip(a:VlogerCard) {
    this.drip='https://www.youtube.com/embed/'+a.vid+'?ecver=1&amp;autoplay=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=300&amp;width=300';
   } 
}
