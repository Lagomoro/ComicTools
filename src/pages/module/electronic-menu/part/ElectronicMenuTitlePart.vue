<template>
  <div class='flex row no-wrap'>
    <div>
      <div class='flex row no-wrap items-end'>
        <div :style='`width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw; background-color: ${ config.themeColor9 }`'></div>
        <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.6vw; margin-left: 0.4vw'>{{ name }}</q-item-label>
      </div>
      <template v-if='category'>
        <div style='margin-top: 0.4vw'>
          <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.2vw; margin-left: 1vw'>{{ category }}</q-item-label>
        </div>
      </template>
    </div>
    <template v-if='price === 0'>
      <div class='m--flex--1-1 relative-position'>
        <div class='absolute-right flex row no-wrap items-end'>
          <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2.4vw'>无料</q-item-label>
        </div>
      </div>
    </template>
    <template v-if='price > 0'>
      <div class='m--flex--1-1 relative-position'>
        <div class='absolute-right flex row no-wrap'>
          <div class='m--flex--0-0 flex row no-wrap items-end'>
            <q-item-label class='m--font--impact' style='font-size: 1.8vw; transform: translate(0, 0.2vw)'>{{ currency }}</q-item-label>
          </div>
          <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: 0.3vw'>
            <q-item-label class='m--font--impact' style='font-size: 3.6vw; transform: translate(0, 0.55vw)'>{{ priceInt }}.</q-item-label>
            <div>
              <q-item-label class='m--font--impact' style='font-size: 1.9vw; transform: translate(0, 0.4vw)'>{{ priceFloat }}</q-item-label>
              <q-item-label class='text-bold' style='font-size: 1.3vw; margin: 0 0 0 0.2vw; transform: translate(0, 0.15vw)'>/{{ unit }}</q-item-label>
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
