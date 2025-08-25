import json

with open('vladi_playlist/playlist.json', 'r') as file:
    data = json.load(file)
    num_songs = len(data.get("songs", []))
    print("Number of songs in playlist:", num_songs)