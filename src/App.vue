<template>
  <ion-app>
    <!-- Side Menu -->
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button />
          </ion-buttons>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="true">
            <ion-item router-link="/home">Home</ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle auto-hide="true">
            <ion-item router-link="/setting">Setting</ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle auto-hide="true">
            <ion-item router-link="/calendar">Calendar</ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle auto-hide="true">
            <ion-item button @click="logout">Logout</ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle auto-hide="true">
            <ion-item>
              <ion-label>Night Mode</ion-label>
              <ion-toggle :checked="isDarkMode" @ionChange="toggleDarkMode"></ion-toggle>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Main Content Area -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButtons, IonMenuButton } from '@ionic/vue';
import { useRouter } from "vue-router";
import { auth } from "@/firebase"; // Import Firebase auth
import { signOut } from "firebase/auth";
import Cookies from "js-cookie"; // Import js-cookie
import { userStore } from "@/store/user.js";
import { ref, watchEffect, onMounted } from "vue";

const store = userStore(); // ✅ Pinia store instance
const router = useRouter();
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

// ✅ Function to fetch user data (Runs only if records are empty)
const fetchUserData = async () => {
  const uid = Cookies.get("uid");
  if (uid) {
    console.log("Fetching user data for UID:", uid);
    await store.fetchDataFromDB();

    // ✅ Force Vue to detect changes by replacing the array
    store.records = [...store.records];  
    console.log("User data loaded:", store.records);
      
  } else {
    console.log("No user logged in");
    store.clearData();
  }
};

// ✅ Ensure data is loaded **only if necessary**
onMounted(() => {
  if (store.records.length === 0) {
    fetchUserData();
  }
});
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark-theme", isDarkMode.value);
  localStorage.setItem("darkMode", isDarkMode.value);
};

// ✅ Ensure correct theme on page load
watchEffect(() => {
  document.body.classList.toggle("dark-theme", isDarkMode.value);
});

const logout = async () => {
  try {
    await signOut(auth);
    Cookies.remove("uid");
    store.logout(); // ✅ Clears records in Pinia
    localStorage.removeItem("records"); // ✅ Clears stored data
    router.push("/"); // ✅ Redirects to login
  } catch (error) {
    console.error("Logout failed", error);
  }
};
</script>
