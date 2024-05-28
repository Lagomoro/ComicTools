<template>
  <q-page style='height: 0'>
    <div class='fit flex flex-center'>
      <div class='text-center q-pb-xl'>
        <q-item-label class='text-grey-5' style='font-size: 76px;'>404</q-item-label>
        <q-item-label class='m--text-lg text-grey-8 q-mt-md'>找不到路径：{{ currentPath }}</q-item-label>
        <q-btn unelevated class='q-mt-lg' color='grey-2' text-color='black' icon='mdi-home' label='回到主页' to='/'></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang='ts' src='./ErrorNotFoundPage.ts'/>
<style lang='scss' src='./ErrorNotFoundPage.scss'/>
<style scoped lang='scss' src='./ErrorNotFoundPage.scoped.scss'/>
