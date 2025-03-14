<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Calendar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <full-calendar :options="calendarOptions"></full-calendar>

      <!-- Modal for event details -->
      <ion-modal :is-open="showModal" @didDismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ selectedDate }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list v-if="selectedEvents.length">
            <ion-item v-for="(event, index) in selectedEvents" :key="index">
              <ion-label>
                <h2>{{ event.title }}</h2>
                <p>Category: {{ event.category.value }}</p>
                <p>Amount: {{ event.expense.value ? '-' : '+' }} {{ event.extendedProps?.value || 'N/A' }} PHP </p>

              </ion-label>
            </ion-item>
          </ion-list>
          <ion-item v-else>
            <ion-label>No transactions for this date.</ion-label>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { userStore } from "@/store/user.js";
import { ref, onMounted, watch } from "vue";
import { onIonViewWillEnter } from "@ionic/vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Cookies from "js-cookie";
import { format } from "date-fns";

const store = userStore();
const isLoading = ref(true);
const showModal = ref(false);
const selectedDate = ref("");
const selectedEvents = ref([]);

// ✅ Function to format date safely
const formatDate = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return isNaN(parsedDate) ? "" : format(parsedDate, "yyyy-MM-dd");
};

const openModal = (info) => {
  const rawDate = new Date(info.event.start);
  selectedDate.value = isNaN(rawDate)
    ? "Invalid Date"
    : format(rawDate, "MMMM d yyyy"); // ✅ Format as "March 13 2025"
  
  selectedEvents.value = store.records
    .filter((record) => formatDate(record.date) === formatDate(rawDate))
    .map((record) => ({
      title: record.comment || "No Comment",
      extendedProps: { value: record.value ?? "N/A" },
      expense: {value: record.isExpense ?? "N/A"},
      category: {value: record.category ?? "N/A"},
    }));

  showModal.value = true;
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: [], // Start with an empty list
  eventClick: openModal,
  height: "auto",
});

// ✅ Function to update FullCalendar with stored records
const updateCalendarEvents = () => {
  if (!store.records) return;
  calendarOptions.value.events = store.records.map((record) => ({
    title: record.comment || "No Comment",
    start: formatDate(record.date),
    extendedProps: { value: record.value ?? "N/A" },
    expense: {Boolean: record.isExpense ?? "N/A"},
  }));
  
};

// ✅ Function to fetch user data and update calendar
const fetchUserData = async () => {
  isLoading.value = true;
  const uid = store.uid;
  if (uid) {
    await store.fetchUserData();
  }
  updateCalendarEvents();
  isLoading.value = false;
};

// 🔄 Watch store.records for changes and update FullCalendar automatically
watch(
  () => store.records,
  updateCalendarEvents,
  { deep: true }
);

onIonViewWillEnter(async () => {
  console.log("🔄 Reloading Calendar data...");
  isLoading.value = true;
  await store.fetchDataFromDB();
  store.records = [...store.records]; // ✅ Force UI refresh
  isLoading.value = false;
});

onMounted(async () => {
  isLoading.value = true;
  await store.fetchDataFromDB();
  updateCalendarEvents();
  isLoading.value = false;

  // Refresh calendar to apply changes
  setTimeout(() => {
    calendarOptions.value = { ...calendarOptions.value };
  }, 200);
});
</script>
