<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <ion-card-title>Balance:</ion-card-title>
            </ion-col>
            <ion-col class="ion-text-end">
              <ion-card-title>{{ totalBalance }} PHP</ion-card-title>
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
        <ion-row v-for="(record, index) in recordsList" :key="index">
          <ion-col>
            <ion-card-title>{{ record.comment }}</ion-card-title>
            <ion-card-subtitle>{{ record.date }}</ion-card-subtitle>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-card-title :class="{ 'added-funds': !record.isExpense }">
              <span v-if="!record.isExpense">+</span>
              {{ record.value }} PHP
            </ion-card-title>
          </ion-col>
        </ion-row>
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
import { ref, computed } from "vue";
import {userStore} from "@/store/user.js";

const store = userStore()

const recordsList = ref([
]);

const isNewRecordWithExpenses = ref(false);
const isAddFundsModalOpen = ref(false);

const totalBalance = computed(() => {
  return recordsList.value.reduce((sum, el) => {
    if (el.isExpense) {
      return sum - Number(el.value)
    } else {
      return sum + Number(el.value)
    }
  }, 0)
})


const record = ref({
  comment: "",
  value: null,
});

const OpenFundsModal = (isExpenses) => {
  isNewRecordWithExpenses.value = isExpenses;
  record.value = { comment: "", value: null }; // Reset form inputs
  isAddFundsModalOpen.value = true;
};

const addFunds = () => {
  if (!record.value.comment || !record.value.value) return;

  const data = {
    ...record.value, date:new Date().toDateString()}
    data.isExpense = isNewRecordWithExpenses.value

  recordsList.value.push(data)

  store.addRecordToStore(data)
  
  record.value = {}
  dismiss();
};

const dismiss = () => {
  isAddFundsModalOpen.value = false;
};
</script>

<style scoped>
.added-funds {
  color: var(--ion-color-success);
}
</style>
