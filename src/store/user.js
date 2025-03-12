import { defineStore} from "pinia";
import { dataBase, auth } from '@/firebase.js'
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";

import Cookies from "js-cookie"; // Import js-cookie

const uid = Cookies.get("uid"); // Retrieve UID from cookies

export const userStore = defineStore('user', {
    state: () => ({
        records: []
    }),

    actions: {
        async fetchDataFromDB() {
            if (!auth.currentUser) {
                console.error("No authenticated user");
                return;
            }
            
            const docRef = doc(dataBase, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                this.records = [...docSnap.data().records];
            } else {
                console.log("No such document!");
            }
        },
    
        async addRecordToStore(record) {
            if (!auth.currentUser) {
                console.error("No authenticated user");
                return;
            }
        
            const userId = auth.currentUser.uid;
            const recordReference = doc(dataBase, "users", userId);
        
            try {
                const docSnap = await getDoc(recordReference);
        
                if (docSnap.exists()) {
                    // If the document exists, update it
                    await updateDoc(recordReference, {
                        records: arrayUnion(record)
                    });
                } else {
                    // If the document does not exist, create it first
                    await setDoc(recordReference, {
                        records: [record] // Create the "records" array with the new record
                    });
                }
        
                this.records.push(record);
            } catch (error) {
                console.error("Error updating Firestore:", error);
            }
        },
        logout() {
            this.records = []; // Reset records
          },
    }
    
})