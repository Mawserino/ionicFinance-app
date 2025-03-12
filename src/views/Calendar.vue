<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-menu-toggle>
                  <ion-button>Menu</ion-button>
                </ion-menu-toggle>
              </ion-buttons>
              <ion-title>Calendar</ion-title>
            </ion-toolbar>
          </ion-header>
  
      <ion-content>
        <full-calendar :options="calendarOptions"></full-calendar>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { computed, ref, watch, onMounted } from "vue";
  import { userStore } from "@/store/user.js";
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  
  const store = userStore();
  
  const calendarOptions = ref({
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    events: computed(() =>
      store.records.map((record) => ({
        title: `${record.comment} - ${record.isExpense ? "-" : "+"}${record.value} PHP`,
        start: record.date,
      }))
    ),
  });
  
  // Update events dynamically
  watch(
    () => store.records,
    () => {
      calendarOptions.value.events = store.records.map((record) => ({
        title: `${record.comment} - ${record.isExpense ? "-" : "+"}${record.value} PHP`,
        start: record.date,
      }));
    },
    { deep: true }
  );
  
  onMounted(() => {
    store.fetchDataFromDB();
  });
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  