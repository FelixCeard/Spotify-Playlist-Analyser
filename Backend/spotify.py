import json
from logging import exception
from os import replace, write
import re
import spotipy
import math
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
from functions import *


with open('secrets.json', 'r') as file:
    secrets = json.loads(''.join(file.readlines()))

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=secrets['client_id'],
                                                           client_secret=secrets['client_secret']))
# url = 'spotify:playlist:2sN96BPN54sd0HWOilKwN7'

def get_playlist_tracks_infos(playlist_id, tot, collab = True):
    local_count = {}
    contributors = {}
    total_track_count = {}
    tracks = []
    IDS = []
    n = math.ceil(tot/100)
    for i in range(n):
        results = sp.playlist_items(playlist_id, limit=100, offset=i*100)
        for item in results['items']:
            if collab == True:
                song_adder = item['added_by']['id']
                if contributors.get(song_adder) == None:
                    contributors[song_adder] = 0
                if total_track_count.get(song_adder) == None:
                    total_track_count[song_adder] = 1
                else:
                    total_track_count[song_adder] += 1
                if local_count.get(song_adder) == None:
                    local_count[song_adder] = 0    
            local = item['is_local']
            if local == True:
                if collab == True:
                    local_count[song_adder] += 1
                else:
                    local_count['user'] += 1
            track_id  = item['track']['id']
            track_pop = item['track']['popularity']
            IDS.append(track_id)
            if collab == True:
                tracks.append({
                    'name': item['track']['name'],
                    'id': track_id,
                    'popularity': track_pop,
                    'local': local,
                    'adder': song_adder
                })
            else:
                tracks.append({
                    'name': item['track']['name'],
                    'id': track_id,
                    'popularity': track_pop,
                    'local': local
                })
    return (tracks, local_count, [i for i in contributors.keys()], total_track_count, IDS)

def get_playlist_infos(url):  
    playlist = sp.playlist(url)
    # print(playlist)   
    icon = "0"
    if len(playlist['images']) != 0:
        if playlist['images'][0]['height'] != "None":
            icon = playlist['images'][0]['url']
    collab = playlist['collaborative']
    description = playlist['description']
    followers = playlist['followers']['total']
    # images = playlist['images']
    name = playlist['name']
    owner = playlist['owner']
    total_tracks = playlist['tracks']['total']
    (trcks, lccount, contr, ttl_trck, idsssss) = get_playlist_tracks_infos(url, total_tracks, collab)
    # feats = sp.audio_features(idsssss)
    nfeat = 50
    track_features = []
    for count in range(math.ceil(total_tracks/nfeat)):
        batch = idsssss[(count*nfeat):(count*nfeat+nfeat)]
        batch = [b for b in batch if b != None]
        try:
            feats = sp.audio_features(batch)
        except:
            print("error",batch)
        for feature in feats:
            f = {}
            f['id'] = feature['id']
            f['danceability'] = feature['danceability']
            f['energy'] = feature['energy']
            f['key'] = feature['key']
            f['loudness'] = feature['loudness']
            f['mode'] = feature['mode']
            f['speechiness'] = feature['speechiness']
            f['acousticness'] = feature['acousticness']
            f['instrumentalness'] = feature['instrumentalness']
            f['liveness'] = feature['liveness']
            f['tempo'] = feature['tempo']
            f['duration_ms'] = feature['duration_ms']
            f['time_signature'] = feature['time_signature']
            track_features.append(f)
    # update the tracks information
    output_tracks = []
    for (track, feat) in zip(trcks, track_features):
        track.update(feat)
        output_tracks.append(track)
    return {
        'is_collab' : collab,
        'name' : name,
        'icon': icon,
        'description': description,
        'followers' : followers,
        'owner': owner,
        'local_tracks_count': lccount,
        'contributors': contr, 
        'total_track_count': ttl_trck,
        'track_infos': output_tracks
    }


# url = 'https://open.spotify.com/playlist/2sN96BPN54sd0HWOilKwN7?si=jGRqTC9QTmywa4LdrBj6DA'
# url = 'https://open.spotify.com/playlist/2KEZ0Nu1cC3WKBnDhHH58K?si=MPmq5E6CS0K-sGpXq1m68w'
# infos = ((get_playlist_infos(url)))
# with open('test.json', 'w', encoding='utf-8') as file:
#     file.write(json.dumps(infos, indent = 4))