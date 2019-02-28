import { Injectable,Injector,Inject,PLATFORM_ID } from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {Meta,Title, TransferState, makeStateKey} from '@angular/platform-browser';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Vloger } from './models/Vloger';
import { map ,tap, startWith } from 'rxjs/operators';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {VlogerCard} from './models/VlogerCardTrending';
import {Tweet} from './models/trendingtweets';
import {TrendingVid} from './models/trending';
import {TrendingCard} from './models/TrendingCard';
import { topTweeter } from "./models/topTweeter";
import {TweetsArray} from './models/tweetsArray';
import {topMusic} from './models/topMusic';
import { resolve } from 'path';
import {Tracks} from './models/tracks';
const CACHE_key='httpCache';
const config = makeStateKey<any>('CONFIG');
@Injectable({
  providedIn: 'root'
})

export class SeoService {
  
Trendingcol:AngularFirestoreCollection<TrendingVid>;
trendingVids:Observable<TrendingVid[]>;
TrendingVidDoc: AngularFirestoreDocument<TrendingVid>;
trendingArts:Observable<TrendingVid[]>;
TrendingArtscol:AngularFirestoreCollection<TrendingVid>;
vlogerscol:AngularFirestoreCollection<Vloger>;
vlogers:Observable<Vloger[]>;
TrendingTweetscol:AngularFirestoreCollection<Tweet>;
trendingTweets:Observable<Tweet[]>
newsTweetscol:AngularFirestoreCollection<Tweet>;
newsTweeters:Observable<Tweet[]>
TrendingTweeterscol:AngularFirestoreCollection<topTweeter>;
trendingTweeters:Observable<topTweeter[]>
musicTweeterscol:AngularFirestoreCollection<topTweeter>;
musicTweeters:Observable<topTweeter[]>
Artistscol:AngularFirestoreCollection<Vloger>;
artists:Observable<Vloger[]>
singlescol:AngularFirestoreCollection<Tracks>;
singles:Observable<Tracks[]>
albumscol:AngularFirestoreCollection<Tracks>;
albums:Observable<Tracks[]>
topmusicDoc:AngularFirestoreDocument<topMusic>;
topmusic:Observable<topMusic>;

_tweets;
tp:Tweet={
  id:'',
  tag:''
}
topTweets:Tweet[];
newsTweets:Tweet[];
topTweets1:Tweet[];
musicTweets:Tweet[];
topTweeters:topTweeter[];
tagsVid:TrendingVid[];
topvlogs:Vloger[];
topartists:Vloger[];
topVids:TrendingVid[];
topArts:TrendingVid[];

tg:TrendingVid={
  id:'',
  tag:''
}
trendvideos1:VlogerCard[];
public a = new BehaviorSubject<Array<TweetsArray>>([]);
public data1 = this.a.asObservable();
public l = new BehaviorSubject<Array<TweetsArray>>([]);
public data11 = this.l.asObservable();
public b = new BehaviorSubject<Array<any>>([]);
public data2 = this.b.asObservable();
public c = new BehaviorSubject<Array<TrendingCard>>([]);
public data3 = this.c.asObservable();
public d = new BehaviorSubject<Array<Vloger>>([]);
public data4 = this.d.asObservable();
public m = new BehaviorSubject<Array<Vloger>>([]);
public data12 = this.m.asObservable();
public e = new BehaviorSubject<Array<VlogerCard>>([]);
public data5 = this.e.asObservable();
public f = new BehaviorSubject<Array<any>>([]);
public data6 = this.f.asObservable();
public k = new BehaviorSubject<Array<any>>([]);
public data10 = this.k.asObservable();
public n = new BehaviorSubject<Array<any>>([]);
public data13 = this.n.asObservable();
public g = new BehaviorSubject<Array<any>>([]);
public data7 = this.g.asObservable();
public h = new BehaviorSubject<Array<any>>([]);
public data8 = this.h.asObservable();
public p = new BehaviorSubject<Array<any>>([]);
public data14 = this.p.asObservable();
public o = new BehaviorSubject<Array<any>>([]);
public data15 = this.o.asObservable();
public i = new BehaviorSubject<Array<TrendingCard>>([]);
public data9 = this.i.asObservable();
metaTweets:any;
metaTweets1:any;
  constructor(private state :TransferState,private http:HttpClient,public afs:AngularFirestore, private injector:Injector,@Inject(PLATFORM_ID) private platformid:Object, private meta: Meta,private titleService:Title) {
  this.vlogerscol = this.afs.collection('vlogers');
    this.vlogers = this.vlogerscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Vloger;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.vlogers.subscribe(v=>{this.topvlogs=v
    this.d.next(this.topvlogs);
    });
    //fetch all trending videos
    this.Trendingcol = this.afs.collection('trendingVids');
    this.trendingVids = this.Trendingcol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as TrendingVid;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.singlescol = this.afs.collection('singles');
    this.singles = this.singlescol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Tracks;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.singles.subscribe(v=>{
      let g=v
      this.o.next(g);
    })
    this.albumscol = this.afs.collection('albums');
    this.albums = this.albumscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Tracks;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.albums.subscribe(v=>{
      let g=v
      this.p.next(g);
    })
    this.TrendingTweetscol = this.afs.collection('toptweets');
    this.trendingTweets = this.TrendingTweetscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Tweet;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.newsTweetscol = this.afs.collection('newstweets');
    this.newsTweeters = this.newsTweetscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Tweet;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.TrendingTweeterscol = this.afs.collection('toptwitters');
    this.trendingTweeters = this.TrendingTweeterscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as topTweeter;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.musicTweeterscol = this.afs.collection('musictwitters');
    this.musicTweeters = this.musicTweeterscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as topTweeter;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.Artistscol = this.afs.collection('artist');
    this.artists = this.Artistscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Vloger;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.artists.subscribe(v=>{this.topartists=v
      this.m.next(this.topartists);
      });
    this.TrendingArtscol = this.afs.collection('toparts');
    this.trendingArts = this.TrendingArtscol.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as TrendingVid;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    this.topmusicDoc = this.afs.collection('topmusic').doc('topmusic');
    this.topmusic=this.topmusicDoc.valueChanges();
 
   this.getTopvideos();
  this.getTopvlogers();
this.getTrending();
this.getTrending1();
this.getTrending2();
this.getTrendingnews();
this.getTopartists();
this.getTopmusic();
this.getTopArts();
  }
  generateTags(tags){
  tags={
    title:'Mocho Ent.',
    description:'Best Zimbabwe local music,videos, arts and other entertainment',
    image:'',
    slug:'',
    ...tags
  }
  this.titleService.setTitle(tags.title);

  this.meta.updateTag({name:'twitter:card',content:'summary'});
  this.meta.updateTag({name:'twitter:site',content:'@mochozim'});
  this.meta.updateTag({name:'twitter:title',content:tags.title});
  this.meta.updateTag({name:'twitter:description',content:tags.description});
  this.meta.updateTag({name:'twitter:image',content:tags.image});

  this.meta.updateTag({property:'og:type',content:'article'});
  this.meta.updateTag({property:'og:site_name',content:'Mocho'});
  this.meta.updateTag({property:'og:title',content:tags.title});
  this.meta.updateTag({property:'og:description',content:tags.description});
  this.meta.updateTag({property:'og:image',content:tags.image});
  this.meta.updateTag({property:'og:url',content:``});


}
getVlogers( vloger:VlogerCard){

    let vlogerArray:Array<any> = [];
    let response;
     
       let params = new HttpParams().set('params',vloger.playlistId);
       var searchterm = 'query=' ;    
        params.append('Content-Type', 'application/X-www-form-urlencoded');
       this.http.post('/videos',searchterm,{params: params}).subscribe((res) => {
        response=res;
        response.forEach(element => {
          var thumb = element.snippet.thumbnails.medium.url;
            var title = element.snippet.title;
            var publishedAt = element.snippet.publishedAt;
            var channelTitle = element.snippet.channelTitle;
            var vid1 = element.snippet.resourceId.videoId;
            var d2 = Date.now();
            var d1 = new Date(publishedAt);
            var ms = d1.getTime(); 
            var diff = d2 - ms;
            
            if (diff > 29030400e3)
            {
               var elapsed= Math.floor(diff / 29030400e3)+' years ago';
              }
            else if (diff > 2419200e3) {
              var elapsed=Math.floor(diff / 2419200e3)+' months ago';
            }
            else if (diff > 604800e3) {
              var elapsed=Math.floor(diff / 604800e3)+' weeks ago';
            }
            else if (diff > 86400e3) {
              var elapsed=Math.floor(diff / 86400e3)+' days ago';
            }
            else if (diff > 3600e3) {
              var elapsed=Math.floor(diff / 3600e3)+' hours ago'
            }
            else if (diff > 60e3) {
              var elapsed=Math.floor(diff / 60e3)+' minutes ago';
            }
            else {
              var elapsed=Math.floor(diff / 1e3)+' seconds ago';
            }
            //let params = new HttpParams().set('params',vid1);
            //var searchterm = 'query=' ;    
            // params.append('Content-Type', 'application/X-www-form-urlencoded');
            //this.http.post('/trendingvideos1',searchterm,{params: params}).subscribe((response) => {
             
            var put:VlogerCard={
              
              thumb:thumb,
              title:title,
              vid:vid1,
              pic:vloger.pic,
              youtube:vloger.youtube,
              instagram:vloger.instagram,
              twitter:vloger.twitter,
              facebook:vloger.facebook,
              //views:response[0].statistics.viewCount,
              publishedAt:elapsed,
              channelTitle:channelTitle
                  }
                  
      vlogerArray.push(put);
      
        }
      
          )
         // })
     
     })
    
      this.e.next(vlogerArray);
  
}
getTopvlogers(){
  this.vlogers.subscribe(v=>{this.topvlogs=v
 let vlogerArray:Array<any> = [];
 
  this.topvlogs.forEach(element => {
    let params = new HttpParams().set('params',element.playlistId);
    var searchterm = 'query=' ;    
     params.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('/videos',searchterm,{params: params}).subscribe((res) => {
 
      var thumb = res[0].snippet.thumbnails.medium.url;
      var title = res[0].snippet.title;
      var channelId=res[0].snippet.channelId;
      var publishedAt = res[0].snippet.publishedAt;
      var channelTitle = res[0].snippet.channelTitle;
      var vid1 = res[0].snippet.resourceId.videoId;
      var d2 = Date.now();
      var d1 = new Date(publishedAt);
      var ms = d1.getTime(); 
      var diff = d2 - ms;
      
      if (diff > 29030400e3)
      {
         var elapsed= Math.floor(diff / 29030400e3)+'years ago';
        }
      else if (diff > 2419200e3) {
        var elapsed=Math.floor(diff / 2419200e3)+'months ago';
      }
      else if (diff > 604800e3) {
        var elapsed=Math.floor(diff / 604800e3)+'weeks ago';
      }
      else if (diff > 86400e3) {
        var elapsed=Math.floor(diff / 86400e3)+'days ago';
      }
      else if (diff > 3600e3) {
        var elapsed=Math.floor(diff / 3600e3)+'hours ago'
      }
      else if (diff > 60e3) {
        var elapsed=Math.floor(diff / 60e3)+'minutes ago';
      }
      else {
        var elapsed=Math.floor(diff / 1e3)+'seconds ago';
      }
      let params = new HttpParams().set('params',vid1);
    var searchterm = 'query=' ;    
     params.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('/trendingvideos',searchterm,{params: params}).subscribe((res) => {
      let params = new HttpParams().set('params',channelId);
    var searchterm = 'query=' ;    
     params.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('/topvlogers',searchterm,{params: params}).subscribe((response) => {
    
     var put:VlogerCard={
            thumb:thumb,
            title:title,
            vid:vid1,
            playlistId:element.playlistId,
            views:res[0].statistics.viewCount,
            subscribers:response[0].statistics.subscriberCount,
            publishedAt:elapsed,
            publishedDate:publishedAt,
            channelTitle:channelTitle,
            pic:element.pic

      }
   vlogerArray.push(put);
 
  })

  })
  
  })
 
   });
   this.b.next(vlogerArray);

});
}
getTopvideos(){
  
  let TrendingArray:Array<any> = [];
  this.trendingVids.subscribe(v=>{
  this.topVids=v
 let response;
  this.topVids.forEach(elemen => {
    let vlogerArray:Array<any> = [];
 let params = new HttpParams().set('params',elemen.tag);
    var searchterm = 'query=' ; 
     params.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('/trendingvids',searchterm,{params: params}).subscribe((res) => {
    response=res;
    response.forEach(element => {
    var thumb = element.snippet.thumbnails.medium.url;
      var title = element.snippet.title;
      var publishedAt = element.snippet.publishedAt;
      var channelTitle = element.snippet.channelTitle;
      var vid1 = element.id.videoId;
      var d2 = Date.now();
      var d1 = new Date(publishedAt);
      var ms = d1.getTime(); 
      var diff = d2 - ms;
      
      if (diff > 29030400e3)
      {
         var elapsed= Math.floor(diff / 29030400e3)+' years ago';
        }
      else if (diff > 2419200e3) {
        var elapsed=Math.floor(diff / 2419200e3)+' months ago';
      }
      else if (diff > 604800e3) {
        var elapsed=Math.floor(diff / 604800e3)+' weeks ago';
      }
      else if (diff > 86400e3) {
        var elapsed=Math.floor(diff / 86400e3)+' days ago';
      }
      else if (diff > 3600e3) {
        var elapsed=Math.floor(diff / 3600e3)+' hours ago'
      }
      else if (diff > 60e3) {
        var elapsed=Math.floor(diff / 60e3)+' minutes ago';
      }
      else {
        var elapsed=Math.floor(diff / 1e3)+' seconds ago';
      }
      let params = new HttpParams().set('params',vid1);
      var searchterm = 'query=' ;    
       params.append('Content-Type', 'application/X-www-form-urlencoded');
      this.http.post('/trendingvideos1',searchterm,{params: params}).subscribe((response) => {
       
      var put:VlogerCard={
        
        thumb:thumb,
        title:title,
        vid:vid1,
        views:response[0].statistics.viewCount,
        publishedAt:elapsed,
        channelTitle:channelTitle
            }
            
vlogerArray.push(put);

  }

    )
    })

   var putt:TrendingCard={
      tag:elemen.tag,
      videos:vlogerArray
   }
   TrendingArray.push(putt);
  })
  })
  this.c.next(TrendingArray);
  })

  }
getTopartists(){
    this.artists.subscribe(v=>{this.topartists=v
   let vlogerArray:Array<any> = [];
    
    this.topartists.forEach(element => {
      let params = new HttpParams().set('params',element.playlistId);
      var searchterm = 'query=' ;    
       params.append('Content-Type', 'application/X-www-form-urlencoded');
      this.http.post('/videos',searchterm,{params: params}).subscribe((res) => {
   
        var thumb = res[0].snippet.thumbnails.medium.url;
        var title = res[0].snippet.title;
        var channelId=res[0].snippet.channelId;
        var publishedAt = res[0].snippet.publishedAt;
        var channelTitle = res[0].snippet.channelTitle;
        var vid1 = res[0].snippet.resourceId.videoId;
        var d2 = Date.now();
        var d1 = new Date(publishedAt);
        var ms = d1.getTime(); 
        var diff = d2 - ms;
        
        if (diff > 29030400e3)
        {
           var elapsed= Math.floor(diff / 29030400e3)+'years ago';
          }
        else if (diff > 2419200e3) {
          var elapsed=Math.floor(diff / 2419200e3)+'months ago';
        }
        else if (diff > 604800e3) {
          var elapsed=Math.floor(diff / 604800e3)+'weeks ago';
        }
        else if (diff > 86400e3) {
          var elapsed=Math.floor(diff / 86400e3)+'days ago';
        }
        else if (diff > 3600e3) {
          var elapsed=Math.floor(diff / 3600e3)+'hours ago'
        }
        else if (diff > 60e3) {
          var elapsed=Math.floor(diff / 60e3)+'minutes ago';
        }
        else {
          var elapsed=Math.floor(diff / 1e3)+'seconds ago';
        }
        let params = new HttpParams().set('params',vid1);
      var searchterm = 'query=' ;    
       params.append('Content-Type', 'application/X-www-form-urlencoded');
      this.http.post('/trendingvideos',searchterm,{params: params}).subscribe((res) => {
        let params = new HttpParams().set('params',channelId);
      var searchterm = 'query=' ;    
       params.append('Content-Type', 'application/X-www-form-urlencoded');
      this.http.post('/topvlogers',searchterm,{params: params}).subscribe((response) => {
      
       var put:VlogerCard={
              thumb:thumb,
              title:title,
              vid:vid1,
              playlistId:element.playlistId,
              views:res[0].statistics.viewCount,
              subscribers:response[0].statistics.subscriberCount,
              publishedAt:elapsed,
              publishedDate:publishedAt,
              channelTitle:channelTitle,
              pic:element.pic
  
        }
     vlogerArray.push(put);
   
    })
  
    })
    
    })
   
     });
     this.g.next(vlogerArray);
  
  });
  }
  getTopArts(){
  
    let TrendingArray:Array<any> = [];
    this.trendingArts.subscribe(v=>{
    let ta=v
   let response;
    ta.forEach(elemen => {
      let vlogerArray:Array<any> = [];
   let params = new HttpParams().set('params',elemen.playlistId);
      var searchterm = 'query=' ; 
       params.append('Content-Type', 'application/X-www-form-urlencoded');
      this.http.post('/videos',searchterm,{params: params}).subscribe((res) => {
      response=res;
      response.forEach(element => {
      var thumb = element.snippet.thumbnails.medium.url;
        var title = element.snippet.title;
        var publishedAt = element.snippet.publishedAt;
        var channelTitle = element.snippet.channelTitle;
        var vid1 = element.id.videoId;
        var d2 = Date.now();
        var d1 = new Date(publishedAt);
        var ms = d1.getTime(); 
        var diff = d2 - ms;
        
        if (diff > 29030400e3)
        {
           var elapsed= Math.floor(diff / 29030400e3)+' years ago';
          }
        else if (diff > 2419200e3) {
          var elapsed=Math.floor(diff / 2419200e3)+' months ago';
        }
        else if (diff > 604800e3) {
          var elapsed=Math.floor(diff / 604800e3)+' weeks ago';
        }
        else if (diff > 86400e3) {
          var elapsed=Math.floor(diff / 86400e3)+' days ago';
        }
        else if (diff > 3600e3) {
          var elapsed=Math.floor(diff / 3600e3)+' hours ago'
        }
        else if (diff > 60e3) {
          var elapsed=Math.floor(diff / 60e3)+' minutes ago';
        }
        else {
          var elapsed=Math.floor(diff / 1e3)+' seconds ago';
        }
       
        var put:VlogerCard={
          
          thumb:thumb,
          title:title,
          vid:vid1,
          publishedAt:elapsed,
          channelTitle:channelTitle
              }
              
  vlogerArray.push(put);
  
    }
  )
  
     
    })
    var putt:TrendingCard={
      tag:elemen.tag,
      videos:vlogerArray
   }
   TrendingArray.push(putt);
    })
    this.i.next(TrendingArray);
    })
  
    }
  getTopmusic(){
this.topmusic.subscribe(v=>{
let vloger=v
    let vlogerArray:Array<any> = [];
    let response;
     
       let params = new HttpParams().set('params',vloger.playlistId);
       var searchterm = 'query=' ;    
        params.append('Content-Type', 'application/X-www-form-urlencoded');
       this.http.post('/videos',searchterm,{params: params}).subscribe((res) => {
        response=res;
        response.forEach(element => {
          var thumb = element.snippet.thumbnails.medium.url;
            var title = element.snippet.title;
            var publishedAt = element.snippet.publishedAt;
            var channelTitle = element.snippet.channelTitle;
            var vid1 = element.snippet.resourceId.videoId;
            var d2 = Date.now();
            var d1 = new Date(publishedAt);
            var ms = d1.getTime(); 
            var diff = d2 - ms;
            
            if (diff > 29030400e3)
            {
               var elapsed= Math.floor(diff / 29030400e3)+' years ago';
              }
            else if (diff > 2419200e3) {
              var elapsed=Math.floor(diff / 2419200e3)+' months ago';
            }
            else if (diff > 604800e3) {
              var elapsed=Math.floor(diff / 604800e3)+' weeks ago';
            }
            else if (diff > 86400e3) {
              var elapsed=Math.floor(diff / 86400e3)+' days ago';
            }
            else if (diff > 3600e3) {
              var elapsed=Math.floor(diff / 3600e3)+' hours ago'
            }
            else if (diff > 60e3) {
              var elapsed=Math.floor(diff / 60e3)+' minutes ago';
            }
            else {
              var elapsed=Math.floor(diff / 1e3)+' seconds ago';
            }
            //let params = new HttpParams().set('params',vid1);
            //var searchterm = 'query=' ;    
            // params.append('Content-Type', 'application/X-www-form-urlencoded');
            //this.http.post('/trendingvideos1',searchterm,{params: params}).subscribe((response) => {
             
            var put:VlogerCard={
              
              thumb:thumb,
              title:title,
              vid:vid1,
              //views:response[0].statistics.viewCount,
              publishedAt:elapsed,
              channelTitle:channelTitle
                  }
                  
      vlogerArray.push(put);
      
        }
      
          )
         // })
     
     })
    
      this.h.next(vlogerArray);}
     )
} 
getTrending(){
  let TweetArray:Array<any> = [];
  this.trendingTweets.subscribe(v=>{
  this.topTweets=v;
  let response;
  let tag1:string;
  
 
  this.topTweets.forEach(element => {
  let tweetsArray:Array<any> = [];
  
 
  let params = new HttpParams().set('params',element.tag);
  
  var searchterm = 'query=' ;    
   params.append('Content-Type', 'application/X-www-form-urlencoded');
 this.http.post('/authorize',searchterm,{params: params}).subscribe(
  (res) =>{
   
    response=res
    response.data.forEach(elemen => {
      var id_str=elemen.id_str;
      tweetsArray.push(id_str);
   
  }
  );
 

  
})
var put: TweetsArray={
  tag:element.tag,
  tweets:tweetsArray
}
TweetArray.push(put);

})

this.a.next(TweetArray);
})
}
getTrendingnews(){
  let TweetArray:Array<any> = [];
  this.newsTweeters.subscribe(v=>{
  this.newsTweets=v;
  let response;
  let tag1:string;
  
 
  this.newsTweets.forEach(element => {
  let tweetsArray:Array<any> = [];
  
 
  let params = new HttpParams().set('params',element.tag);
  
  var searchterm = 'query=' ;    
   params.append('Content-Type', 'application/X-www-form-urlencoded');
 this.http.post('/authorize2',searchterm,{params: params}).subscribe(
  (res) =>{
   
    response=res
    response.forEach(elemen => {
      var id_str=elemen.id_str;
      tweetsArray.push(id_str);
   
  }
  );
 

  
})
var put: TweetsArray={
  tag:element.tag,
  tweets:tweetsArray
}
TweetArray.push(put);

})

this.l.next(TweetArray);
})
}
getTrendingevents(artist:VlogerCard){
    let response;
    let tweetsArray:Array<any> = []; 
       let params = new HttpParams().set('params',artist.screen_name);
       var searchterm = 'query=' ;    
   params.append('Content-Type', 'application/X-www-form-urlencoded');
 this.http.post('/authorize3',searchterm,{params: params}).subscribe(
  (res) =>{
   
    response=res
    console.log(res);
    response.forEach(elemen => {
      var id_str=elemen.id_str;
      tweetsArray.push(id_str);
   
  }
  );
 

  
})



this.n.next(tweetsArray);

}
getTrending1(){
 
  let tweetsArray:Array<any> = [];
  this.trendingTweeters.subscribe(v=>{
  this.topTweets1=v;
  let response;
  let tag1:string;
  
 
  this.topTweets1.forEach(element => {
  
  
 
  let params = new HttpParams().set('params',element.user_id);
  
  var searchterm = 'query=' ;    
   params.append('Content-Type', 'application/X-www-form-urlencoded');
 this.http.post('/authorize1',searchterm,{params: params}).subscribe(
  (res) =>{
   
    response=res
      tweetsArray.push(response[0].id_str);
  
})

})

this.f.next(tweetsArray);
})
}
getTrending2(){
 
  let tweetsArray:Array<any> = [];
  this.musicTweeters.subscribe(v=>{
  this.musicTweets=v;
  let response;
  let tag1:string;
  
 
  this.musicTweets.forEach(element => {
  
  
 
  let params = new HttpParams().set('params',element.user_id);
  
  var searchterm = 'query=' ;    
   params.append('Content-Type', 'application/X-www-form-urlencoded');
 this.http.post('/authorize1',searchterm,{params: params}).subscribe(
  (res) =>{
   
    response=res
      tweetsArray.push(response[0].id_str);
  
})

})
this.k.next(tweetsArray);
})
}
}
