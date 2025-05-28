<template>
  <div class='flex row no-wrap' :style='`--scale: ${ scale }; ${ rootStyle }`'>
    <div>
      <div class='flex row no-wrap items-end'>
        <div :style='`width: calc(0.5vw * var(--scale)); height: calc(1.2vw * var(--scale)); margin-bottom: calc(0.2vw * var(--scale)); background-color: ${ config.themeColor9 }`'></div>
        <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: calc(1.6vw * var(--scale)); margin-left: calc(0.4vw * var(--scale))'>{{ name }}</q-item-label>
      </div>
      <template v-if='category'>
        <div style='margin-top: calc(0.4vw * var(--scale))'>
          <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: calc(1.2vw * var(--scale)); margin-left: calc(1vw * var(--scale))'>{{ category }}</q-item-label>
        </div>
      </template>
    </div>
    <template v-if='price === 0'>
      <div class='m--flex--1-1 relative-position'>
        <div class='absolute-right flex row no-wrap items-end'>
          <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: calc(2.4vw * var(--scale))'>无料</q-item-label>
        </div>
      </div>
    </template>
    <template v-if='price > 0'>
      <div class='m--flex--1-1 relative-position'>
        <div class='absolute-right flex row no-wrap'>
          <div class='m--flex--0-0 flex row no-wrap items-end'>
            <q-item-label class='m--font--impact' style='font-size: calc(1.8vw * var(--scale)); transform: translate(0, calc(0.2vw * var(--scale)))'>{{ currency }}</q-item-label>
          </div>
          <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: calc(0.3vw * var(--scale))'>
            <q-item-label class='m--font--impact' style='font-size: calc(3.6vw * var(--scale)); transform: translate(0, calc(0.55vw * var(--scale)))'>{{ priceInt }}.</q-item-label>
            <div>
              <q-item-label class='m--font--impact' style='font-size: calc(1.9vw * var(--scale)); transform: translate(0, calc(0.4vw * var(--scale)))'>{{ priceFloat }}</q-item-label>
              <q-item-label class='text-bold' style='font-size: calc(1.3vw * var(--scale)); margin: 0 0 0 calc(0.2vw * var(--scale)); transform: translate(0, calc(0.15vw * var(--scale)))'>/{{ unit }}</q-item-label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang='ts' src='./ElectronicMenuTitlePart.ts'/>
<style lang='scss' src='./ElectronicMenuTitlePart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuTitlePart.scoped.scss'/>
