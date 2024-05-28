<template>
  <q-layout class='non-selectable' view='lHh Lpr lFf'>
    <q-header bordered class='bg-white'>
      <q-toolbar class='bg-transparent text-black'>
        <q-btn flat dense round icon='menu' @click='toggleLeftDrawer'/>
        <q-item-label header>{{ routeName }}</q-item-label>
        <q-space></q-space>
        <q-btn flat dense round icon='mdi-github' @click='openGithubPage'/>
      </q-toolbar>
    </q-header>

    <LeftDrawer v-model='leftDrawerOpen'></LeftDrawer>

    <q-page-container>
      <router-view v-slot='{ Component }'>
        <transition name='fade'>
<!--          <keep-alive>-->
            <component :is='Component'/>
<!--          </keep-alive>-->
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts' src='./MainLayout.ts'/>
<style lang='scss' src='./MainLayout.scss'/>
<style scoped lang='scss' src='./MainLayout.scoped.scss'/>
