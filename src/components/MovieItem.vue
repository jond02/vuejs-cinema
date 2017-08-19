<template>
    <div class="movie">
        <div class="movie-col-left">
            <img v-bind:src="movie.Poster"/>
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movie.Title }}</h2>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
            <div class="movie-sessions">
                <div v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
                    <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import times from "../util/times";

    export default {
        props: ["movie", "sessions", "day", "time"],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format("h:mm A");
            },
            filteredSessions(sessions) {
                return sessions.filter(this.sessionPassesTimeFilter);
            },
            sessionPassesTimeFilter(session) {

                if (!this.day.isSame(this.$moment(session.time), "day")) {
                    //is the session on the same day
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2) {
                    //if both filters are selected then show all
                    return true;
                } else if (this.time[0] === times.AFTER_6PM) {
                    //if only one filter is selected, check if it is after 6
                    //only show movies after 6
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    //filter is before 6, show those movies
                    return this.$moment(session.time).hour() < 18;
                }
            }
        }
    }

</script>