import { useMainInfoStore } from "~/stores/mainInfo";

// middleware/auth.js
export default function (context) {
    // Логика аутентификации
    useMainInfoStore().makeMenuInactive();
    if(document){
      document.body.classList.remove('no-scroll');
    }
  }