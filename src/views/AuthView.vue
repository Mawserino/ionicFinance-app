<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card class="ion-padding">
        <ion-card-header>
          <ion-card-title>Welcome Back</ion-card-title>
          <ion-card-subtitle>Sign in to continue</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <!-- Email Input -->
          <ion-input
            v-model="userCredentials.email"
            label="Email"
            label-placement="floating"
            type="email"
            placeholder="Enter your email"
          ></ion-input>
          
          <!-- Password Input -->
          <ion-input
            v-model="userCredentials.password"
            label="Password"
            label-placement="floating"
            type="password"
            placeholder="Enter your password"
            class="ion-margin-top"
          ></ion-input>

          <!-- Error Message -->
          <ion-text color="danger" v-if="errorMessage">
            <p class="ion-padding-top">{{ errorMessage }}</p>
          </ion-text>

          <!-- Login Button -->
          <ion-button expand="block" class="ion-margin-top" @click="login">
            Login
          </ion-button>

          <!-- Signup Button -->
          <ion-button expand="block" fill="outline" class="ion-margin-top" @click="signUp">
            Sign Up
          </ion-button>

          <!-- Google Sign-In Button -->
          <ion-button expand="block" fill="clear" color="medium" class="ion-margin-top" @click="signInWithGoogle">
            <ion-icon name="logo-google" slot="start"></ion-icon>
            Sign in with Google
          </ion-button>

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

const router = useRouter();

const userCredentials = ref({
  email: "",
  password: "",
});

const errorMessage = ref("");

// Login function
const login = async () => {
  errorMessage.value = "";

  if (!userCredentials.value.email || !userCredentials.value.password) {
    errorMessage.value = "Please fill in both fields.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userCredentials.value.email,
      userCredentials.value.password
    );

    const user = userCredential.user;

    // Store UID in cookies
    Cookies.set("uid", user.uid, { expires: 7 }); // Expires in 7 days
    router.push("/home"); // Redirect to home page
  } catch (error) {
    errorMessage.value = "Invalid email or password.";
  }
};

// Signup function
const signUp = async () => {
  errorMessage.value = "";

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
};

// Google Sign-In function
const signInWithGoogle = async () => {
  errorMessage.value = "";
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Store UID in cookies
    Cookies.set("uid", user.uid, { expires: 7 });
    router.push("/home");
  } catch (error) {
    errorMessage.value = "Google sign-in failed. Try again.";
  }
};

// Logout function (Clears cookies)
// const logout = async () => {
//   try {
//     await signOut(auth); // Firebase sign-out
//     Cookies.remove("uid"); // Remove UID from cookies
//     router.push("/login"); // Redirect to login page
//   } catch (error) {
//     errorMessage.value = "Logout failed. Try again.";
//   }
// };
</script>

<style scoped>
.invalid {
  border: 1px solid var(--ion-color-danger);
  border-radius: 5px;
}
</style>
