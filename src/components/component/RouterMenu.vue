<template>
  <q-list>
    <template v-for='data in routerItemList' :key='data.name'>
      <q-item class='full-width q-py-xs'>
        <q-btn unelevated no-caps class='m--border--radius--md full-width q-py-sm' color='grey-2' text-color='black' :to='data.path'>
          <div class='fit row no-wrap items-center'>
            <q-icon :name='data.icon'/>
            <div class='q-ml-md text-left'>
              <q-item-label>{{ data.name }}</q-item-label>
              <q-item-label caption class='ellipsis'>{{ data.description }}</q-item-label>
            </div>
          </div>
        </q-btn>
      </q-item>
    </template>
  </q-list>
</template>

<script lang='ts' src='./RouterMenu.ts'/>
<style lang='scss' src='./RouterMenu.scss'/>
<style scoped lang='scss' src='./RouterMenu.scoped.scss'/>
