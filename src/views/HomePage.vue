<template>
  <ion-page>
    <!-- <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header> -->
    
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-row class="ion-align-items-center">
            <ion-col><ion-card-title>Balance: </ion-card-title></ion-col>
            <ion-col class="ion-text-end"><ion-card-title>1000 PHP </ion-card-title></ion-col>

          </ion-row>
        </ion-card-header>
      </ion-card>

      <ion-row>
        <ion-col>
          <ion-button expand="block">
            Add Funds
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button color="danger" expand="block">
            Reduce Funds
          </ion-button>
        </ion-col>
      </ion-row>
      
      <ion-card>
        <ion-row
          v-for="record, index in recordsList"
          :key="index"
        >
          <ion-col>
            <ion-card-title>
              {{record.comment}}
            </ion-card-title>
            <ion-card-subtitle>
              {{record.date}}
            </ion-card-subtitle>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-card-title :class="{'added-funds': !record.isExpense}">
              <span v-if="!record.isExpense">+</span>
              {{record.value}}
            </ion-card-title>
          </ion-col>
        </ion-row>
      </ion-card>



    </ion-content>
  </ion-page>
</template>

<script setup>
import {ref} from "vue";

const recordsList = ref([
  {
    comment: 'Initial funds',
    value: 1000,
    date: new Date().toDateString(),
    isExpense: false
  },
  {
    comment: 'Rent',
    value: 100,
    date: new Date().toDateString(),
    isExpense: true
  }
])
</script>

<style scoped>
.added-funds{
  color: var(--ion-color-success)
}
</style>
