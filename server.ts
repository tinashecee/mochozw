import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as compression from 'compression';
import * as express from 'express';
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
const fs = require('fs');
const path = require('path');
const filterEnv = require('filter-env');
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
enableProdMode();
const dotenv = require('dotenv');
var Twitter = require('twitter');
dotenv.config();
const config = filterEnv(/(BB_\w+)/, {json: true, freeze: true});

const PORT = process.env.BB_PORT || 8000 ;
const request=require('request');
var bodyParser = require('body-parser');
// Provide support for window on the server
const domino = require('domino');
const template = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
const fetch = require('node-fetch');
const win = domino.createWindow(template);

win.fetch = fetch;
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
global ['WebSocket'] = require('ws');
global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Config renderer
try {
  app.engine('html', (_, options, callback) => {
    const engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'REQUEST', useFactory: () => options.req, deps: [] },
        { provide: 'CONFIG', useFactory: () => config, deps: [] }
      ]
    });
    engine(_, options, callback);
  });
} catch (e) {
  console.log('error', 'there is sonme issue defining app engine ' + e);
}

// configs
app.enable('etag');

// Middleware
app.use(compression());

app.set('view engine', 'html');
app.set('views', 'dist/browser');
app.set('view cache', true);
app.use('/', express.static('dist/browser', { index: false, maxAge: 30 * 86400000 }));

// All regular routes use the Universal engine
app.get('', (req, res) => {
    res.render('index', {
        req: req,
        res: res,
        preboot: true
      });
  });
app.get('/env', (req, res) => {
  res.json(process.env);
})

app.post('/authorize', (req,res)=>{

  var header = process.env.consumerkey + ':' +process.env.consumersecret;
  var encheader = new Buffer(header).toString('base64');
  var finalheader = 'Basic ' + encheader;
  request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
  headers: {Authorization: finalheader}}, function(error, response, body) {
      if(error)
      console.log(error);
      else {
          process.env.bearertoken = JSON.parse(body).access_token;
          var myFilter= "-filter:retweets -filter:replies -filter:links -filter:images -filter:videos";
          var searchquery = req.param('params')+myFilter;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + process.env.bearertoken;

        request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
         '&result_type=recent&include_entities=false', {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 res.json({ data:JSON.parse(body.body).statuses});
             }
         })
    }
      }
      
  )
});
app.post('/authorize3', (req,res)=>{

  var header = process.env.consumerkey + ':' +process.env.consumersecret;
  var encheader = new Buffer(header).toString('base64');
  var finalheader = 'Basic ' + encheader;
  request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
  headers: {Authorization: finalheader}}, function(error, response, body) {
      if(error)
      console.log(error);
      else {
          process.env.bearertoken = JSON.parse(body).access_token;
          var myFilter= "#mocho";
          var searchquery = req.param('params')+myFilter;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + process.env.bearertoken;

        request.get('https://api.twitter.com/1.1/search/tweets.json?q=from:'+encsearchquery +
         '&result_type=recent&include_entities=false', {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 res.json({ data:JSON.parse(body.body).statuses});
             }
         })
    } 
      }
      
  )
});
app.post('/authorize1', (req,res)=>{

  var header = process.env.consumerkey + ':' +process.env.consumersecret;
  var encheader = new Buffer(header).toString('base64');
  var finalheader = 'Basic ' + encheader;
  request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
  headers: {Authorization: finalheader}}, function(error, response, body) {
      if(error)
      console.log(error);
      else {
          process.env.bearertoken = JSON.parse(body).access_token;
          var myFilter= "-filter:retweets -filter:replies -filter:links -filter:images -filter:videos";
          var searchquery = req.param('params')+myFilter;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + process.env.bearertoken;

        var client = new Twitter({
          consumer_key: process.env.consumerkey,
          consumer_secret: process.env.consumersecret,
          bearer_token:  process.env.bearertoken
        });
        var params = {screen_name:  req.param('params'),count:1};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    res.json(tweets)
  }
});
    }
      }
      
  )
});
app.post('/authorize2', (req,res)=>{

  var header = process.env.consumerkey + ':' +process.env.consumersecret;
  var encheader = new Buffer(header).toString('base64');
  var finalheader = 'Basic ' + encheader;
  request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
  headers: {Authorization: finalheader}}, function(error, response, body) {
      if(error)
      console.log(error);
      else {
          process.env.bearertoken = JSON.parse(body).access_token;
          var myFilter= "-filter:retweets -filter:replies -filter:links -filter:images -filter:videos";
          var searchquery = req.param('params')+myFilter;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + process.env.bearertoken;

        var client = new Twitter({
          consumer_key: process.env.consumerkey,
          consumer_secret: process.env.consumersecret,
          bearer_token:  process.env.bearertoken
        });
        var params = {screen_name:  req.param('params'),count:10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    res.json(tweets)
  }
});
    }
      }
      
  )
});
app.post('/topvlogers', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics';
  
  fetch(`${url}&id=${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)
    });
  
});
app.post('/trendingvideos1', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics';
  
  fetch(`${url}&id=${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)
    });
  
});
app.post('/trendingvideos', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics';
  
  fetch(`${url}&id=${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)
    });
  
}); 
app.post('/trendingvids', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount';
  
  fetch(`${url}&q=%23${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)
    });
  
}); 
app.post('/topcomment', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance';

  fetch(`${url}&videoId=${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)});
  
});
app.post('/videos', async (req, res) => {
  var searchquery = req.param('params');
  const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';

  fetch(`${url}&playlistId=${searchquery}&key=${'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE'}`)
    .then(response => response.json()).
    then(json=> {res.json(json.items)});
  
}); 
 app.listen(PORT,() => {
   console.log(`we are serving the site for you at http://localhost:${PORT}!`);
 });