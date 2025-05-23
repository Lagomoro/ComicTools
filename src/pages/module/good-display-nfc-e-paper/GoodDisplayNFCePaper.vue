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
                <q-btn unelevated no-caps color='primary' label='导出图片' @click='outputBaseImage' :loading='outputLoading' :disable='!originImageSrc'>
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
              <q-item-label header>标签预览</q-item-label>
              <div style='width: 500px; height: 300px'>
                <div class='fit flex flex-center relative-position m--outline--dash--md m--border--radius--md'>
                  <div class='absolute-top full-width flex flex-center' style='height: 66px'>
                    <q-item-label caption>GDEY029F51H (384 px * 168 px)</q-item-label>
                  </div>
                  <div class='m--outline--solid--sm' style='width: 384px; height: 168px'>
                    <div class='fit flex row'>
                      <div class='full-height m--flex--1-1'>
                        <div class='flex items-center' style='height: 30px'>
                          <div class='fit flex items-center'>
                            <q-item-label style='font-size: 20px' class='q-ml-sm'>光栅卡 • 游戏开发部角色信息</q-item-label>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 30px'>
                          <div class='fit flex items-center bg-orange'>
                            <q-item-label style='font-family: 优设字由棒棒体, serif; font-size: 21px; transform: translate(0, -3px)' class='text-white q-ml-sm'>当期新品</q-item-label>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 60px'>
                          <div class='fit row'>
                            <div class='row q-ml-sm'>
                              <q-item-label style='font-family: Impact, serif; font-size: 60px; transform: translate(0, -6px)'>10.</q-item-label>
                              <div>
                                <q-item-label style='font-family: Impact, serif; font-size: 30px; transform: translate(0, 1px)'>00</q-item-label>
                                <q-item-label style='font-size: 20px; margin-left: 2px; transform: translate(0, -5px)'>/张</q-item-label>
                              </div>
                            </div>
                            <div class='row q-ml-sm'>
                              <q-item-label style='font-family: Impact, serif; font-size: 20px; transform: translate(0, 3px)'>CNY</q-item-label>
                            </div>
                            <div class='row q-ml-md'>
                              <q-item-label style='font-family: Impact, serif; font-size: 60px; transform: translate(0, -6px)'>36.</q-item-label>
                              <div>
                                <q-item-label style='font-family: Impact, serif; font-size: 30px; transform: translate(0, 1px)'>00</q-item-label>
                                <q-item-label style='font-size: 20px; margin-left: 2px; transform: translate(0, -5px)'>/套</q-item-label>
                              </div>
                            </div>
                            <div class='row q-ml-sm'>
                              <q-item-label style='font-family: Impact, serif; font-size: 20px; transform: translate(0, 3px)'>CNY</q-item-label>
                            </div>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 1px'>
                          <div class='fit bg-black'></div>
                        </div>
                        <div class='flex items-center' style='height: 47px'>
                          <div class='fit row'>
                            <div class='q-ml-sm'>
                              <q-item-label style='font-family: 优设字由棒棒体, serif; font-size: 11px'>MoroWorks</q-item-label>
                              <q-item-label style='font-family: 优设字由棒棒体, serif; font-size: 26px; transform: translate(-2px, -3px); margin: 0'>兔萌社</q-item-label>
                            </div>
                            <div class='q-ml-md'>
                              <div class='flex column items-center'>
                                <div class='flex row m--flex--1-1' style='height: 31px; padding: 4px 0 2px 0'>
                                  <div class='bg-black' style='width: 4px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 1px'></div>
                                  <div class='bg-white' style='width: 1px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 3px'></div>
                                  <div class='bg-white' style='width: 2px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 2px'></div>
                                  <div class='bg-white' style='width: 3px'></div>
                                  <div class='bg-black' style='width: 4px'></div>
                                </div>
                                <div class='flex row m--flex--0-0'>
                                  <q-item-label style='font-size: 10px'>MW-LM001-20250205</q-item-label>
                                </div>
                              </div>
                            </div>
                            <div class='flex items-center q-ml-md'>
                              <div>
                                <q-item-label style='font-size: 11px'>材&nbsp;&nbsp;&nbsp;&nbsp;质：PVC</q-item-label>
                                <q-item-label style='font-size: 11px; margin: 0'>工&nbsp;&nbsp;&nbsp;&nbsp;艺：透明光栅</q-item-label>
                                <q-item-label style='font-size: 11px; margin: 0'>画&nbsp;&nbsp;&nbsp;&nbsp;师：Lagomoro</q-item-label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class='flex m--flex--0-0'>
                        <div class='flex items-center' style='width: 20px'>
                          <div class='fit flex flex-center bg-red'>
                            <q-item-label style='font-size: 12px; transform: translate(-2px, 0); writing-mode: vertical-rl' class='text-white'>展&nbsp;&nbsp;会&nbsp;&nbsp;限&nbsp;&nbsp;定&nbsp;&nbsp;制&nbsp;&nbsp;品</q-item-label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='absolute-bottom full-width flex flex-center q-pa-md'>
                    <q-btn unelevated color='primary' label='刷新' @click='removeOriginImage'></q-btn>
                  </div>
                </div>
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
        </div>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--0-0'>
        <div class='fit row q-px-sm'>
          <q-item class='fit q-pa-none no-wrap text-no-wrap'>
            <q-item-section>
              <q-item-label header>GDEY029F51H</q-item-label>
            </q-item-section>
            <q-item-section side class='q-mr-md'>
              <div class='q-gutter-x-sm'>
                <q-btn unelevated no-caps color='primary' label='写入智能价签' @click='createLaunchCard(`com.nexon.bluearchive`)' :loading='outputLoading'>
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
      <div class='m--flex--1-1'>

      </div>
    </div>
  </q-page>
</template>

<script lang='ts' src='./GoodDisplayNFCePaper.ts'/>
<style lang='scss' src='./GoodDisplayNFCePaper.scss'/>
<style scoped lang='scss' src='./GoodDisplayNFCePaper.scoped.scss'/>
