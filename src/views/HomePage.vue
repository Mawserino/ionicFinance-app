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
              <!-- <ion-card-title>{{ totalBalance }}</ion-card-title> -->
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

<!-- <script setup>
import { computed, ref, onMounted } from "vue";
import { personOutline } from "ionicons/icons";
import { userStore } from "@/store/user.js";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import js-cookie

const uid = Cookies.get("uid"); // Retrieve UID from cookies

console.log("User UID:", uid);


const store = userStore()

const recordsList = ref([
]);

const isNewRecordWithExpenses = ref(false);
const isAddFundsModalOpen = ref(false);

const totalBalance = computed(() => {
  return store.records.reduce((sum, el) => {
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
  console.log("User UID:", uid);
};

const fetchUserData = () => {
  const uid = Cookies.get("uid");
  if (uid) {
    console.log("Fetching data for UID:", uid);
    store.fetchDataFromDB();
  } else {
    console.log("No user logged in");
    store.clearData(); // Clear records when no user is logged in
  }
};

const addFunds = () => {
  if (!record.value.comment || !record.value.value) return;

  const data = {
    ...record.value, date: new Date().toISOString()}
    data.isExpense = isNewRecordWithExpenses.value

  recordsList.value.push(data)

  store.addRecordToStore(data)
  
  record.value = {}
  dismiss();
};

const dismiss = () => {
  isAddFundsModalOpen.value = false;
};

onMounted(fetchUserData);

</script> -->

<script setup>
import { computed, ref } from "vue";
import { userStore } from "@/store/user.js";
import Cookies from "js-cookie"; 

const store = userStore(); // ✅ Uses store data directly

const recordsList = ref([]);
const isNewRecordWithExpenses = ref(false);
const isAddFundsModalOpen = ref(false);

const totalBalance = computed(() => {
  return store.records.reduce((sum, el) => {
    return el.isExpense ? sum - Number(el.value) : sum + Number(el.value);
  }, 0);
});

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

  const data = { ...record.value, date: new Date().toISOString(), isExpense: isNewRecordWithExpenses.value };
  
  recordsList.value.push(data);
  store.addRecordToStore(data);
  
  record.value = {};
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
.data-records {
  
  padding: 10px;
  border-radius: 8px;
  background: var(--ion-background-color);
  margin: 5px 0;
}

</style>
