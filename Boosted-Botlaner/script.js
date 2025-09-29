// script.js

// Fetch statistics from statistics.json and update the DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('statistics.json');
        if (!response.ok) throw new Error('Failed to load statistics.json');
        const stats = await response.json();

        // Update stats in the DOM
        document.querySelector('.stats-container li:nth-child(1)').textContent =
            `Total number of songs: ${stats.songs.total_number}`;
        document.querySelector('.stats-container li:nth-child(2)').textContent =
            `Total songs played: ${stats.songs.total_played}`;
        document.querySelector('.stats-container li:nth-child(3)').textContent =
            `Most played song: ${stats.songs.most_played_song.title} (${stats.songs.most_played_song.times_played} times / ${stats.songs.most_played_song.hours_played} hours)`;
        document.querySelector('.stats-container li:nth-child(4)').textContent =
            `Most active user: ${stats.songs.most_active_user.username} (${stats.songs.most_active_user.songs_listened} songs listened / ${stats.songs.most_active_user.hours_listened} hours listened)`;
        document.querySelector('.stats-container li:nth-child(5)').textContent =
            `Total playback time: ${stats.songs.total_playback_time_hours} hours`;
        const secondUl = document.querySelectorAll('.stats-container ul')[1];
        if (secondUl) {
            secondUl.querySelector('li:nth-child(1)').textContent =
                `Total number of songs tracked: ${stats.vladi_tracking.total_number_of_songs_tracked}`;
            secondUl.querySelector('li:nth-child(2)').textContent =
                `Total number of messages sent in his Twitch chat: ${stats.vladi_tracking.total_number_of_messages_sent}`;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
});