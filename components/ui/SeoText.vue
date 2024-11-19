<template>
  <div class="seo-text" :class="{ opened: isOpened },{'without-shield': withoutShield}" ref="root">
    <div class="seo-text__body" ref="body">
      <div class="seo-text__content" ref="content">
        <slot></slot>
      </div>
      <div class="seo-text__shield"></div>
    </div>
    <button class="seo-text__btn" @click="toggleText()">
      <span class="seo-text__close">{{ $t("text-close") }}</span>
      <span class="seo-text__open">{{ $t("text-open") }}</span>
      <svg>
        <use xlink:href="/images/icons/sprite.svg#arrow"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["closedHeight"],
  data: function () {
    return {
      isOpened: false,
      withoutShield: false,
      bodyElem: null,
      contentHeight: 0,
    };
  },
  mounted() {
    if (
      this.closedHeight >
      this.$el.querySelector(".seo-text__content").clientHeight
    ) {
      this.isOpened = true;
      this.withoutShield = true;
    } else {
      this.bodyElem = this.$el.querySelector(".seo-text__body");
      this.contentHeight =
        this.$el.querySelector(".seo-text__content").clientHeight;
      this.bodyElem.style.height = this.closedHeight + "px";
    }
  },
  methods: {
    toggleText() {
      this.isOpened = !this.isOpened;
      if (this.isOpened) {
        this.bodyElem.style.height =
          this.$el.querySelector(".seo-text__content").clientHeight + "px";
      } else {
        this.bodyElem.style.height = this.closedHeight + "px";
      }
    },
  },
};
</script>

<style lang="scss">
.seo-text {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.without-shield {
    .seo-text__btn {
      display: none;
    }
  }
  &__shield {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 180px;
    background-image: linear-gradient(transparent, var(--bg-prim));
    opacity: 1;
    transition: opacity var(--time);
  }
  &__body {
    position: relative;
    overflow: hidden;
    transition: height var(--time);
  }
  &__btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    gap: 5px;
    transition: color var(--time);
    color: var(--text-prim);
    svg {
      width: 32px;
      height: 32px;
      fill: transparent;
      stroke: var(--icon-prim);
      transform: rotate(-90deg);
      transition: stroke var(--time), transform var(--time);
    }
  }
  &__close {
    display: none;
  }
  &.opened {
    .seo-text__shield {
      opacity: 0;
    }
    .seo-text__btn {
      svg {
        transform: rotate(90deg);
      }
    }
    .seo-text__close {
      display: block;
    }
    .seo-text__open {
      display: none;
    }
  }
}
@include hover {
  .seo-text__btn:hover {
    color: var(--text-accent);
    svg {
      stroke: var(--icon-accent);
      transform: rotate(-90deg) translateX(-5px);
    }
  }
  .seo-text.opened .seo-text__btn:hover {
    svg {
      transform: rotate(90deg) translateX(-5px);
    }
  }
}
</style>
