<template>
  <div class="loading-indicator-wrapper">
    <div class="aether-spinner">
      <div class="rect-one" />
      <div class="rect-two" />
      <div class="rect-three" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingIndicator',
}
</script>

<style lang="scss" scoped>
.loading-indicator-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20px;

  .aether-spinner {
    display: flex;
    justify-content: space-between;
    width: var(--as-size, 16px);
    height: var(--as-size, 16px);
    text-align: center;
    font-size: var(--as-font-size, 10px);

    > div {
      height: 100%;
      width: 4px;
      background-color: var(--as-content-color-tertiary, #a6a6a6);
      opacity: 0.2;
      border-radius: var(--as-border-radius-default, 4px);
      animation: spinner-bounce 0.6s infinite ease-in-out;
      transform-origin: center;
    }
    .rect-two {
      animation-delay: 0.15s;
    }
    .rect-three {
      animation-delay: 0.3s;
    }
  }
}

@keyframes spinner-bounce {
  0%,
  100% {
    transform: scaleY(0.4);
    opacity: 0.8;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
