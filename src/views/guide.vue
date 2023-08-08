<!-- driver.js demo -->
<template>
  <div>
    <div class="page-header">
      <h1>Page Header</h1>
    </div>
    <div class="top-nav">
      <ul>
        <li>Nav Item 1</li>
        <li>Nav Item 2</li>
        <li>Nav Item 3</li>
      </ul>
    </div>
    <div class="sidebar">
      <ul>
        <li>Sidebar Item 1</li>
        <li>Sidebar Item 2</li>
        <li>Sidebar Item 3</li>
      </ul>
    </div>
    <div class="footer">
      <p>Footer</p>
    </div>
  </div>
</template>

<script>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export default {
  name: 'GuideView',
  mounted() {
    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      showProgress: true,
      popover: {
        title: 'Style However You Want',
        description: 'You can use the default class names and override the styles or you can pass a custom class name to the popoverClass option either globally or per step.'
      },
      steps: [
        { element: '.page-header', popover: { title: 'Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sunt, assumenda amet, temporibus minima facilis repellendus cupiditate unde porro ex obcaecati, tempore quidem optio inventore cumque quam dolore sapiente deleniti.' } },
        { element: '.top-nav', popover: { title: 'Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sunt, assumenda amet, temporibus minima facilis repellendus cupiditate unde porro ex obcaecati, tempore quidem optio inventore cumque quam dolore sapiente deleniti.' } },
        { element: '.sidebar', popover: { title: 'Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sunt, assumenda amet, temporibus minima facilis repellendus cupiditate unde porro ex obcaecati, tempore quidem optio inventore cumque quam dolore sapiente deleniti.' } },
        { element: '.footer', popover: { title: 'Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus sunt, assumenda amet, temporibus minima facilis repellendus cupiditate unde porro ex obcaecati, tempore quidem optio inventore cumque quam dolore sapiente deleniti.' } },
      ]
    })

    driverObj.drive()
  },
}
</script>

<style lang="scss">
.driver-popover.driverjs-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
  color: #000;
}

.driver-popover.driverjs-theme button {
  flex: 1;
  text-align: center;
  background-color: #000;
  color: #ffffff;
  border: 2px solid #000;
  text-shadow: none;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 6px;
}

.driver-popover.driverjs-theme button:hover {
  background-color: #000;
  color: #ffffff;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

.driver-popover.driverjs-theme .driver-popover-close-btn {
  color: #9b9b9b;
}

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: #fde047;
}
</style>
