<template>
    <div class="file">
        <div class="file__first">
            <input type="file" id="file" class="file__input" @change="setFile">
            <label for="file" class="file__label">
                <svg class="file__icon">
                    <use :xlink:href="icon"></use>
                </svg>
                {{ title }}
            </label>
        </div>
        <div class="file__second">
            <div class="file__name"></div>
            <div class="file__delete" title="Удалить файл" @click="deleteFile"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['icon', 'title'],
    methods: {
        setFile(){
            let strName = this.$el.querySelector('.file__input').value.replace(/\\/g, "/").split('/').pop();
            this.$el.querySelector('.file__name').textContent = strName;
            this.$el.querySelector('.file__second').classList.add("active");
            this.$el.querySelector('.file__first').classList.add("hide");
            this.$emit('changeFile', this.$el.querySelector('.file__input').files[0]);
        },
        deleteFile(){
            this.$el.querySelector('.file__input').value = "";
            this.$el.querySelector('.file__name').textContent = "";
            this.$el.querySelector('.file__second').classList.remove("active");
            this.$el.querySelector('.file__first').classList.remove("hide");
            this.$emit('changeFile', null);
        }
    }
}
</script>

<style lang="scss">
.file{
    margin: 0 auto;
    width: fit-content;
    &__first{
        display: flex;
        width: fit-content;
        &.hide{
            display: none;
        }
    }
    &__input{
        display: none;
    }
    &__label{
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 12px;
        text-decoration: underline;
        text-decoration-skip-ink: none;
        text-underline-offset: 2px;
        transition: color var(--time);
    }
    &__icon{
        width: 24px;
        height: 24px;
        fill: var(--icon-prim);
        transition: fill var(--time);
    }
    &__second{
        display: none;
        width: fit-content;
        &.active{
            display: flex;
        }
    }
    &__name{
        display: inline;
    }
    &__delete{
        display: inline-block;
        width: 15px;
        height: 15px;
        cursor: pointer;
        position: relative;
        top: 3px;
        margin-left: 8px;
        &:before,
        &:after{
        content: "";
            width: 100%;
            height: 1px;
            background-color: red;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
        }
        &:before{
            transform: rotate(45deg);
        }
        &:after{
            transform: rotate(-45deg);
        }
    }
}
@include hover{
    .file__first:hover{
        .file__icon{
            fill: var(--icon-accent);
        }
        .file__label{
            color: var(--text-accent);
        }
    }
}
</style>