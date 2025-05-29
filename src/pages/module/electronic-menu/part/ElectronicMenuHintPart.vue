<template>
  <template v-if='show'>
    <template v-if='title && text'>
      <div :style='`--scale: ${ scale }; ${ rootStyle }`'>
        <div class='m--electron-menu--scroll-area--part--hint--card'>
          <div class='--title flex row flex-center'>
            <q-icon size='calc(1.2vw * var(--scale))' name='mdi-alert-circle-outline' style='transform: translate(0, calc(0.05vw * var(--scale)))'></q-icon>
            <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: calc(1.1vw * var(--scale)); margin-left: calc(0.2vw * var(--scale))'>{{ title }}</q-item-label>
          </div>
          <div class='--content'>
            <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: calc(1vw * var(--scale)); white-space: pre-line'>{{ text }}</q-item-label>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang='ts' src='./ElectronicMenuHintPart.ts'/>
<style lang='scss' src='./ElectronicMenuHintPart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuHintPart.scoped.scss'/>
