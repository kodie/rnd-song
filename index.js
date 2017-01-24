'use strict';

var promise = require('promise');
var promiseRetry = require('promise-retry');
var request = require('request');
const pIf = require('p-if');

var apiKey;
var genre;
var snippet;
var language;
var baseURL = 'https://api.musixmatch.com/ws/1.1';

function getRandomTrack() {
  return new Promise(function (fulfill, reject){
    var url = `${baseURL}/track.search?format=json&apikey=${apiKey}&s_track_rating=desc`;
    if (genre) { url += `&f_music_genre_id=${genre}`; }
    if (snippet) { url += `&f_has_lyrics=1`; }
    if (language) { url += `&f_lyrics_language=${language}`; }
    request.get(url + `&page_size=1`, function(error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        var available = body.message.header.available;
        if (available > 0) {
          var pages = Math.ceil(available / 100);
          var page = Math.floor((Math.random() * pages) + 1);
          request.get(url + `&page_size=100&page=${page}`, function(error, response, body) {
            if (!error) {
              body = JSON.parse(body);
              var tracks = body.message.body.track_list;
              if (tracks.length > 0) {
                var rnd = Math.floor((Math.random() * tracks.length));
                fulfill(tracks[rnd]);
              } else { reject('No tracks found'); }
            } else { reject(error); }
          });
        } else { reject('No tracks found'); }
      } else { reject(error); }
    })
  });
}

function getById(type, id) {
  return new Promise(function (fulfill, reject){
    var url = `${baseURL}/${type}.get?format=json&apikey=${apiKey}`;
    if (type == 'artist') { url += `&artist_id=${id}`; }
    if (type == 'album') { url += `&album_id=${id}`; }
    if (type == 'track') { url += `&track_id=${id}`; }
    if (type == 'track.lyrics') { url += `&track_id=${id}`; }
    if (type == 'track.subtitle') { url += `&track_id=${id}`; }
    if (type == 'track.snippet') { url += `&track_id=${id}`; }
    request.get(url, function(error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        if (body.message.body) {
          fulfill(body.message.body);
        } else { reject('Item not found'); }
      } else { reject(error); }
    });
  });
}

module.exports = function(options, cb) {
  apiKey = options.api_key;
  genre = options.genre;
  snippet = options.snippet;
  language = options.language;

  promiseRetry(function(retry, number) {
    return getRandomTrack()
      .then(pIf(snippet, function(t){
        return getById('track.snippet', t.track.track_id)
          .then(function(s){ t.snippet = s.snippet; return t; })
          .catch(retry);
        })
      );
  }, {
    retries: 4,
    minTimeout: 0,
    maxTimeout: 0
  })
  .then(function(t){
    cb(null, t);
  })
  .catch(function(e){
    cb(e);
  });
}
