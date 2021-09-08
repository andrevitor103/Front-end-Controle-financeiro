<template>
  <div>
    <div>
      <keep-alive>
        <component
          v-if="filterActive"
          v-bind:is="filterDashboard"
          @filterTableMain="toggleFilter($event)"
        />
      </keep-alive>
      <md-button
        class="md-fab md-mini md-plain"
        @click="toggleFilter()"
        style="display: flex"
      >
        <md-icon>search</md-icon>
      </md-button>

      <div v-if="!filterActive" id="teste">
        <chart-bar :data="graficBar" />
        <chart-line :data="graficLine" />
      </div>
    </div>
  </div>
</template>

<script>
import filterDashboard from "@/components/pages/FiltroTable";
import chartBar from "./chartBar";
import chartLine from "./chartLine";
import storageService from "@/services/storage.js";
import dashboarService from "@/services/dashboard.js";

export default {
  name: "dashboard-panel",
  components: {
    "chart-bar": chartBar,
    "chart-line": chartLine,
    "filter-charts": filterDashboard,
  },
  data() {
    return {
      filterActive: false,
      graficBar: [],
      graficLine: [],
      filterDashboard: filterDashboard,
      chartBar: chartBar,
    };
  },
  methods: {
    toggleFilter: function($event) {
      this.filterActive = !this.filterActive;
      this.clearAndGetDatasDashboard($event);
    },
    callGrafics() {
      this.$emit("createGrafic", { component: this });
    },
    async clearAndGetDatasDashboard($event) {
      await this.clearDashboard();
      this.getDatasGrafics($event);
    },
    clearDashboard() {
      this.graficBar = [];
      this.graficLine = [];
    },
    getDatasGrafics($event) {
      if ($event?.component) {
        dashboarService
          .filter($event.component.filter)
          .then((response) => {
            if ("Dashboard_error" in response.data) {
              this.graficBar.push([]);
            } else {
              this.graficBar.push(response.data.Dashboard);
            }
          })
          .catch((error) => {
            error;
          });

        dashboarService
          .filterLine($event.component.filter)
          .then((response) => {
            if ("Dashboard_error" in response.data) {
              this.graficLine.push([]);
            } else {
              this.graficLine.push(response.data.Dashboard);
            }
          })
          .catch((error) => {
            error;
          });
      }
    },
  },
  mounted() {
    storageService.userLoginSuccess("value");
    this.clearAndGetDatasDashboard();
  },
  created() {
    storageService.userLoginSuccess("value");
    this.clearAndGetDatasDashboard();
    this.toggleFilter(null);
  },
};
</script>

<style lang="css" scoped></style>
