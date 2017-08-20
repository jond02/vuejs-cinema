
import Vue from "vue";
import "./style.scss";
import VueResource from "vue-resource";
import { checkFilter, setDay } from "./util/bus"
import VueRouter from 'vue-router';
import routes from "./util/routes";

import moment from "moment-timezone";
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, "$moment", { get() { return this.$root.moment } });

Vue.use(VueResource);
Vue.use(VueRouter);

const bus = new Vue();
Object.defineProperty(Vue.prototype, "$bus", {get() {return this.$root.bus}});

const router = new VueRouter({ routes });

new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get("/api").then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));

        this.$bus.$on("set-day", setDay.bind(this));
    },
    router
});