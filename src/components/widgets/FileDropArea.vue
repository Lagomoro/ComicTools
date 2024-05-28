<template>
  <div :class='`m--drop-area` + (isDragging ? ` --dragging` : ``)'>
    <div class='fit flex flex-center relative-position' @dragover.prevent='onDragOver' @dragleave='onDragLeave' @drop.prevent='onDrop' @click='selectFile' @mouseover='onMouseOver' @mouseleave='onMouseLeave'>
      <div class='q-ma-xl relative-position'>
        <template v-if='filter.length > 0'>
          <div class='m--absolute-center flex flex-center'>
            <q-item-label style='transform: translate(0, -4px)'>{{ isDragging ? dragHolder : (isMoving ? clickHolder : placeholder) }}</q-item-label>
          </div>
        </template>
        <template v-else>
          <div class='m--absolute-center flex flex-center'>
            <q-item-label>{{ isDragging ? dragHolder : (isMoving ? clickHolder : placeholder) }}</q-item-label>
          </div>
        </template>
      </div>
      <template v-if='filter.length > 0'>
        <div class='absolute-bottom q-pa-sm flex flex-center'>
          <q-item-label caption>接受的文件类型：{{ filter.map(p => `*.${ p }`).join(' ') }}</q-item-label>
        </div>
      </template>
    </div>
    <template v-if='filter.length > 0'>
      <input type='file' :accept='filter.map(p => `.${ p }`).join(`, `)' ref='fileInput' style='display: none' @change='onFileSelected'/>
    </template>
    <template v-else>
      <input type='file' ref='fileInput' style='display: none' @change='onFileSelected'/>
    </template>
  </div>
</template>

<script lang='ts' src='./FileDropArea.ts'/>
<style lang='scss' src='./FileDropArea.scss'/>
<style scoped lang='scss' src='./FileDropArea.scoped.scss'/>
