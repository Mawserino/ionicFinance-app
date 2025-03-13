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
import { userStore } from "@/store/user.js";
import { ref, onMounted, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Cookies from "js-cookie";

const store = userStore(); // 🏪 Access Pinia store

// ✅ Function to format date for FullCalendar
const formatDate = (date) => new Date(date).toISOString().split("T")[0];

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: [], // Start with an empty list
  height: "auto",
});

// ✅ Function to update FullCalendar with stored records
const updateCalendarEvents = () => {
  calendarOptions.value.events = store.records.map((record) => ({
    title: `${record.comment} - ${record.isExpense ? "-" : "+"}${record.value} PHP`,
    start: formatDate(record.date),
  }));

  console.log("Updated Events for Calendar:", calendarOptions.value.events);
};

// ✅ Function to fetch user data and update calendar
const fetchUserData = async () => {
  const uid = Cookies.get("uid");
  if (uid) {
    console.log("Fetching data for UID:", uid);
    await store.fetchDataFromDB(); // Ensure async call finishes
  } else {
    console.log("No user logged in");
    store.clearData(); // Clear records when no user is logged in
  }

  updateCalendarEvents(); // ✅ Ensure FullCalendar updates after fetching
};

// 🔄 Watch store.records for changes and update FullCalendar automatically
watch(
  () => store.records,
  updateCalendarEvents,
  { deep: true }
);

// 🚀 Fetch user data when component mounts
onMounted(() => {
  fetchUserData();

  // 🛠 Force re-render after delay to fix initial rendering issue
  setTimeout(() => {
    calendarOptions.value = { ...calendarOptions.value };
  }, 200);
});
</script>
