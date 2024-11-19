<template>
  <div>
    <AppHeader :isHidden="mainInfoStore.headerIsHidden"></AppHeader>
    <main class="main">
      <slot />
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainInfoStore } from "~/stores/mainInfo";
const mainInfoStore = useMainInfoStore();
const route = useRoute();

let lastScrollY = 0; // Для хранения предыдущей позиции прокрутки
const handleScroll = () => {
  const currentScrollY = window.scrollY; // Текущая позиция прокрутки
  // Если мы прокручиваем вниз
  if (currentScrollY > lastScrollY) {
    mainInfo.makeHeaderHidden(); // Скрыть шапку
  } else {
    mainInfo.makeHeaderVisible(); // Показать шапку
  }
  lastScrollY = currentScrollY; // Обновляем последнюю позицию прокрутки
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll); // Добавляем слушатель события
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll); // Удаляем слушатель события
});
</script>

<style lang="scss">
*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
*::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color: var(--separator-dark);
  border-radius: 3px;
  &:hover {
    background-color: var(--separator-cntrst-sec);
  }
}

// body {
  // padding-top: calc(var(--header-height) + var(--header-main-gap));
// }
.main {
  min-height: 100vh;
  padding-top: calc(var(--header-height) + var(--header-main-gap));
}
@include tablet-s {
  // body {
  //   padding-top: calc(var(--header-height) + 40px);
  // }
}
</style>
