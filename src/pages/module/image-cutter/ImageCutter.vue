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
                <q-btn unelevated no-caps color='primary' label='导出九宫格' @click='outputBaseImage' :loading='outputLoading'>
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
              <template v-if='cutSize < 0'>
                <q-item-label header>效果预览</q-item-label>
              </template>
              <template v-else>
                <q-item-label header>效果预览：{{ cutSize }} px / {{ Math.floor(Math.max(originImageWidth, originImageHeight) / 3) }} px</q-item-label>
              </template>
              <div style='width: 300px; height: 300px'>
                <div class='fit relative-position'>
                  <canvas class='m--border--radius--md fit' ref='previewCanvas' width='3072' height='3072'></canvas>
                  <div class='m--outline--dash--md m--border--radius--md fit absolute-top'></div>
<!--                  <template v-if='cutSize >= 0'>-->
<!--                    <div class='absolute-top full-width flex flex-center q-pa-md'>-->
<!--                      <q-item-label caption>{{ cutSize }} px / {{ Math.floor(Math.max(originImageWidth, originImageHeight) / 3) }} px</q-item-label>-->
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
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='微博' v-model='ratioSelect' val='weibo' @click='repaintPreviewCanvas'>
                      <q-tooltip anchor='center left' self='center right'>{{ ratioOption['weibo'] }}</q-tooltip>
                    </q-radio>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='B 站' v-model='ratioSelect' val='bili_bili' @click='repaintPreviewCanvas'>
                      <q-tooltip anchor='center left' self='center right'>{{ ratioOption['bili_bili'] }}</q-tooltip>
                    </q-radio>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='空间' v-model='ratioSelect' val='qq_space' @click='repaintPreviewCanvas'>
                      <q-tooltip anchor='center left' self='center right'>{{ ratioOption['qq_space'] }}</q-tooltip>
                    </q-radio>
                  </div>
                </div>
                <q-input dense outlined clearable type='number' min='0' max='0.5' step='0.01' placeholder='请输入比率（0 ~ 0.5）'
                         :class='`m--btn-input` + (ratioSelect === `input` ? ` --selected` : ``) + ` full-width`' input-class='m--btn-input--input'
                         v-model='ratioInputValue' @focus='ratioSelect = `input`' @focusout='onRatioInputFocusOut'></q-input>
              </div>
              <q-item-label header>切割方式</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='裁切模式' v-model='modeSelect' val='cut' @click='repaintPreviewCanvas'>
                      <q-tooltip anchor='center left' self='center right'>直接按间距切出 9 块</q-tooltip>
                    </q-radio>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='缩扩模式' v-model='modeSelect' val='scale' @click='repaintPreviewCanvas'>
                      <q-tooltip anchor='center left' self='center right'>先平均切成 9 块，再对每份按间距内切</q-tooltip>
                    </q-radio>
                  </div>
                </div>
              </div>
              <q-item-label header>导出尺寸</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='原始像素' v-model='outputSelect' val='original'>
                      <template v-if='cutSize < 0'>
                        <q-tooltip anchor='center left' self='center right'>按照切割后的像素直接导出</q-tooltip>
                      </template>
                      <template v-else>
                        <q-tooltip anchor='center left' self='center right'>按照切割后的像素直接导出（{{ cutSize }} px）</q-tooltip>
                      </template>
                    </q-radio>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-radio dense label='填充切线' v-model='outputSelect' val='scale'>
                      <template v-if='cutSize < 0'>
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
              <q-item-label header>Excel 长图配置文件（可选）</q-item-label>
              <div style='width: 300px; height: 300px'>
                <m-file-drop-area class='fit' :filter='[`xls`, `xlsx`]'></m-file-drop-area>
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
              <q-btn outline no-caps color='primary' label='示例'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
              <q-btn outline no-caps color='primary' label='保存为 Excel'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
              <q-btn unelevated no-caps color='primary' label='导出长图'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--1-1' style='padding: 100px'>
        <m-file-drop-area class='fit'></m-file-drop-area>
      </div>
    </div>
  </q-page>
</template>

<script lang='ts' src='./ImageCutter.ts'/>
<style lang='scss' src='./ImageCutter.scss'/>
<style scoped lang='scss' src='./ImageCutter.scoped.scss'/>
