import { Component, OnInit } from '@angular/core';
import {SeoService} from '../seo.service';
import { Vloger} from '../models/Vloger';
import {VlogerCard} from '../models/VlogerCardTrending';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
vlogers:Vloger[];
  constructor(private service:SeoService) {
    this.service.data4.subscribe(v=>{
      this.vlogers=v
      console.log(this.vlogers)
    });
   }

  ngOnInit() {

  }
  loadPlaylist(v:Vloger) {
    let vv:VlogerCard={
      playlistId:v.playlistId,
      pic:v.pic
    }
    this.service.getVlogers(v);
  }
}
