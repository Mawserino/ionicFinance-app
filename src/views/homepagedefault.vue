<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button>Menu</ion-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-card>
          <ion-card-header>
            <ion-row class="ion-align-items-center">
              <ion-col>
                <ion-card-title>Balance:</ion-card-title>
              </ion-col>
              <ion-col class="ion-text-end">
                <h2>{{ totalBalance }} PHP</h2>
              </ion-col>
            </ion-row>
          </ion-card-header>
        </ion-card>
  
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="OpenFundsModal(false)">
              Add Funds
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="danger" expand="block" @click="OpenFundsModal(true)">
              Reduce Funds
            </ion-button>
          </ion-col>
        </ion-row>
  
        <ion-card>
          <div class="data-records" v-for="(record, index) in store.records" :key="index">
            <ion-item lines="full">
              <ion-label>
                <h2>{{ record.comment }}</h2>
                <p>{{ record.date }}</p>
              </ion-label>
              <ion-note slot="end" :class="{ 'added-funds': !record.isExpense }">
                <span v-if="!record.isExpense">+</span>
                {{ record.value }} PHP
              </ion-note>
            </ion-item>
          </div>
        </ion-card>
  
        <ion-modal
          :is-open="isAddFundsModalOpen"
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
              v-model="record.comment"
              label="Comment"
              label-placement="floating"
              placeholder="Enter description"
            ></ion-input>
  
            <ion-input
              v-model.number="record.value"
              type="number"
              label="Amount"
              label-placement="floating"
              placeholder="Enter amount"
            ></ion-input>
  
            <ion-button class="ion-margin-top" expand="block" @click="addFunds">
              Submit
            </ion-button>
          </ion-content>
        </ion-modal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { computed, ref, watchEffect, onMounted } from "vue";
  import { userStore } from "@/store/user.js";
  import Cookies from "js-cookie"; 
  
  const store = userStore(); // ✅ Uses store data directly
  const isAddFundsModalOpen = ref(false);
  const isNewRecordWithExpenses = ref(false);
  const record = ref({ comment: "", value: null });
  
  // ✅ Reactively watch store.records to update UI
  watchEffect(() => {
  if (store.records.length > 0) {
    console.log("Records updated:", store.records);
  }
});
  
  // ✅ Compute total balance dynamically
  const totalBalance = computed(() => {
    return store.records.reduce((sum, el) => {
      return el.isExpense ? sum - Number(el.value) : sum + Number(el.value);
    }, 0);
  });
  
  const OpenFundsModal = (isExpenses) => {
    isNewRecordWithExpenses.value = isExpenses;
    record.value = { comment: "", value: null }; // Reset form inputs
    isAddFundsModalOpen.value = true;
  };
  
  // ✅ Function to add funds and update UI
  const addFunds = () => {
    if (!record.value.comment || !record.value.value) return;
  
    const data = { 
      ...record.value, 
      date: new Date().toISOString(), 
      isExpense: isNewRecordWithExpenses.value 
    };
  
    store.addRecordToStore(data); // ✅ Updates Pinia store
    record.value = {};
    dismiss();
  };
  
  const dismiss = () => {
    isAddFundsModalOpen.value = false;
  };
  
  // ✅ Fetch data if records are empty (only needed for direct page loads)
  onMounted(() => {
    if (store.records.length === 0) {
      console.log("Fetching records on HomePage mount...");
      store.fetchDataFromDB();
    }
  });
  </script>
  
  <style scoped>
  .added-funds {
    color: var(--ion-color-success);
  }
  .data-records {
    padding: 10px;
    border-radius: 8px;
    background: var(--ion-background-color);
    margin: 5px 0;
  }
  </style>
  