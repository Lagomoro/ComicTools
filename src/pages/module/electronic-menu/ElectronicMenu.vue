<template>
  <q-page style='height: 0'>
    <div class='fit column no-wrap'>
      <div class='m--flex--0-0'>
        <div class='fit row q-px-sm'>
          <q-item class='fit q-pa-none no-wrap text-no-wrap'>
            <q-item-section>
              <q-item-label header>基本设置</q-item-label>
            </q-item-section>
            <q-item-section side class='q-mr-md'>
              <div class='q-gutter-x-sm'>

              </div>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--0-0'>
        <div class='fit row q-pb-md q-px-sm'>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>Excel 配置文件</q-item-label>
              <div style='width: 300px; height: 300px'>
                <template v-if='!electronMenuExcel'>
                  <m-file-drop-area class='fit' :filter='[`xls`, `xlsx`]' @upload='onExcelConfigDrop'></m-file-drop-area>
                </template>
                <template v-else>
                  <div class='fit relative-position'>
                    <q-item-label header>主题配色</q-item-label>
                    <div class='row q-px-md'>
                      <template v-for='index in 9' :key='index'>
                        <div class='m--border--solid--sm' style='padding: 2px'>
                          <div class='m--border--solid--sm' :style='`padding: 11.56px;background-color: ` + electronMenuExcel.config[`themeColor` + index]'></div>
                        </div>
                      </template>
                    </div>
                    <q-item-label header>主题字体</q-item-label>
                    <div class='q-px-md'>
                      <template v-for='index in 4' :key='index'>
                        <div class='m--border--solid--sm q-pa-xs'>
                          <q-item-label :style='`font-family: ` + electronMenuExcel.config[`themeFont` + index]'>{{ electronMenuExcel.config[`themeFont` + index] }}</q-item-label>
                        </div>
                      </template>
                    </div>
                    <div class='m--outline--dash--md m--border--radius--md fit absolute-top'></div>
                    <div class='absolute-bottom full-width flex flex-center q-pa-md'>
                      <q-btn unelevated color='negative' label='清空配置' @click.prevent.stop='removeElectronMenuExcel'></q-btn>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>屏幕设置</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn column'>
                  <template v-for='y in Math.ceil(screenList.length / 3)' :key='y'>
                    <div class='row' style='height: 36px'>
                      <template v-for='x in 3' :key='x'>
                        <div class='m--flex--1-1 flex flex-center'>
                          <template v-if='(y - 1) * 3 + (x - 1) < screenList.length'>
                            <q-radio dense :label='screenList[(y - 1) * 3 + (x - 1)].name' v-model='screenSelect' :val='screenList[(y - 1) * 3 + (x - 1)].key'>
                              <q-tooltip anchor='center left' self='center right'>{{ screenList[(y - 1) * 3 + (x - 1)].description }}</q-tooltip>
                            </q-radio>
                          </template>
                        </div>
                        <template v-if='x < 3'>
                          <q-separator vertical></q-separator>
                        </template>
                      </template>
                    </div>
                    <template v-if='y < screenList.length / 3'>
                      <q-separator class='full-width'></q-separator>
                    </template>
                  </template>
                </div>
              </div>
              <q-item-label header>边距设置</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='左边距' placeholder='请输入左边距' v-model='paddingLeft'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='左边距' placeholder='请输入右边距' v-model='paddingRight'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='上边距' placeholder='请输入上边距' v-model='paddingTop'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='下边距' placeholder='请输入下边距' v-model='paddingBottom'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='水平内边距' placeholder='请输入水平内边距' v-model='paddingVertical'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='垂直内边距' placeholder='请输入垂直内边距' v-model='paddingHorizontal'></q-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--0-0'>
        <q-item class='fit q-pa-none no-wrap text-no-wrap'>
          <q-item-section>
            <q-item-label header>电子菜单展示</q-item-label>
          </q-item-section>
          <q-item-section side class='q-mr-md'>
            <div class='q-gutter-x-sm'>
              <q-btn unelevated no-caps color='primary' label='全屏显示' @click.prevent.stop='requestFullScreen(elementDivElectronMenu)'></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--1-1'>
        <div ref='elementDivElectronMenu' class='fit bg-white non-selectable'>
          <div class='fit relative-position'>
            <div class='absolute-top-right q-pa-sm'>
              <q-btn flat round dense :icon='isFullScreen ? `mdi-fullscreen-exit` : `mdi-fullscreen`' @click.prevent.stop='requestFullScreen(elementDivElectronMenu)' />
            </div>
            <div class='fit' :style='`padding: ${ paddingTop || 0 }vw ${ paddingRight || 0 }vw ${ paddingBottom || 0 }vw ${ paddingLeft || 0 }vw`'>
              <div class='relative-position'>
                <div class='absolute-top-right' style='top: -2vw'>
                  <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.5vw'>嘉兴•蔚蓝档案 Only</q-item-label>
                </div>
              </div>
              <q-separator class='bg-primary' style='height: 0.5vw'></q-separator>
              <div class='fit flex column'>
                <div class='full-width m--flex--0-0'>
                  <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.5vw'>MoroWorks</q-item-label>
                  <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 3.5vw; transform: translate(-0.2vw, -0.5vw); margin: 0'>兔萌社</q-item-label>
                </div>
                <div class='full-width m--flex--1-1'>
                  <q-scroll-area class='fit' :thumb-style='{ opacity: 0 }'>
                    <div class='m--electron-menu--scroll-area--flow --top'></div>
                    <div class='m--electron-menu--scroll-area--flow --bottom'></div>
                    <div class='full-width' style='padding: 2vw 0'>
                      <div v-masonry transition-duration='0.3s' item-selector='.m--electron-menu--scroll-area--grid-item' gutter='10'>
                        <template v-for='i in 100' :key='i'>
                          <div v-masonry-tile class='m--electron-menu--scroll-area--grid-item' style='width: calc((100% - 30px) / 4)'>
                            <div class='flex row items-end no-wrap'>
                              <div class='bg-primary' style='width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw'></div>
                              <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2vw; margin-left: 0.4vw'>小春酱dokidoki</q-item-label>
                            </div>
                            <div class='flex row no-wrap' style='margin-top: 0.4vw'>
                              <div class='full-height m--flex--0-0'>
                                <div class='bg-primary' style='width: 0.5vw'></div>
                              </div>
                              <div class='full-height m--flex--1-1'>
                                <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>陶瓷杯垫</q-item-label>
                                <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>陶瓷杯垫</q-item-label>
                                <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>陶瓷杯垫</q-item-label>
                              </div>
                            </div>
                            <div style='margin-top: 0.4vw'>
                              <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>陶瓷杯垫</q-item-label>
                            </div>
                            <div class='bg-grey-4' style='margin-top: 0.4vw'>
                              {{ i }}
                              <q-img :style='`height: ${ i % 10 + 5 }vw`'></q-img>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang='ts' src='./ElectronicMenu.ts'/>
<style lang='scss' src='./ElectronicMenu.scss'/>
<style scoped lang='scss' src='./ElectronicMenu.scoped.scss'/>
