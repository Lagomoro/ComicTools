<template>
  <q-drawer v-model='model' show-if-above bordered>
    <div class='fit column'>
      <div class='m--flex--0-0 q-pt-sm'>
        <q-item class='full-width q-py-xs'>
          <div class='m--border--dash m--border--radius--md fit'>
            <q-item-label header>工具列表</q-item-label>
          </div>
        </q-item>
      </div>
      <div class='m--flex--1-1'>
        <q-scroll-area class='fit'>
          <RouterMenu></RouterMenu>
        </q-scroll-area>
      </div>
    </div>
  </q-drawer>
<!--  <q-drawer show-if-above mini mini-to-overlay :mini-width='58' :width='200' :breakpoint='500' bordered :class='$q.dark.isActive ? `bg-grey-9` : `bg-grey-3`'>-->
</template>

<script lang='ts' src='./LeftDrawer.ts'/>
<style lang='scss' src='./LeftDrawer.scss'/>
<style scoped lang='scss' src='./LeftDrawer.scoped.scss'/>
