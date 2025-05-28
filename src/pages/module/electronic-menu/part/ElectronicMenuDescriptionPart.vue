<template>
  <template v-if='description'>
    <div class='flex row no-wrap' :style='rootStyle'>
      <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw; margin-left: 1vw'>
        <q-item-label>{{ description }}</q-item-label>
      </div>
    </div>
  </template>
</template>

<script lang='ts' src='./ElectronicMenuDescriptionPart.ts'/>
<style lang='scss' src='./ElectronicMenuDescriptionPart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuDescriptionPart.scoped.scss'/>
