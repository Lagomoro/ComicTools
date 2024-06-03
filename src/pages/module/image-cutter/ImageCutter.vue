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
                <q-btn unelevated no-caps color='primary' label='导出九宫格' @click='outputBaseImage' :loading='outputLoading' :disable='!originImageSrc'>
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
        <div class='fit row q-pb-md q-px-sm'>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <template v-if='!originImageSrc'>
                <q-item-label header>原始图片</q-item-label>
              </template>
              <template v-else>
                <q-item-label header>原始图片：{{ originImageWidth }} px * {{ originImageHeight }} px</q-item-label>
              </template>
              <div style='width: 300px; height: 300px'>
                <template v-if='!originImageSrc'>
                  <m-file-drop-area class='fit' :filter='[`png`, `jpg`, `jpeg`]' @upload='onOriginImageDrop'></m-file-drop-area>
                </template>
                <template v-else>
                  <div class='fit relative-position'>
                    <q-img class='fit m--border--radius--md' fit='contain' :src='originImageSrc'></q-img>
                    <div class='m--outline--dash--md m--border--radius--md fit absolute-top'></div>
<!--                    <div class='absolute-top full-width flex flex-center q-pa-md'>-->
<!--                      <q-item-label caption>{{ originImageWidth }} px * {{ originImageHeight }} px</q-item-label>-->
<!--                    </div>-->
                    <div class='absolute-bottom full-width flex flex-center q-pa-md'>
                      <q-btn unelevated color='negative' label='删除原图' @click='removeOriginImage'></q-btn>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <template v-if='baseImageCutSize < 0'>
                <q-item-label header>效果预览</q-item-label>
              </template>
              <template v-else>
                <q-item-label header>效果预览：{{ baseImageCutSize }} px / {{ Math.floor(Math.max(originImageWidth, originImageHeight) / 3) }} px</q-item-label>
              </template>
              <div style='width: 300px; height: 300px'>
                <div class='fit relative-position'>
                  <canvas class='m--border--radius--md fit' ref='previewCanvas' width='3072' height='3072'></canvas>
                  <div class='m--outline--dash--md m--border--radius--md fit absolute-top'></div>
<!--                  <template v-if='baseImageCutSize >= 0'>-->
<!--                    <div class='absolute-top full-width flex flex-center q-pa-md'>-->
<!--                      <q-item-label caption>{{ baseImageCutSize }} px / {{ Math.floor(Math.max(originImageWidth, originImageHeight) / 3) }} px</q-item-label>-->
<!--                    </div>-->
<!--                  </template>-->
                </div>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>刀线比率</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <template v-for='(data, index) in ratioList' :key='data.key'>
                    <template v-if='data.key !== `input`'>
                      <div class='m--flex--1-1 flex flex-center'>
                        <q-radio dense :label='data.name' v-model='ratioSelect' :val='data.key' @click='repaintPreviewCanvas'>
                          <q-tooltip anchor='center left' self='center right'>{{ data.value }}</q-tooltip>
                        </q-radio>
                      </div>
                      <template v-if='index < ratioList.map(p => p.key).indexOf(`input`) - 1'>
                        <q-separator vertical></q-separator>
                      </template>
                    </template>
                  </template>
                </div>
                <q-input dense outlined clearable type='number' min='0' max='0.5' step='0.01' placeholder='请输入比率（0 ~ 0.5）'
                         :class='`m--btn-input` + (ratioSelect === `input` ? ` --selected` : ``) + ` full-width`' input-class='m--btn-input--input'
                         v-model='ratioInputValue' @focus='ratioSelect = `input`' @focusout='onRatioInputFocusOut'></q-input>
              </div>
              <q-item-label header>切割方式</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <template v-for='(data, index) in modeList' :key='data.key'>
                    <div class='m--flex--1-1 flex flex-center'>
                      <q-radio dense :label='data.name' v-model='modeSelect' :val='data.key' @click='repaintPreviewCanvas'>
                        <q-tooltip anchor='center left' self='center right'>{{ data.description }}</q-tooltip>
                      </q-radio>
                    </div>
                    <template v-if='index < modeList.length - 1'>
                      <q-separator vertical></q-separator>
                    </template>
                  </template>
                </div>
              </div>
              <q-item-label header>导出尺寸</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='原始像素' v-model='outputSelect' val='original'>
                      <template v-if='baseImageCutSize < 0'>
                        <q-tooltip anchor='center left' self='center right'>按照切割后的像素直接导出</q-tooltip>
                      </template>
                      <template v-else>
                        <q-tooltip anchor='center left' self='center right'>按照切割后的像素直接导出（{{ baseImageCutSize }} px）</q-tooltip>
                      </template>
                    </q-radio>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='填充切线' v-model='outputSelect' val='scale'>
                      <template v-if='baseImageCutSize < 0'>
                        <q-tooltip anchor='center left' self='center right'>切割后，放大到原图的 1/3 像素导出</q-tooltip>
                      </template>
                      <template v-else>
                        <q-tooltip anchor='center left' self='center right'>切割后，放大到原图的 1/3 像素导出（{{ Math.floor(Math.max(originImageWidth, originImageHeight) / 3) }} px）</q-tooltip>
                      </template>
                    </q-radio>
                  </div>
                </div>
                <q-input dense outlined clearable type='number' min='512' max='4096' step='512' placeholder='请输入目标像素（512 ~ 4096）'
                         :class='`m--btn-input` + (outputSelect === `input` ? ` --selected` : ``) + ` full-width`' input-class='m--btn-input--input'
                         v-model='outputInputValue' @focus='outputSelect = `input`' @focusout='onOutputInputFocusOut'></q-input>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>Excel 配置文件（可选）</q-item-label>
              <div style='width: 300px; height: 300px'>
                <template v-if='!longImageExcel'>
                  <m-file-drop-area class='fit' :filter='[`xls`, `xlsx`]' @upload='onExcelConfigDrop'></m-file-drop-area>
                </template>
                <template v-else>
                  <div class='fit relative-position'>
                    <q-item-label header>主题配色</q-item-label>
                    <div class='row q-px-md'>
                      <template v-for='index in 9' :key='index'>
                        <div class='m--border--solid--sm' style='padding: 2px'>
                          <div class='m--border--solid--sm' :style='`padding: 11.65px;background-color: ` + longImageExcel.config[`themeColor` + index]'></div>
                        </div>
                      </template>
                    </div>
                    <q-item-label header>主题字体</q-item-label>
                    <div class='q-px-md'>
                      <template v-for='index in 4' :key='index'>
                        <div class='m--border--solid--sm q-pa-xs'>
                          <q-item-label :style='`font-family: ` + longImageExcel.config[`themeFont` + index]'>{{ longImageExcel.config[`themeFont` + index] }}</q-item-label>
                        </div>
                      </template>
                    </div>
                    <div class='m--outline--dash--md m--border--radius--md fit absolute-top'></div>
                    <div class='absolute-bottom full-width flex flex-center q-pa-md'>
                      <q-btn unelevated color='negative' label='清空配置' @click='removeLongImageExcel'></q-btn>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--0-0'>
        <q-item class='fit q-pa-none no-wrap text-no-wrap'>
          <q-item-section>
            <q-item-label header>长图设置</q-item-label>
          </q-item-section>
          <q-item-section side class='q-mr-md'>
            <div class='q-gutter-x-sm'>
              <q-btn outline no-caps color='primary' label='获取示例' @click='exportDefaultExcel' :loading='outputLoading'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
<!--              <q-btn outline no-caps color='primary' label='保存为 Excel'>-->
<!--                <template v-slot:loading>-->
<!--                  <q-spinner-facebook/>-->
<!--                </template>-->
<!--              </q-btn>-->
              <q-btn unelevated no-caps color='primary' label='导出长图' @click='outputLongImage' :loading='outputLoading' :disable='!originImageSrc || !longImageExcel'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--0-0'>
        <div class='fit row q-pb-md q-px-sm'>

        </div>
      </div>
      <div class='m--flex--1-1'>

      </div>
    </div>
  </q-page>
</template>

<script lang='ts' src='./ImageCutter.ts'/>
<style lang='scss' src='./ImageCutter.scss'/>
<style scoped lang='scss' src='./ImageCutter.scoped.scss'/>
