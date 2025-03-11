import { defineStore} from "pinia";
import { dataBase} from '@/firebase.js'

import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";

export const userStore = defineStore('user', {
    state: () => ({
        records: []
    }),

    actions: {
        // async fetchDataFromDB() {
        //     const docRef = doc(dataBase, "users", auth.currentUser.uid);
        //     const docSnap = await getDoc(docRef);

        //     if (docSnap.exists()) {
        //         const data = docSnap.data()
        //         console.log("Document data:", docSnap.data());
        //         this.records = [...data.records]
        //     } else {
        //         // docSnap.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // },

        async addRecordToStore(record) {
            this.records.push(record)

            const recordReference = doc(dataBase, "users", "uhISgczVW2fUxa3iL1Cv");

// Atomically add a new region to the "regions" array field.
            await updateDoc(recordReference, {
                records: arrayUnion(record)
            });
        }

    }
})