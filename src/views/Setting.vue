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
          <h1>hello</h1>
        </ion-card>
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
  </script>
  