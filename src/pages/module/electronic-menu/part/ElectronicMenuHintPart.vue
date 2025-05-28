<template>
  <template v-if='show'>
    <template v-if='title && text'>
      <div :style='rootStyle'>
        <div class='m--electron-menu--scroll-area--part--hint--card'>
          <div class='--title flex row flex-center'>
            <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
            <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ title }}</q-item-label>
          </div>
          <div class='--content'>
            <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ text }}</q-item-label>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang='ts' src='./ElectronicMenuHintPart.ts'/>
<style lang='scss' src='./ElectronicMenuHintPart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuHintPart.scoped.scss'/>
<script setup lang="ts">
</script>
