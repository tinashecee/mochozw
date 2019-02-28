import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo.service";
import {  VlogerCard} from "../models/VlogerCardTrending";
@Component({
  selector: 'app-artistprofile',
  templateUrl: './artistprofile.component.html',
  styleUrls: ['./artistprofile.component.css']
})
export class ArtistprofileComponent implements OnInit {
  videos:VlogerCard[];
  drip:string;
  tweets;
    constructor(private service:SeoService) { 
      this.service.data5.subscribe(v=>{
        this.videos=v
      })
      this.tweets=this.service.data13;
    }
  
    ngOnInit() {
    }
    setDrip(a:VlogerCard) {
      this.drip='https://www.youtube.com/embed/'+a.vid+'?ecver=1&amp;autoplay=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=300&amp;width=300';
     } 
  }
  