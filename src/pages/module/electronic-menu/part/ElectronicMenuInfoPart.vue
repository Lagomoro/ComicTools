<template>
  <template v-if='show'>
    <template v-if='size || material || manufacture || producer || author || timestamp'>
      <div class='flex row no-wrap' :style='`--scale: ${ scale }; ${ rootStyle }`'>
        <div class='m--flex--0-0' :style='`width: calc(0.3vw * var(--scale)); background-color: ${ config.themeColor9 }`'></div>
        <div class='full-height m--flex--1-1' style='max-width: calc(100% - calc(0.3vw * var(--scale)))'>
          <div class='bg-grey-3' style='padding: calc(0.6vw * var(--scale)) calc(0.8vw * var(--scale)) calc(0.8vw * var(--scale)) calc(0.8vw * var(--scale))'>
            <div class='m--font--source-han-sans-sc --medium' style='font-size: calc(1vw * var(--scale))'>
              <template v-if='size'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>规格</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ size }}</q-item-label>
                </div>
              </template>
              <template v-if='material'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>材质</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ material }}</q-item-label>
                </div>
              </template>
              <template v-if='manufacture'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>工艺</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ manufacture }}</q-item-label>
                </div>
              </template>
              <template v-if='producer'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>制造设计</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ producer }}</q-item-label>
                </div>
              </template>
              <template v-if='author'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>画师</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ author }}</q-item-label>
                </div>
              </template>
              <template v-if='timestamp'>
                <div class='row no-wrap' style='margin-top: calc(0.2vw * var(--scale))'>
                  <q-item-label class='text-no-wrap m--electron-menu--scroll-area--part--info--text-justify'>定稿日期</q-item-label>
                  <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ timestamp }}</q-item-label>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang='ts' src='./ElectronicMenuInfoPart.ts'/>
<style lang='scss' src='./ElectronicMenuInfoPart.scss'/>
<style scoped lang='scss' src='./ElectronicMenuInfoPart.scoped.scss'/>
