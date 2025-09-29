// script.js

// Fetch statistics from statistics.json and update the DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('statistics.json');
        if (!response.ok) throw new Error('Failed to load statistics.json');
        const stats = await response.json();

        most_played_song_hours = stats.songs.most_played_song.seconds_played / 3600;
        total_playback_time_hours = stats.songs.total_playback_time_seconds / 3600;
        most_active_user_hours = stats.songs.most_active_user.seconds_listened / 3600;

        const firstUl = document.querySelectorAll('.stats-container ul')[0];
        const secondUl = document.querySelectorAll('.stats-container ul')[1];
        const thirdUl = document.querySelectorAll('.stats-container ul')[2];

        if (firstUl) {
            firstUl.querySelector('li:nth-child(1)').textContent =
                `Total number of users in the server: ${stats.general.total_number_of_users}`;
            firstUl.querySelector('li:nth-child(2)').textContent =
                `Total number of messages sent in the server: ${stats.general.total_number_of_messages_sent}`;
            firstUl.querySelector('li:nth-child(3)').textContent =
                `Total number of commands executed: ${stats.general.total_number_of_commands_executed}`;
            firstUl.querySelector('li:nth-child(4)').textContent =
                `Most active user: ${stats.general.most_active_user.username} (${stats.general.most_active_user.messages_sent} messages)`;
        }

        if (secondUl) {
            secondUl.querySelector('li:nth-child(1)').textContent =
                `Total number of songs: ${stats.songs.total_number}`;
            secondUl.querySelector('li:nth-child(2)').textContent =
                `Total songs played: ${stats.songs.total_played}`;
            secondUl.querySelector('li:nth-child(3)').textContent =
                `Most played song: ${stats.songs.most_played_song.title} (${stats.songs.most_played_song.times_played} times / ${most_played_song_hours} hours)`;
            secondUl.querySelector('li:nth-child(4)').textContent =
                `Most active user: ${stats.songs.most_active_user.username} (${stats.songs.most_active_user.songs_listened} songs listened / ${most_active_user_hours} hours listened)`;
            secondUl.querySelector('li:nth-child(5)').textContent =
                `Total playback time: ${total_playback_time_hours} hours`;
        }

        if (thirdUl) {
            thirdUl.querySelector('li:nth-child(1)').textContent =
                `Total number of songs tracked: ${stats.vladi_tracking.total_number_of_songs_tracked}`;
            thirdUl.querySelector('li:nth-child(2)').textContent =
                `Total number of messages sent in his Twitch chat: ${stats.vladi_tracking.total_number_of_messages_sent}`;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
});