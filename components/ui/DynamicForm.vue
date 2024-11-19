<template>
    <Form @submit="onSubmit" :id="schema.id">
        <div
            v-for="{ as, name, label, children,  ...attrs } in schema.fields"
            :key="name"
            class="form-item"
        >
            <Field :as="as" :id="name" :name="name" v-bind="attrs" class="form-field" :placeholder="label" autocomplete="off"></Field>
            <ErrorMessage :name="name" class="form-error"/>
        </div>
        <UiFileForm v-if="schema.file" @changeFile="changeFile" :title="$t('form-file')" :icon="'/images/icons/sprite.svg#clip'"></UiFileForm>
        <button class="form-submit btn btn--prim" type="submit">
            {{ $t("form-send") }}
            <svg>
                <use xlink:href="/images/icons/sprite.svg#arrow"></use>
            </svg>
        </button>
        <div class="form-agreement">
            {{ $t("form-agreement") }} 
            <NuxtLink :to="localePath('/page/policy-privacy')" target="_blank">{{ $t("form-agreement-policy") }}</NuxtLink>
            {{ $t("and") }}
            <NuxtLink :to="localePath('/page/user-agreement')" target="_blank">{{ $t("form-agreement-user") }}</NuxtLink>.
        </div>
    </Form>
  </template>

  <script>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  export default {
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data: function(){
        return {
            file: null,
        }
    },
    props: {
      schema: {
        type: Object,
        required: true,
      },
    },
    methods: {
        onSubmit(values, {resetForm}){
            let form = values;
            form["webform_id"] = this.schema.id;
            if(this.schema.file){
                form = {... form, file: this.file};
            }
            this.$emit('sendForm', form);
            //отчистить форму
            resetForm();
        },
        changeFile(value){
            this.file = value;
        }
    }
  };
  </script>

<style lang="scss">
.form-submit{
    margin: 40px auto 20px;
    gap: 10px;
    svg{
        width: 32px;
        font: 32px;
        fill: transparent;
        stroke: var(--icon-accent);
        transform: rotate(180deg);
        transition: stroke var(--time);
    }
}
@include hover{
    .form-submit:hover{
        svg{
            stroke: var(--icon-cntrst);
        }
    }
}
</style>