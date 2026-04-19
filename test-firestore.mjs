import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  try {
    const querySnapshot = await getDocs(collection(db, "veicoli"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.landing && data.landing.specificheHtml) {
        console.log("=== VEHICLE:", data.nome, "===");
        console.log(data.landing.specificheHtml.substring(0, 800));
        console.log("\n");
      }
    });
  } catch (e) {
    console.error("ERROR:", e);
  }
}

run();
