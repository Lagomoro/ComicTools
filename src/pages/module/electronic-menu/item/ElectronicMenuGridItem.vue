<template>
  <q-btn unelevated square no-caps color='white' padding='none' v-masonry-tile :style='`width: ${ width }`' @click.prevent.stop>
    <div class='fit text-black text-left'>
      <div style='padding: 0.5vw'>
        <div class='flex row no-wrap'>
          <div>
            <div class='flex row no-wrap items-end'>
              <div :style='`width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw; background-color: ${ config.themeColor9 }`'></div>
              <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.6vw; margin-left: 0.4vw'>{{ data.name }}</q-item-label>
            </div>
            <template v-if='data.category'>
              <div style='margin-top: 0.4vw'>
                <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.2vw; margin-left: 1vw'>{{ data.category }}</q-item-label>
              </div>
            </template>
          </div>
          <template v-if='data.price === 0'>
            <div class='m--flex--1-1 relative-position'>
              <div class='absolute-right flex row no-wrap items-end'>
                <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2.4vw'>无料</q-item-label>
              </div>
            </div>
          </template>
          <template v-if='data.price > 0'>
            <div class='m--flex--1-1 relative-position'>
              <div class='absolute-right flex row no-wrap'>
                <div class='m--flex--0-0 flex row no-wrap items-end'>
                  <q-item-label class='m--font--impact' style='font-size: 1.8vw; transform: translate(0, 0.2vw)'>{{ data.currency }}</q-item-label>
                </div>
                <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: 0.3vw'>
                  <q-item-label class='m--font--impact' style='font-size: 3.6vw; transform: translate(0, 0.55vw)'>{{ data.price.toString().split('.')[0] }}.</q-item-label>
                  <div>
                    <q-item-label class='m--font--impact' style='font-size: 1.9vw; transform: translate(0, 0.4vw)'>{{ data.price.toString().split('.')[1] ? (data.price.toString().split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                    <q-item-label class='text-bold' style='font-size: 1.3vw; margin: 0 0 0 0.2vw; transform: translate(0, 0.15vw)'>/{{ data.unit }}</q-item-label>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <template v-if='data.description'>
          <div class='flex row no-wrap' style='margin-top: 0.6vw'>
            <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw; margin-left: 1vw'>
              <q-item-label>{{ data.description }}</q-item-label>
            </div>
          </div>
        </template>
        <template v-if='showInfo'>
          <div class='flex row no-wrap' style='margin-top: 0.6vw'>
            <div class='m--flex--0-0' :style='`width: 0.3vw; background-color: ${ config.themeColor9 }`'></div>
            <div class='full-height m--flex--1-1' style='max-width: calc(100% - 0.3vw)'>
              <div class='bg-grey-3' style='padding: 0.6vw 0.8vw 0.8vw 0.8vw'>
                <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>
                  <template v-if='data.size'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>规格</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.size }}</q-item-label>
                    </div>
                  </template>
                  <template v-if='data.material'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>材质</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.material }}</q-item-label>
                    </div>
                  </template>
                  <template v-if='data.manufacture'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>工艺</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.manufacture }}</q-item-label>
                    </div>
                  </template>
                  <template v-if='data.producer'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>制造设计</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.producer }}</q-item-label>
                    </div>
                  </template>
                  <template v-if='data.author'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>画师</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.author }}</q-item-label>
                    </div>
                  </template>
                  <template v-if='data.timestamp'>
                    <div class='row no-wrap' style='margin-top: 0.2vw'>
                      <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>定稿日期</q-item-label>
                      <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ data.timestamp }}</q-item-label>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if='showHint'>
          <template v-if='data.titleBefore'>
            <div style='margin-top: 0.6vw'>
              <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                <div class='--title flex row flex-center'>
                  <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                  <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ data.titleBefore }}</q-item-label>
                </div>
                <div class='--content'>
                  <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ data.textBefore }}</q-item-label>
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-if='data.id in imageRecord'>
          <div style='margin-top: 0.6vw'>
            <q-img :src='imageRecord[data.id]'></q-img>
          </div>
        </template>
        <template v-if='showInfo'>
          <template v-if='data.titleAfter'>
            <div style='margin-top: 0.6vw'>
              <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                <div class='--title flex row flex-center'>
                  <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                  <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ data.titleAfter }}</q-item-label>
                </div>
                <div class='--content'>
                  <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ data.textAfter }}</q-item-label>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </q-btn>
</template>

<script lang='ts' src='./ElectronicMenuGridItem.ts'/>
<style lang='scss' src='./ElectronicMenuGridItem.scss'/>
<style scoped lang='scss' src='./ElectronicMenuGridItem.scoped.scss'/>
