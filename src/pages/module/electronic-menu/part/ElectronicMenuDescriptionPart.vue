<template>
  <template v-if='show'>
    <template v-if='description'>
      <div class='flex row no-wrap' :style='`--scale: ${ scale }; ${ rootStyle }`'>
        <div class='m--font--source-han-sans-sc --medium' style='font-size: calc(1vw * var(--scale)); margin-left: calc(1vw * var(--scale))'>
          <q-item-label>{{ description }}</q-item-label>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang='ts' src='./ElectronicMenuDescriptionPart.ts'/>
<style lang='scss' src='./ElectronicMenuDescriptionPart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuDescriptionPart.scoped.scss'/>
