<template>
  <div v-if="props.status === 'pending' || props.status === 'fetching'">
    <div class="loader"></div>
  </div>
  <div v-else-if="props.status === 'success'">
      <slot></slot>
  </div>
  <div v-else>
    <UiError404 v-if="props.error.statusCode == 404"></UiError404>
    <UiErrorMessage v-else :message="props.error.cause.message"></UiErrorMessage>
  </div>
</template>

<script setup>
const props = defineProps(['status', 'error'])
</script>