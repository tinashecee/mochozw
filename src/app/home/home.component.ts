import { Component, OnInit, ViewChild } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '../../../node_modules/@ngu/carousel';
import {DragScrollComponent} from '../../../node_modules/ngx-drag-scroll';
import {SeoService} from '../seo.service';
import {VlogerCard} from '../models/VlogerCardTrending';
import {Tweet} from '../models/trendingtweets';
import {TrendingCard} from '../models/TrendingCard';
import {TweetsArray} from '../models/tweetsArray';
import {SortPipePipe} from '../sort-pipe.pipe';
import { Tracks } from '../models/tracks';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  @ViewChild('myCarousel1') myCarousel1: NguCarousel<any>;
  @ViewChild('myCarousel2') myCarousel2: NguCarousel<any>;
  @ViewChild('myCarousel3') myCarousel3: NguCarousel<any>;
  @ViewChild('myCarousel4') myCarousel4: NguCarousel<any>;
  @ViewChild('myCarousel5') myCarousel5: NguCarousel<any>;
  @ViewChild('myCarousel6') myCarousel6: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 4, lg: 4, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  }
  constructor(private services:SeoService) { 
 
  }
  tweets;
  
  videos:VlogerCard[];
  videos1:VlogerCard[];
  videos2:VlogerCard[];
  singles:Tracks[];
  albums:Tracks[];
  latestvideos;
  _tweets;
  _tweetsnews;
  _tweets1;
  _tweets2;
  drip:string;
  tagVideos:TrendingCard[];
  tagArts:TrendingCard[];
  searchquery='quavo';
 
  path1: string[] = ['views'];
  path: string[] = ['subscribers'];
  order: number = -1; // 1 asc, -1 desc;

  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;
  
  moveLeft() {
    this.ds.moveLeft();
  }
 
  moveRight() {
    this.ds.moveRight();
  }
  ngOnInit() {
  
  this._tweets=this.services.data1;
  this._tweetsnews=this.services.data11;
  this._tweets1=this.services.data6;
  this._tweets2=this.services.data10;
    this.services.data2.subscribe(
      v=>{
        this.videos=v
  
      }
    );
  this.services.data3.subscribe(
    v=>{
      this.tagVideos=v;
    }
  );
  this.services.data7.subscribe(
    v=>{
      this.videos1=v;
    }
  );
  this.services.data8.subscribe(
    v=>{
      this.videos2=v;
    }
  );
  this.services.data9.subscribe(
    v=>{
      this.tagArts=v;
    }
  );
 
  this.services.data15.subscribe(
    v=>{
      this.singles=v;
    }
  );
  this.services.data14.subscribe(
    v=>{
      this.albums=v;
    }
  );
  
 
  
}
  
loadPlaylist(v:VlogerCard) {
  this.services.getVlogers(v);
}
setDrip(a:VlogerCard) {
 this.drip='https://www.youtube.com/embed/'+a.vid+'?ecver=1&amp;autoplay=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=300&amp;width=300';
} 
}
