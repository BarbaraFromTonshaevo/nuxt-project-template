<template>
    <div class="switch">
        <div class="switch-dot" ></div>
        <div class="switch-btn" 
            v-for="switchItem, index of items" 
            @click="changeActiveElem($event, switchItem)"
            :key="'switch'+index"
            >{{ switchItem }}</div>
    </div>
</template>

<script>
export default {
    props: ['items'],
    data: function(){
        return{
            dotElem: null,
        }
    },
    mounted(){
        this.dotElem = this.$el.querySelector(".switch-dot");
        this.$el.querySelector('.switch-btn').classList.add('active');
    },
    methods: {
        changeActiveElem(event, item){
            this.dotElem.style.left = event.target.getBoundingClientRect().left - this.$el.getBoundingClientRect().left + 'px';
            this.dotElem.style.width = event.target.clientWidth + 'px';
            this.$el.querySelector('.switch-btn.active').classList.remove('active');
            event.target.classList.add('active');
            this.$emit('changeSwitch', item);
        }
    }
}
</script>

<style lang="scss">
.switch{
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 50px;
    border: 1px solid var(--separator-light);
    margin: 0 auto;
    &-btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        padding: 0 30px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--text-sec);
        transition: color var(--time);
        &.active{
            color: var(--text-cntrst-prim);
        }
    }
    &-dot{
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        height: 100%;
        width: 125px;
        background-color: var(--bg-accent);
        border-radius: 50px;
        transition: left var(--time), width var(--time);
    }
}
</style>