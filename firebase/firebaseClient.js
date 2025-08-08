// firebase/messaging.js
import { getMessaging } from "firebase/messaging";
import {app} from './firebaseConfig'

export const getMessagingInstance = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    return getMessaging(app);
  }
  return null;
};
