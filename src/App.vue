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
          <ion-menu-toggle auto-hide="true">  <!-- Ensures menu closes when clicking an item -->
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



const store = userStore(); // Get Pinia store instance
const router = useRouter();

const logout = async () => {
  try {
    await signOut(auth);
    Cookies.remove("uid");
    store.logout();
    router.push("/"); // Redirect to login page after logout
  } catch (error) {
    console.error("Logout failed", error);
  }
};
</script>
