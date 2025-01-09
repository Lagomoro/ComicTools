<template>
  <q-page style='height: 0'>
    <div class='fit column no-wrap'>
      <template v-if='isAndroid && isChrome'>
        <div class='m--flex--0-0'>
          <div class='fit row q-px-sm'>
            <q-item class='fit q-pa-none no-wrap text-no-wrap'>
              <q-item-section>
                <q-item-label header>前提条件</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <q-separator></q-separator>
        <div class='m--flex--0-0'>
          <div class='fit q-pa-md'>
            <q-item-label>
              在使用本工具之前，您需要：
            </q-item-label>
            <q-item-label>
              1、准备一些空白的 ntag 213/215/216，可以在淘宝购买，用于写入 NFC Tag 数据。
            </q-item-label>
          </div>
        </div>
        <q-separator></q-separator>
        <div class='m--flex--0-0'>
          <div class='fit row q-px-sm'>
            <q-item class='fit q-pa-none no-wrap text-no-wrap'>
              <q-item-section>
                <q-item-label header>蔚蓝档案国服，启动！</q-item-label>
              </q-item-section>
              <q-item-section side class='q-mr-md'>
                <div class='q-gutter-x-sm'>
                  <q-btn unelevated no-caps color='primary' label='写入国服' @click='createLaunchCard(`com.RoamingStar.BlueArchive`)' :loading='outputLoading'>
                    <template v-slot:loading>
                      <q-spinner-facebook/>
                    </template>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <q-separator></q-separator>
        <div class='m--flex--0-0'>
          <div class='fit row q-px-sm'>
            <q-item class='fit q-pa-none no-wrap text-no-wrap'>
              <q-item-section>
                <q-item-label header>蔚蓝档案国际服，启动！</q-item-label>
              </q-item-section>
              <q-item-section side class='q-mr-md'>
                <div class='q-gutter-x-sm'>
                  <q-btn unelevated no-caps color='primary' label='写入国际服' @click='createLaunchCard(`com.nexon.bluearchive`)' :loading='outputLoading'>
                    <template v-slot:loading>
                      <q-spinner-facebook/>
                    </template>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <q-separator></q-separator>
        <div class='m--flex--0-0'>
          <div class='fit row q-px-sm'>
            <q-item class='fit q-pa-none no-wrap text-no-wrap'>
              <q-item-section>
                <q-item-label header>蔚蓝档案日服，启动！</q-item-label>
              </q-item-section>
              <q-item-section side class='q-mr-md'>
                <div class='q-gutter-x-sm'>
                  <q-btn unelevated no-caps color='primary' label='写入日服' @click='createLaunchCard(`com.YostarJP.BlueArchive`)' :loading='outputLoading'>
                    <template v-slot:loading>
                      <q-spinner-facebook/>
                    </template>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <q-separator></q-separator>
        <template v-if='statusInfo.status'>
          <div class='m--flex--0-0'>
            <q-card flat bordered :class='`m--alipay-nfc-tag-writer--status ${ STATUS_CLASS_NAME[statusInfo.status] } q-ma-md`'>
              <q-item class='q-pl-none q-py-sm'>
                <q-item-section avatar>
                  <q-icon class='q-ml-md' :name='statusInfo.icon'></q-icon>
                </q-item-section>
                <q-item-section class='q-pl-none'>
                  <q-item-label>{{ statusInfo.title }}</q-item-label>
                  <q-item-label caption :class='`-${ STATUS_CLASS_NAME[statusInfo.status] }`'>{{ statusInfo.message }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </template>
        <div class='m--flex--1-1'>

        </div>
      </template>
      <template v-else>
        <div class='m--flex--0-0'>
          <q-card flat bordered class='m--alipay-nfc-tag-writer--status negative text-negative q-ma-md'>
            <q-item class='q-pl-none q-py-sm'>
              <q-item-section avatar>
                <q-icon class='q-ml-md' name='mdi-cellphone-remove'></q-icon>
              </q-item-section>
              <q-item-section class='q-pl-none'>
                <q-item-label>不受支持的平台</q-item-label>
                <q-item-label caption class='text-negative'>该工具只能在支持 NFC 功能的安卓设备上使用，且浏览器必须是 Chrome 内核。</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div class='m--flex--1-1'>

        </div>
      </template>
      <q-dialog class='m--alipay-nfc-tag-writer--dialog non-selectable' v-model='showDialog' persistent>
        <q-card>
          <q-card-section>
            <div class='text-h6'>{{ STEP_DIALOG_TITLE[stepInfo.currentTab] }}({{ stepInfo.current }}/{{ stepInfo.total }})</div>
          </q-card-section>

          <q-card-section class='absolute-top-right'>
            <div class='flex-center' style='width: 32px; height: 32px'>
              <q-btn dense flat icon='mdi-close' @click='closeDialog()'/>
            </div>
          </q-card-section>

          <q-card-section class='q-pt-none'>
            <div class='m--alipay-nfc-tag-writer--dialog-tab-container'>
              <template v-if='stepInfo.currentTab === DialogTab.NFCWriter'>
                <div class='nfc-writer flex flex-center'>
                  <div class='column items-center text-center'>
                    <q-icon class='q-mb-lg' size='40px' name='mdi-nfc'></q-icon>
                    <q-item-label class='text-h6'>靠近 NFC 标签</q-item-label>
                    <q-item-label class='text-h6'>写入数据</q-item-label>
                  </div>
                </div>
              </template>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang='ts' src='./BlueArchiveNFCLaunch.ts'/>
<style lang='scss' src='./BlueArchiveNFCLaunch.scss'/>
<style scoped lang='scss' src='./BlueArchiveNFCLaunch.scoped.scss'/>
