<template>
<template>
    <UiError :title="$t('error')" :message="message"></UiError>
</template>

</template>

<script>
export default {
    props: ['message']
}
</script>