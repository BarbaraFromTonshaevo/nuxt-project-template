import { useMainInfoStore } from "~/stores/mainInfo";

// middleware/auth.js
export default function (context) {
    // Логика аутентификации
    useMainInfoStore().makeHeaderVisible();
  }