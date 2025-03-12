<template>
    <ion-menu content-id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item router-link="/home">Home</ion-item>
            <ion-item router-link="/settings">Settings</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
</template>