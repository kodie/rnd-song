# rnd-song

A node module that returns a random song/album/artist via the [Musixmatch API](https://developer.musixmatch.com).

## Installation & Usage
### via Module:
#### Installation:
```
$ npm i rnd-song -S
```
#### Usage:
```javascript
var rndSong = require('rnd-song');

var options = {
  api_key: 's3EAqFptASYO7YR2lLItZfcfOj0VCpvt',
  genre: 14,
  snippet: true,
  language: 'en'
};

rndSong(options, function(err, res) {
  if (!err) {
    console.log(`Snippet: ${res.snippet.snippet_body}`);
    console.log(`Track: ${res.track.track_name}`);
    console.log(`Album: ${res.track.album_name}`);
    console.log(`Artist: ${res.track.artist_name}`);
  } else { console.log(new Error(err)); }
});
```

### via Command Line Interface:
#### Installation:
```shell
$ npm i rnd-song -g
```
#### Usage:
```shell
$ export rndSong_api_key=s3EAqFptASYO7YR2lLItZfcfOj0VCpvt
$ export rndSong_language=en
$ rnd-song genre=14 snippet=true
```

## Options
* `api_key` - Your Musixmatch API Key. **(Required)**
* `genre` - The Musixmatch genre ID for the music genre that you would like your random song to be. (See [genres.json](https://github.com/kodie/rnd-song/blob/master/genres.json) for a list of genre IDs)
* `snippet` - Set to `true` to have the output include a small snippet of lyrics.
* `language` - The [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code for the language that you would like your random song to be. (ie. `en`)

## Output
Here is an example of what the response looks like:
```jsonp
{
   track: {
      track_id: 15257385,
      track_mbid: 'fa515490-6b24-4e54-9387-aed958600304',
      track_isrc: '',
      track_spotify_id: '',
      track_soundcloud_id: '',
      track_xboxmusic_id: '',
      track_name: 'Take a Bow',
      track_name_translation_list: [],
      track_rating: 100,
      track_length: 229,
      commontrack_id: 7754494,
      instrumental: 0,
      explicit: 0,
      has_lyrics: 1,
      has_subtitles: 1,
      num_favourite: 13475,
      lyrics_id: 12080868,
      subtitle_id: 13355994,
      album_id: 13638599,
      album_name: 'Good Girl Gone Bad',
      artist_id: 150259,
      artist_mbid: '73e5e69d-3554-40d8-8516-00cb38737a1c',
      artist_name: 'Rihanna',
      album_coverart_100x100: 'http://s.mxmcdn.net/images-storage/albums/nocover.png',
      album_coverart_350x350: '',
      album_coverart_500x500: '',
      album_coverart_800x800: '',
      track_share_url: 'https://www.musixmatch.com/lyrics/Rihanna/Take-a-Bow',
      track_edit_url: 'https://www.musixmatch.com/lyrics/Rihanna/Take-a-Bow/edit?utm_source=application&utm_campaign=api&utm_medium=Kodie+Grantham',
      commontrack_vanity_id: 'Rihanna/Take-a-Bow',
      restricted: 0,
      first_release_date: '2007-06-05T00: 00: 00Z',
      updated_time: '2016-03-25T05: 45: 13Z',
      primary_genres: {
         music_genre_list: [
            {
               "music_genre_id": 14,
               "music_genre_parent_id": 34,
               "music_genre_name": "Pop",
               "music_genre_name_extended": "Pop",
               "music_genre_vanity": "Pop"
            }
         ]
      },
      secondary_genres: {
         music_genre_list: []
      }
   },
   snippet: {
      snippet_id: 12080868,
      snippet_language: 'en',
      restricted: 0,
      instrumental: 0,
      snippet_body: 'But it\'s over now (but it\'s over now)',
      script_tracking_url: 'https://tracking.musixmatch.com/t1.0/m_js/e_0/sn_1/l_12080868/su_0/tr_VwPHgxSVfuIPJvwghgndMAbVlEgTMYDOJknA-zMFpPwbqm0z66GNIaXFcEz3QQPHzjuaECu6xhQ72jSi8xQj98kpU_6dvc_IoXs-T1kO-DfeFNHQUIuRDPQLNZ3A_mPuA6yNEvPbBTpu4nwnEF-d20v4IdOu9gTVuWZrU1ivZRVtZC0fubfXnP3G27k7tNLNE1FAOQWUxFsVWwcbqzkIqt24iuno_DYnM0Isl8hgl3NqGyBkAVPUkRoXYjT1ZGE3g3hME9iZAwyg4Cf2BOjeyzFzhExbYyMx_5fMfoGNa8W4GSFq8Wp_9Lfu0ZmYGXZ-MJbij0uhYO0ypjyDBQxR-EEEydMUg1BXGodOOLmnMppzjEizX_0G01AvyATZinLa/',
      pixel_tracking_url: 'https://tracking.musixmatch.com/t1.0/m_img/e_0/sn_1/l_12080868/su_0/tr_VwPHgxSVfuIPJvwghgndMAbVlEgTMYDOJknA-zMFpPwbqm0z66GNIaXFcEz3QQPHzjuaECu6xhQ72jSi8xQj98kpU_6dvc_IoXs-T1kO-DfeFNHQUIuRDPQLNZ3A_mPuA6yNEvPbBTpu4nwnEF-d20v4IdOu9gTVuWZrU1ivZRVtZC0fubfXnP3G27k7tNLNE1FAOQWUxFsVWwcbqzkIqt24iuno_DYnM0Isl8hgl3NqGyBkAVPUkRoXYjT1ZGE3g3hME9iZAwyg4Cf2BOjeyzFzhExbYyMx_5fMfoGNa8W4GSFq8Wp_9Lfu0ZmYGXZ-MJbij0uhYO0ypjyDBQxR-EEEydMUg1BXGodOOLmnMppzjEizX_0G01AvyATZinLa/',
      html_tracking_url: 'https://tracking.musixmatch.com/t1.0/m_html/e_0/sn_1/l_12080868/su_0/tr_VwPHgxSVfuIPJvwghgndMAbVlEgTMYDOJknA-zMFpPwbqm0z66GNIaXFcEz3QQPHzjuaECu6xhQ72jSi8xQj98kpU_6dvc_IoXs-T1kO-DfeFNHQUIuRDPQLNZ3A_mPuA6yNEvPbBTpu4nwnEF-d20v4IdOu9gTVuWZrU1ivZRVtZC0fubfXnP3G27k7tNLNE1FAOQWUxFsVWwcbqzkIqt24iuno_DYnM0Isl8hgl3NqGyBkAVPUkRoXYjT1ZGE3g3hME9iZAwyg4Cf2BOjeyzFzhExbYyMx_5fMfoGNa8W4GSFq8Wp_9Lfu0ZmYGXZ-MJbij0uhYO0ypjyDBQxR-EEEydMUg1BXGodOOLmnMppzjEizX_0G01AvyATZinLa/',
      updated_time: '2015-09-04T19: 49: 23Z'
   }
}
```

## License
MIT. See the License file for more info.
