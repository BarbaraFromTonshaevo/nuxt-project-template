<template>
  <div class="breadcrumbs container">
    <ul class="breadcrumbs__list">
      <li
        class="breadcrumbs__item"
        v-for="(item, index) in navList"
        :key="item.text"
      >
        <NuxtLink
          :to="localePath(item.url)"
          class="breadcrumbs__link"
          :class="{ disabled: index == navList.length - 1 }"
          >{{ item.text }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  navList: {
    type: Array,
    required: false,
    default: [],
  },
});
</script>

<style lang="scss">
.breadcrumbs {
  margin-bottom: 40px;
  &__list {
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
  }
  &__item {
    font-size: 13px;
    display: flex;
    gap: 12px;
    &:not(:last-child) {
      &::after {
        content: "/";
        display: block;
        color: var(--text-sec);
      }
    }
  }
  &__link {
    color: var(--text-sec);
    transition: color var(--time);
    &:hover {
      color: var(--text-prim);
    }
    &.disabled {
      pointer-events: none;
      color: var(--text-prim);
    }
  }
}
@include tablet-s {
  .breadcrumbs {
    margin-bottom: 20px;
    &__list {
      gap: 5px;
    }
    &__item {
      font-size: 12px;
      gap: 5px;
      &:last-child {
        display: -webkit-box;
        -webkit-line-clamp: 1; // количество строк
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>
