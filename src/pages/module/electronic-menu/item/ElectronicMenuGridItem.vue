<template>
  <q-btn unelevated square no-caps color='white' padding='none' v-masonry-tile :style='`width: ${ width }`' @click.prevent.stop>
    <div class='fit text-black text-left'>
      <div style='padding: 0.5vw'>
        <ElectronicMenuTitlePart :config='config' :name='data.name' :category='data.category' :price='data.price' :unit='data.unit' :currency='data.currency'></ElectronicMenuTitlePart>
        <ElectronicMenuDescriptionPart rootStyle='margin-top: 0.6vw' :config='config' :show='showDesc && data.displayDesc' :description='data.description'></ElectronicMenuDescriptionPart>
        <ElectronicMenuInfoPart rootStyle='margin-top: 0.6vw' :config='config' :show='showInfo && data.displayInfo' :size='data.size' :material='data.material' :manufacture='data.manufacture' :producer='data.producer' :author='data.author' :timestamp='data.timestamp'></ElectronicMenuInfoPart>
        <ElectronicMenuHintPart rootStyle='margin-top: 0.6vw' :config='config' :show='showHint && data.displayHint' :title='data.titleBefore' :text='data.textBefore'></ElectronicMenuHintPart>
        <template v-if='data.imageSrc'>
          <div style='margin-top: 0.6vw'>
            <q-img :src='data.imageSrc'></q-img>
          </div>
        </template>
        <ElectronicMenuHintPart rootStyle='margin-top: 0.6vw' :config='config' :show='showHint' :title='data.titleAfter' :text='data.textAfter'></ElectronicMenuHintPart>
      </div>
    </div>
  </q-btn>
</template>

<script lang='ts' src='./ElectronicMenuGridItem.ts'/>
<style lang='scss' src='./ElectronicMenuGridItem.scss'/>
<style scoped lang='scss' src='./ElectronicMenuGridItem.scoped.scss'/>
