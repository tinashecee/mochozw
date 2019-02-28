import { Component, OnInit } from '@angular/core';
import {SeoService} from '../seo.service';
import { Vloger} from '../models/Vloger';
import {VlogerCard} from '../models/VlogerCardTrending';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  artists:Vloger[];
  constructor(private service:SeoService) {
    this.service.data12.subscribe(v=>{
      this.artists=v
      console.log(this.artists)
    });
   }

  ngOnInit() {

  }
  loadPlaylist(v:Vloger) {
    
    this.service.getVlogers(v);
    this.service.getTrendingevents(v);
  }
}
