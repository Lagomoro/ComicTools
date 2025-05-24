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
                <q-btn unelevated no-caps color='primary' label='导出图片' @click.prevent.stop='saveCanvasData' :loading='outputLoading'>
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
              <div class='m--good-display-nfc-e-paper--e-paper-container'>
                <div class='fit flex flex-center relative-position m--outline--dash--md m--border--radius--md'>
                  <div class='absolute-top full-width flex flex-center' style='height: 66px'>
                    <q-item-label caption>GDEY029F51H (384 px * 168 px)</q-item-label>
                  </div>
                  <div class='m--outline--solid--sm bg-white' style='min-width: 394px; max-width: 394px; width: 394px;min-height: 168px; max-height: 168px; height: 168px' ref='outputElement'>
                    <div class='fit flex row no-wrap'>
                      <div class='full-height m--flex--1-1'>
                        <div class='flex items-center' style='height: 30px'>
                          <div class='fit'>
                            <div class='fit flex items-center m--good-display-nfc-e-paper--e-paper-pl'>
                              <q-item-label class='text-bold q-ml-sm' style='font-size: 22px; transform: translate(0, -1px)'>{{ tagInputData.title }}</q-item-label>
                            </div>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 30px'>
                          <div :class='`fit ` + tagInputData.discountColor'>
                            <div class='fit flex items-center m--good-display-nfc-e-paper--e-paper-pl'>
                              <q-item-label :class='`m--font--ys-hello-font-bang-bang-ti ` + (tagInputData.discountColor === `bg-yellow` ? `text-black` : `text-white`) + ` q-ml-sm`' style='font-size: 21px; transform: translate(0, -3px)'>{{ tagInputData.discount }}</q-item-label>
                            </div>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 59px'>
                          <div class='fit'>
                            <div class='fit row no-wrap m--good-display-nfc-e-paper--e-paper-pl'>
                              <template v-if='tagInputData.free'>
                                <div class='m--flex--0-0 row no-wrap q-ml-sm'>
                                  <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 50px; transform: translate(0, -5px); margin: 0'>无料</q-item-label>
                                </div>
                                <div class='m--flex--0-0 row no-wrap q-ml-sm'>
                                  <div class='flex items-center full-height'>
                                    <div style='width: 190px'>
                                      <q-item-label style='font-size: 13px' class='text-no-wrap text-bold'>领取方式：</q-item-label>
                                      <q-item-label style='font-size: 14px; margin-top: 2px' class='text-bold'>{{ tagInputData.freeInfo }}</q-item-label>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <template v-else>
                                <template v-if='tagInputData.priceA && parseFloat(tagInputData.priceA) > 0'>
                                  <div class='m--flex--0-0 row no-wrap q-ml-sm'>
                                    <q-item-label class='m--font--impact' style='font-size: 57px; transform: translate(0, -4px)'>{{ tagInputData.priceA.split('.')[0] }}.</q-item-label>
                                    <div>
                                      <q-item-label class='m--font--impact' style='font-size: 30px'>{{ tagInputData.priceA.split('.')[1] ? (tagInputData.priceA.split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                                      <q-item-label class='text-bold' style='font-size: 20px; margin: 0 0 0 2px; transform: translate(0, -3px)'>/{{ tagInputData.unitA }}</q-item-label>
                                    </div>
                                  </div>
                                  <div class='m--flex--0-0 q-ml-xs q-mr-sm'>
                                    <q-item-label class='m--font--impact' style='font-size: 20px; transform: translate(0, 2px)'>{{ tagInputData.currency }}</q-item-label>
                                  </div>
                                </template>
                                <template v-if='tagInputData.priceB && parseFloat(tagInputData.priceB) > 0'>
                                  <div class='m--flex--0-0 row no-wrap q-ml-sm'>
                                    <q-item-label class='m--font--impact' style='font-size: 57px; transform: translate(0, -4px)'>{{ tagInputData.priceB.split('.')[0] }}.</q-item-label>
                                    <div>
                                      <q-item-label class='m--font--impact' style='font-size: 30px'>{{ tagInputData.priceB.split('.')[1] ? (tagInputData.priceB.split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                                      <q-item-label class='text-bold' style='font-size: 20px; margin: 0 0 0 2px; transform: translate(0, -3px)'>/{{ tagInputData.unitB }}</q-item-label>
                                    </div>
                                  </div>
                                  <div class='m--flex--0-0 q-ml-xs q-mr-sm'>
                                    <q-item-label class='m--font--impact' style='font-size: 20px; transform: translate(0, 2px)'>{{ tagInputData.currency }}</q-item-label>
                                  </div>
                                </template>
                              </template>
                              <div class='m--flex--1-1'>

                              </div>
                              <div class='m--flex--0-0 q-mr-xs'>
                                <div class='flex flex-center' style='width: 51px; height: 59px'>
                                  <div>
                                    <template v-for='x in tagCalcData.qrCodeSize' :key='x'>
                                      <div class='row no-wrap'>
                                        <template v-for='y in tagCalcData.qrCodeSize' :key='y'>
                                          <template v-if='tagCalcData.qrCodeData[(x - 1) * tagCalcData.qrCodeSize + (y - 1)] === 1'>
                                            <div class='bg-black' style='width: 1px; height:1px'></div>
                                          </template>
                                          <template v-else>
                                            <div class='bg-white' style='width: 1px; height:1px'></div>
                                          </template>
                                        </template>
                                      </div>
                                    </template>
                                  </div>
                                </div>
                              </div>
                              <template v-if='!tagInputData.info'>
                                <div class='m--flex--0-0 q-mr-xs'>

                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 1px'>
                          <div class='fit'>
                            <div class='fit bg-black'>

                            </div>
                          </div>
                        </div>
                        <div class='flex items-center' style='height: 48px'>
                          <div class='fit'>
                            <div class='fit row no-wrap m--good-display-nfc-e-paper--e-paper-pl'>
                              <div class='m--flex--0-0 q-ml-sm'>
                                <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 13px'>{{ tagInputData.logoEnglish }}</q-item-label>
                                <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 28px; transform: translate(-2px, -4px); margin: 0'>{{ tagInputData.logoChinese }}</q-item-label>
                              </div>
                              <div class='m--flex--1-1' style='margin-left: 6px'>
                                <div class='flex'>
                                  <div class='flex column items-center'>
                                    <div class='flex row m--flex--1-1' style='height: 34px; padding: 4px 0 2px 0'>
                                      <template v-for='(data, index) in tagCalcData.barcode' :key='index'>
                                        <template v-if='data === 1'>
                                          <div class='bg-black' style='width: 1px'></div>
                                        </template>
                                        <template v-else>
                                          <div class='bg-white' style='width: 1px'></div>
                                        </template>
                                      </template>
                                    </div>
                                    <div class='flex row m--flex--0-0'>
                                      <q-item-label class='text-bold' style='font-size: 11px'>{{ tagInputData.barcodeText }}</q-item-label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class='m--flex--0-0 q-mr-sm'>
                                <div class='flex items-center full-height'>
                                  <div class='text-bold' style='font-size: 12px; margin-top: 1px'>
                                    <div class='row no-wrap'>
                                      <q-item-label class='text-no-wrap' style='width: 34px; text-align: justify; text-align-last: justify'>{{ tagInputData.keyA }}</q-item-label>
                                      <q-item-label class='text-no-wrap' style='margin: 0'>：{{ tagInputData.valueA }}</q-item-label>
                                    </div>
                                    <div class='row no-wrap'>
                                      <q-item-label class='text-no-wrap' style='width: 34px; text-align: justify; text-align-last: justify'>{{ tagInputData.keyB }}</q-item-label>
                                      <q-item-label class='text-no-wrap' style='margin: 0'>：{{ tagInputData.valueB }}</q-item-label>
                                    </div>
                                    <div class='row no-wrap'>
                                      <q-item-label class='text-no-wrap' style='width: 34px; text-align: justify; text-align-last: justify'>{{ tagInputData.keyC }}</q-item-label>
                                      <q-item-label class='text-no-wrap' style='margin: 0'>：{{ tagInputData.valueC }}</q-item-label>
                                    </div>
                                  </div>
                                  <div style='font-size: 11px'>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <template v-if='tagInputData.info'>
                        <div class='flex m--flex--0-0'>
                          <div :class='`flex items-center ` + tagInputData.infoColor' style='width: 20px'>
                            <div class='fit flex flex-center'>
                              <div style='font-size: 12px' :class='tagInputData.infoColor === `bg-yellow` ? `text-black` : `text-white`'>
                                <template v-for='(data, index) in tagInputData.info' :key='index'>
                                  <q-item-label style='margin: 4px 0'>{{ data }}</q-item-label>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class='absolute-bottom full-width flex flex-center q-pa-md'>
                    <q-btn unelevated color='primary' label='刷新' @click.prevent.stop='calcTagData'></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>基础信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <q-input dense outlined clearable class='full-width' placeholder='请输入制品名称' v-model='tagInputData.title' label='制品名称'></q-input>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' placeholder='请输入社团英文' v-model='tagInputData.logoEnglish' label='社团英文'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入社团中文' v-model='tagInputData.logoChinese' label='社团中文'></q-input>
                </div>
              </div>
              <q-item-label header>促销信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <q-input dense outlined clearable placeholder='请输入折扣文字' class='full-width' v-model='tagInputData.discount' label='折扣文字'></q-input>
                <q-input dense outlined clearable placeholder='请输入提示文字' class='full-width' v-model='tagInputData.info' label='提示文字'></q-input>
                <div class='flex'>
                  <q-select dense outlined lazy-rules emit-value map-options hide-dropdown-icon options-dense class='col' label='折扣区域颜色' :options='colorPickerOption' v-model='tagInputData.discountColor'></q-select>
                  <q-select dense outlined lazy-rules emit-value map-options hide-dropdown-icon options-dense class='col q-ml-md' label='提示区域颜色' :options='colorPickerOption' v-model='tagInputData.infoColor'></q-select>
                </div>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>价格信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' type='number' min='0' step='0.01' placeholder='请输入单价' v-model='tagInputData.priceA' label='单价'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入制品单位' v-model='tagInputData.unitA' label='制品单位'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' type='number' min='0' step='0.01' placeholder='请输入套装价' v-model='tagInputData.priceB' label='套装价'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入套装单位' v-model='tagInputData.unitB' label='套装单位'></q-input>
                </div>
                <q-select dense outlined lazy-rules emit-value map-options hide-dropdown-icon options-dense class='full-width' label='货币单位' :options='currencyOption' v-model='tagInputData.currency'></q-select>
              </div>
              <q-item-label header>无料信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex items-center'>
                    <q-checkbox dense class='q-ml-md' label='无料制品' v-model='tagInputData.free'></q-checkbox>
                  </div>
                </div>
                <q-input dense outlined clearable placeholder='请输入无料领取条件' class='full-width' v-model='tagInputData.freeInfo' label='无料领取条件' @update:model-value='calcTagData'></q-input>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>标签信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' placeholder='请输入标签' v-model='tagInputData.keyA'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入标签的值' v-model='tagInputData.valueA'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' placeholder='请输入标签' v-model='tagInputData.keyB'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入标签的值' v-model='tagInputData.valueB'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' placeholder='请输入标签' v-model='tagInputData.keyC'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入标签的值' v-model='tagInputData.valueC'></q-input>
                </div>
              </div>
              <q-item-label header>智能信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <q-input dense outlined clearable placeholder='请输入二维码数据' class='full-width' v-model='tagInputData.qrCodeText' label='二维码数据' @update:model-value='calcTagData'></q-input>
                <q-input dense outlined clearable placeholder='请输入条形码数据' class='full-width' v-model='tagInputData.barcodeText' label='条形码数据' @update:model-value='calcTagData'></q-input>
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
                <q-btn unelevated no-caps color='primary' label='下载安卓运行库' href='./static/ComicTools.apk' download='ComicTools.apk'></q-btn>
                <q-btn unelevated no-caps color='primary' label='写入智能价签' @click.prevent.stop='exportToEPaper' :loading='outputLoading'>
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
