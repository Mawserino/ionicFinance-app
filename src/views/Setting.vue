<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>Menu</ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="OpenCategoriesModal()">Add Categories</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h4>Night Mode</h4>
          </ion-col>
          <ion-col>
            <ion-toggle :checked="isDarkMode" @ionChange="toggleDarkMode"></ion-toggle>
          </ion-col>
        </ion-row>
      </ion-card>

      <ion-modal
      :is-open="isAddCategoriesModalOpen"
      @will-dismiss="dismiss"
      :initial-breakpoint="0.5"
      :breakpoints="[0, 0.5, 1]"
      handle-behavior="cycle"
    >
      <ion-header>
        <ion-toolbar>
          <ion-button @click="dismiss">Close</ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-input
        v-model="category.input"
        label="Category"
        label-placement="floating"
        placeholder="Enter category"
      ></ion-input>


        <ion-button class="ion-margin-top" expand="block" @click="addCategories">
          Submit
        </ion-button>
      </ion-content>
    </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonButtons, 
  IonMenuToggle, 
  IonButton 
} from '@ionic/vue';
import { computed, ref, onMounted } from "vue";
import { onIonViewWillEnter } from '@ionic/vue';
import { userStore } from "@/store/user.js";


const store = userStore();
const isAddCategoriesModalOpen = ref(false);
const category = ref({ input: ""});
const isDarkMode = ref(localStorage.getItem("darkMode") === "true");


const OpenCategoriesModal = () => {
category.value = {input: ""};
isAddCategoriesModalOpen.value = true;
};

const dismiss = () => {
  isAddCategoriesModalOpen.value = false;
};

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.body.classList.toggle("dark-theme", isDarkMode.value);
    localStorage.setItem("darkMode", isDarkMode.value);
};

const addCategories = () => {
  if (!category.value.input) return;

  const data = { 
    ...category.value
  };



  store.addCategoriesToStore(data); // ✅ Updates Pinia store
  category.value = {};
  dismiss();
};
</script>
