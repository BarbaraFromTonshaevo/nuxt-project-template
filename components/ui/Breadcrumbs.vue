<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.text"
        class="breadcrumbs__item"
      >
        <NuxtLink
          :to="item.url"
          class="breadcrumbs__link"
          :class="{
            'breadcrumbs__link--disabled': index == breadcrumbs.length - 1,
          }"
          >{{ item.text }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array, // указываем, что это массив
    required: true,
    validator: function (value) {
      return value.every((item) => {
        return typeof item.url === "string" && typeof item.text === "string";
      });
    },
  },
});
</script>

<style lang="scss">
.breadcrumbs {
  margin-bottom: 50px;
  &__list {
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    align-items: center;
  }
  &__item {
    font-size: 16px;
    display: flex;
    gap: 12px;
    &:not(:last-child) {
      &::after {
        content: "";
        display: block;
        height: 2px;
        width: 2px;
        border-radius: 50%;
        background-color: var(--breadcrumbs);
        margin: auto;
      }
    }
  }
  &__link {
    transition: color var(--time);
    &:hover {
      color: var(--text-accent);
    }
    &--disabled {
      pointer-events: none;
      color: var(--breadcrumbs);
    }
  }
}
@include tablet {
  .breadcrumbs {
    margin-bottom: 30px;
  }
}
@include tablet-s {
  .breadcrumbs {
    margin-bottom: 20px;
    &__item {
      font-size: 14px;
    }
  }
}
</style>