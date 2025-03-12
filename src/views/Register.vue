<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
              </ion-buttons>
              <ion-title>Register</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content :fullscreen="true" class="ion-padding">
            <ion-card class="ion-padding">
              <ion-card-header>
              </ion-card-header>
      
              <ion-card-content>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <!-- Email Input -->
                <ion-input
                  v-model="userCredentials.email"
                  label="Email"
                  label-placement="floating"
                  type="email"
                  placeholder="Enter email"
                ></ion-input>
                
                <!-- Password Input -->
                <ion-input
                  v-model="userCredentials.password"
                  label="Password"
                  label-placement="floating"
                  type="password"
                  placeholder="Enter password"
                  class="ion-margin-top"
                ></ion-input>

                                
                <ion-input
                  v-model="userCredentials.confirmPassword"
                  label="Confirm Password"
                  label-placement="floating"
                  type="password"
                  placeholder="Confirm password"
                  class="ion-margin-top"
                ></ion-input>
      
                <!-- Error Message -->
                <ion-text color="danger" v-if="errorMessage">
                  <p class="ion-padding-top">{{ errorMessage }}</p>
                </ion-text>
      
                <!-- Login Button -->
                <ion-button @click="signUp" expand="block" class="ion-margin-top" >
                  Register
                </ion-button>
                <ion-text>
                  <ion-button router-link="/auth">Log in</ion-button>
                </ion-text>

      
              </ion-card-content>
            </ion-card>
          </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import js-cookie
import { auth } from "@/firebase"; // Import Firebase auth
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons'; 

const userCredentials = ref({
  email: "",
  password: "",
  confirmPassword:"",
});

const errorMessage = ref("");

const signUp = async () => {
  errorMessage.value = "";

  if(userCredentials.value.password != userCredentials.value.confirmPassword || userCredentials.value.password == "" || userCredentials.value.confirmPassword == "")
  {
    errorMessage.value = "Password does not match";
  }
  else {
    try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userCredentials.value.email,
      userCredentials.value.password
    );

    const user = userCredential.user;

    // Store UID in cookies
    Cookies.set("uid", user.uid, { expires: 7 });
    router.push("/home");
  } catch (error) {
    errorMessage.value = "Error creating account. Try again.";
  }
  }


};

  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  