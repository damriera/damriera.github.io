document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('statistics.json');
        if (!response.ok) throw new Error('Impossible de charger statistics.json');
        const stats = await response.json();

        const heures_chanson_plus_jouee = (stats.songs.most_played_song.seconds_played / 3600).toFixed(2);
        const heures_total_lecture = (stats.songs.total_playback_time_seconds / 3600).toFixed(2);
        const heures_utilisateur_plus_actif = (stats.songs.most_active_user.seconds_listened / 3600).toFixed(2);

        const firstUl = document.querySelectorAll('.stats-container ul')[0];
        const secondUl = document.querySelectorAll('.stats-container ul')[1];
        const thirdUl = document.querySelectorAll('.stats-container ul')[2];

        if (firstUl) {
            firstUl.querySelector('li:nth-child(1)').textContent =
                `Nombre total d'utilisateurs sur le serveur : ${stats.general.total_number_of_users}`;
            firstUl.querySelector('li:nth-child(2)').textContent =
                `Nombre total de messages envoyés sur le serveur : ${stats.general.total_number_of_messages_sent}`;
            firstUl.querySelector('li:nth-child(3)').textContent =
                `Nombre total de commandes exécutées : ${stats.general.total_number_of_commands_executed}`;
            firstUl.querySelector('li:nth-child(4)').textContent =
                `Utilisateur le plus actif : ${stats.general.most_active_user.username} (${stats.general.most_active_user.messages_sent} messages)`;
        }

        if (secondUl) {
            secondUl.querySelector('li:nth-child(1)').textContent =
                `Nombre total de chansons : ${stats.songs.total_number}`;
            secondUl.querySelector('li:nth-child(2)').textContent =
                `Nombre total de chansons jouées : ${stats.songs.total_played}`;
            secondUl.querySelector('li:nth-child(3)').textContent =
                `Chanson la plus jouée : ${stats.songs.most_played_song.title} (${stats.songs.most_played_song.times_played} fois / ${heures_chanson_plus_jouee} heures)`;
            secondUl.querySelector('li:nth-child(4)').textContent =
                `Utilisateur le plus actif : ${stats.songs.most_active_user.username} (${stats.songs.most_active_user.songs_listened} chansons écoutées / ${heures_utilisateur_plus_actif} heures d'écoute)`;
            secondUl.querySelector('li:nth-child(5)').textContent =
                `Temps total d'écoute : ${heures_total_lecture} heures`;
        }

        if (thirdUl) {
            thirdUl.querySelector('li:nth-child(1)').textContent =
                `Nombre total de chansons suivies : ${stats.vladi_tracking.total_number_of_songs_tracked}`;
            thirdUl.querySelector('li:nth-child(2)').textContent =
                `Nombre total de messages envoyés sur son chat Twitch : ${stats.vladi_tracking.total_number_of_messages_sent}`;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques :', error);
    }
});