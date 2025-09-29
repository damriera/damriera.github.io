/* script-french.js */

// Récupère les statistiques depuis statistics.json et met à jour le DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('statistics.json');
        if (!response.ok) throw new Error('Impossible de charger statistics.json');
        const stats = await response.json();

        // Met à jour les statistiques dans le DOM
        document.querySelector('.stats-container li:nth-child(1)').textContent =
            `Nombre total de chansons : ${stats.songs.total_number}`;
        document.querySelector('.stats-container li:nth-child(2)').textContent =
            `Nombre total de chansons jouées : ${stats.songs.total_played}`;
        document.querySelector('.stats-container li:nth-child(3)').textContent =
            `Chanson la plus jouée : ${stats.songs.most_played_song.title} (${stats.songs.most_played_song.times_played} fois / ${stats.songs.most_played_song.hours_played} heures)`;
        document.querySelector('.stats-container li:nth-child(4)').textContent =
            `Utilisateur le plus actif : ${stats.songs.most_active_user.username} (${stats.songs.most_active_user.songs_listened} chansons écoutées / ${stats.songs.most_active_user.hours_listened} heures d'écoute)`;
        document.querySelector('.stats-container li:nth-child(5)').textContent =
            `Temps total d'écoute : ${stats.songs.total_playback_time_hours} heures`;
        const secondUl = document.querySelectorAll('.stats-container ul')[1];
        if (secondUl) {
            secondUl.querySelector('li:nth-child(1)').textContent =
                `Nombre total de chansons suivies : ${stats.vladi_tracking.total_number_of_songs_tracked}`;
            secondUl.querySelector('li:nth-child(2)').textContent =
                `Nombre total de messages envoyés sur son chat Twitch : ${stats.vladi_tracking.total_number_of_messages_sent}`;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques :', error);
    }
});