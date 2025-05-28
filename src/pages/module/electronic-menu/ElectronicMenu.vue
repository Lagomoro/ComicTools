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
              <q-item-label header>基础信息</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <q-input dense outlined clearable class='full-width' placeholder='请输入展会标题' v-model='menuInputData.title' label='展会标题'></q-input>
                <div class='flex'>
                  <q-input dense outlined clearable class='col' placeholder='请输入社团英文' v-model='menuInputData.logoEnglish' label='社团英文'></q-input>
                  <q-input dense outlined clearable class='col q-ml-md' placeholder='请输入社团中文' v-model='menuInputData.logoChinese' label='社团中文'></q-input>
                </div>
              </div>
              <q-item-label header>边距设置</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='左边距' placeholder='请输入左边距' v-model='menuInputData.paddingLeft'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='左边距' placeholder='请输入右边距' v-model='menuInputData.paddingRight'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='上边距' placeholder='请输入上边距' v-model='menuInputData.paddingTop'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='下边距' placeholder='请输入下边距' v-model='menuInputData.paddingBottom'></q-input>
                </div>
                <div class='flex'>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col' label='水平内边距' placeholder='请输入水平内边距' v-model='menuInputData.paddingVertical'></q-input>
                  <q-input dense outlined clearable type='number' min='0' max='20' step='1' class='col q-ml-md' label='垂直内边距' placeholder='请输入垂直内边距' v-model='menuInputData.paddingHorizontal'></q-input>
                </div>
              </div>
            </div>
          </div>
          <div class='m--flex--1-1 flex flex-center'>
            <div class='full-height q-mx-sm'>
              <q-item-label header>显示设置</q-item-label>
              <div class='q-gutter-y-sm' style='width: 300px'>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-item-label>显示详细信息</q-item-label>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-checkbox dense label='首层' v-model='menuInputData.showInfoFirst'></q-checkbox>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-checkbox dense label='组内' v-model='menuInputData.showInfoInner'></q-checkbox>
                  </div>
                </div>
                <div class='m--border--solid--sm m--border--radius--q-btn row' style='height: 36px'>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-item-label>显示提示信息</q-item-label>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-checkbox dense label='分组' v-model='menuInputData.showHintGroup'></q-checkbox>
                  </div>
                  <q-separator vertical></q-separator>
                  <div class='m--flex--1-1 flex flex-center'>
                    <q-checkbox dense label='单品' v-model='menuInputData.showHintData'></q-checkbox>
                  </div>
                </div>
              </div>
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
              <q-btn outline no-caps color='primary' label='获取示例' @click.prevent.stop='exportDefaultExcel' :loading='outputLoading'>
                <template v-slot:loading>
                  <q-spinner-facebook/>
                </template>
              </q-btn>
              <q-btn unelevated no-caps color='primary' label='全屏显示' @click.prevent.stop='requestFullScreen(elementDivElectronMenu)'></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </div>
      <q-separator></q-separator>
      <div class='m--flex--1-1'>
        <div ref='elementDivElectronMenu' class='fit bg-white non-selectable'>
          <div class='fit relative-position'>
            <div class='fit' :style='`padding: ${ menuInputData.paddingTop || 0 }vw ${ menuInputData.paddingRight || 0 }vw ${ menuInputData.paddingBottom || 0 }vw ${ menuInputData.paddingLeft || 0 }vw`'>
              <div class='relative-position'>
                <div class='absolute-top-right' style='top: -2vw'>
                  <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.5vw'>{{ menuInputData.title }}</q-item-label>
                </div>
              </div>
              <q-separator class='bg-primary' style='height: 0.5vw'></q-separator>
              <div class='fit flex column'>
                <div class='full-width m--flex--0-0'>
                  <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.5vw'>{{ menuInputData.logoEnglish }}</q-item-label>
                  <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 3.5vw; transform: translate(-0.2vw, -0.5vw); margin: 0'>{{ menuInputData.logoChinese }}</q-item-label>
                </div>
                <div class='full-width m--flex--1-1'>
                  <template v-if='!electronMenuExcel'>
                    <div class='fit relative-position'>
                      <q-scroll-area class='fit' :thumb-style='{ opacity: `0` }'>
                        <div class='m--electron-menu--scroll-area--flow --top'></div>
                        <div class='m--electron-menu--scroll-area--flow --bottom'></div>
                        <div class='full-width' style='padding: 2vw 0 1vw 0'>
                          <div v-masonry transition-duration='0.3s' item-selector='.m--electron-menu--scroll-area--grid-item'>
                            <template v-for='i in 30' :key='i'>
                              <div v-masonry-tile class='m--electron-menu--scroll-area--grid-item' style='width: 25%; padding: 0.5vw'>
                                <div class='flex row no-wrap'>
                                  <div class='m--flex--1-1'>
                                    <div class='flex row no-wrap items-end'>
                                      <q-skeleton square style='width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw'></q-skeleton>
                                      <q-skeleton class='full-width' style='height: 2vw; margin-left: 0.4vw !important;'></q-skeleton>
                                    </div>
                                    <div style='margin-top: 0.4vw'>
                                      <q-skeleton style='margin: 0 5vw 0 1vw; height: 1.4vw'></q-skeleton>
                                    </div>
                                  </div>
                                  <div class='m--flex--0-0 flex items-end' style='margin-left: 2vw'>
                                    <div class='flex items-end'>
                                      <q-skeleton style='width: 6vw; height: 3vw'></q-skeleton>
                                    </div>
                                  </div>
                                </div>
                                <div style='margin-top: 0.6vw'>
                                  <q-skeleton square class='full-width' style='height: 5.6vw'></q-skeleton>
                                </div>
                                <div style='margin-top: 0.6vw'>
                                  <q-skeleton square class='full-width' :style='`height: ${ ((i + 2) % 5) * 2 + 10 }vw`'></q-skeleton>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </q-scroll-area>
                      <div class='absolute-full' style='padding: 2vw 0 0 0'>
                        <div class='relative-position fit'>
                          <q-inner-loading class='m--border--dash--md fit flex flex-center' :showing='true'>
                            <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>导入 Excel 配置文件</q-item-label>
                            <q-item-label class='m--font--source-han-sans-sc --medium text-no-wrap' style='font-size: 1.5vw'>以揭示你的电子菜单</q-item-label>
                          </q-inner-loading>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <q-scroll-area class='fit' :thumb-style='{ opacity: `0` }'>
                      <div class='m--electron-menu--scroll-area--flow --top'></div>
                      <div class='m--electron-menu--scroll-area--flow --bottom'></div>
                      <div class='full-width' style='padding: 2vw 0 1vw 0'>
                        <div v-masonry transition-duration='0.3s' item-selector='.m--electron-menu--scroll-area--grid-item' column-width='.--column-width'>
                          <template v-for='(groupData, groupIndex) in electronMenuExcel.group' :key='groupIndex'>
                            <q-btn unelevated square no-caps color='white' padding='none' v-masonry-tile class='m--electron-menu--scroll-area--grid-item' :style='`width: ${ 25 * groupData.width }%`' @click.prevent.stop='setGroupDialog(groupData)'>
                              <div class='fit text-black text-left'>
                                <div style='padding: 0.5vw'>
                                  <div class='flex row no-wrap'>
                                    <div>
                                      <div class='flex row no-wrap items-end'>
                                        <div :style='`width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw; background-color: ${ electronMenuExcel.config.themeColor9 }`'></div>
                                        <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.6vw; margin-left: 0.4vw'>{{ groupData.name }}</q-item-label>
                                      </div>
                                      <template v-if='groupData.category'>
                                        <div style='margin-top: 0.4vw'>
                                          <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.2vw; margin-left: 1vw'>{{ groupData.category }}</q-item-label>
                                        </div>
                                      </template>
                                    </div>
                                    <template v-if='groupData.price === 0'>
                                      <div class='m--flex--1-1 relative-position'>
                                        <div class='absolute-right flex row no-wrap items-end'>
                                          <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2.4vw'>无料</q-item-label>
                                        </div>
                                      </div>
                                    </template>
                                    <template v-if='groupData.price > 0'>
                                      <div class='m--flex--1-1 relative-position'>
                                        <div class='absolute-right flex row no-wrap'>
                                          <div class='m--flex--0-0 flex row no-wrap items-end'>
                                            <q-item-label class='m--font--impact' style='font-size: 1.8vw; transform: translate(0, 0.2vw)'>{{ groupData.currency }}</q-item-label>
                                          </div>
                                          <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: 0.3vw'>
                                            <q-item-label class='m--font--impact' style='font-size: 3.6vw; transform: translate(0, 0.55vw)'>{{ groupData.price.toString().split('.')[0] }}.</q-item-label>
                                            <div>
                                              <q-item-label class='m--font--impact' style='font-size: 1.9vw; transform: translate(0, 0.4vw)'>{{ groupData.price.toString().split('.')[1] ? (groupData.price.toString().split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                                              <q-item-label class='text-bold' style='font-size: 1.3vw; margin: 0 0 0 0.2vw; transform: translate(0, 0.15vw)'>/{{ groupData.unit }}</q-item-label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </div>
                                  <template v-if='groupData.description'>
                                    <div class='flex row no-wrap' style='margin-top: 0.6vw'>
                                      <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw; margin-left: 1vw'>
                                        <q-item-label>{{ groupData.description }}</q-item-label>
                                      </div>
                                    </div>
                                  </template>
                                  <template v-if='menuInputData.showInfoFirst'>
                                    <div class='flex row no-wrap' style='margin-top: 0.6vw'>
                                      <div class='m--flex--0-0' :style='`width: 0.3vw; background-color: ${ electronMenuExcel.config.themeColor9 }`'></div>
                                      <div class='full-height m--flex--1-1' style='max-width: calc(100% - 0.3vw)'>
                                        <div class='bg-grey-3' style='padding: 0.6vw 0.8vw 0.8vw 0.8vw'>
                                          <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>
                                            <template v-if='groupData.size'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>规格</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.size }}</q-item-label>
                                              </div>
                                            </template>
                                            <template v-if='groupData.material'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>材质</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.material }}</q-item-label>
                                              </div>
                                            </template>
                                            <template v-if='groupData.manufacture'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>工艺</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.manufacture }}</q-item-label>
                                              </div>
                                            </template>
                                            <template v-if='groupData.producer'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>制造设计</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.producer }}</q-item-label>
                                              </div>
                                            </template>
                                            <template v-if='groupData.author'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>画师</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.author }}</q-item-label>
                                              </div>
                                            </template>
                                            <template v-if='groupData.timestamp'>
                                              <div class='row no-wrap' style='margin-top: 0.2vw'>
                                                <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>定稿日期</q-item-label>
                                                <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupData.timestamp }}</q-item-label>
                                              </div>
                                            </template>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </template>
                                  <template v-if='menuInputData.showHintGroup'>
                                    <template v-if='groupData.titleBefore'>
                                      <div style='margin-top: 0.6vw'>
                                        <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                                          <div class='--title flex row flex-center'>
                                            <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                                            <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ groupData.titleBefore }}</q-item-label>
                                          </div>
                                          <div class='--content'>
                                            <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ groupData.textBefore }}</q-item-label>
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </template>
                                </div>
                                <div>
                                  <div v-masonry transition-duration='0.3s' item-selector='.m--electron-menu--scroll-area--grid-item--group' column-width='.--column-width'>
                                    <template v-for='(data, index) in electronMenuExcel.data' :key='index'>
                                      <template v-if='data.group === groupData.name'>
                                        <ElectronicMenuGridItem :config='electronMenuExcel.config' :data='data' :imageRecord='imageRecord' :showInfo='menuInputData.showInfoInner' :showHint='menuInputData.showHintData' :width='`${ 100 / groupData.width }%`' class='m--electron-menu--scroll-area--grid-item--group --column-width' @click.prevent.stop='setDataDialog(data)'></ElectronicMenuGridItem>
                                      </template>
                                    </template>
                                  </div>
                                </div>
                                <div style='padding: 0.5vw'>
                                  <template v-if='menuInputData.howInfo'>
                                    <template v-if='groupData.titleAfter'>
                                      <div>
                                        <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                                          <div class='--title flex row flex-center'>
                                            <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                                            <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ groupData.titleAfter }}</q-item-label>
                                          </div>
                                          <div class='--content'>
                                            <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ groupData.textAfter }}</q-item-label>
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </template>
                                  <div>
                                    <q-separator class='bg-primary' style='height: 0.2vw'></q-separator>
                                  </div>
                                </div>
                              </div>
                            </q-btn>
                          </template>
                          <template v-for='(data, index) in electronMenuExcel.data' :key='index'>
                            <template v-if='!data.group || data.group === `default`'>
                              <ElectronicMenuGridItem :config='electronMenuExcel.config' :data='data' :imageRecord='imageRecord' :showInfo='menuInputData.showInfoFirst' :showHint='menuInputData.showHintData' width='25%' class='m--electron-menu--scroll-area--grid-item --column-width' @click.prevent.stop='setDataDialog(data)'></ElectronicMenuGridItem>
                            </template>
                          </template>
                        </div>
                      </div>
                    </q-scroll-area>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog class='m--electron-menu--dialog' v-model='dialogShow' @close='closeDialog'>
      <q-card style='width: 80vw'>
        <div class='fit text-black text-left'>
          <div style='padding: 2vw'>
            <div class='flex row no-wrap'>
              <div>
                <div class='flex row no-wrap items-end'>
                  <div :style='`width: 0.5vw; height: 1.2vw; margin-bottom: 0.2vw; background-color: ${ electronMenuExcel.config.themeColor9 }`'></div>
                  <template v-if='groupSelect'>
                    <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.6vw; margin-left: 0.4vw'>{{ groupSelect.name }}</q-item-label>
                  </template>
                  <template v-if='dataSelect'>
                    <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 1.6vw; margin-left: 0.4vw'>{{ dataSelect.name }}</q-item-label>
                  </template>
                </div>
                <template v-if='groupSelect'>
                  <template v-if='groupSelect.category'>
                    <div style='margin-top: 0.4vw'>
                      <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.2vw; margin-left: 1vw'>{{ groupSelect.category }}</q-item-label>
                    </div>
                  </template>
                </template>
                <template v-if='dataSelect'>
                  <template v-if='dataSelect.category'>
                    <div style='margin-top: 0.4vw'>
                      <q-item-label class='m--font--source-han-sans-sc --bold text-no-wrap' style='font-size: 1.2vw; margin-left: 1vw'>{{ dataSelect.category }}</q-item-label>
                    </div>
                  </template>
                </template>
              </div>
              <template v-if='groupSelect'>
                <template v-if='groupSelect.price === 0'>
                  <div class='m--flex--1-1 relative-position'>
                    <div class='absolute-right flex row no-wrap items-end'>
                      <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2.4vw'>无料</q-item-label>
                    </div>
                  </div>
                </template>
                <template v-if='groupSelect.price > 0'>
                  <div class='m--flex--1-1 relative-position'>
                    <div class='absolute-right flex row no-wrap'>
                      <div class='m--flex--0-0 flex row no-wrap items-end'>
                        <q-item-label class='m--font--impact' style='font-size: 1.8vw; transform: translate(0, 0.2vw)'>{{ groupSelect.currency }}</q-item-label>
                      </div>
                      <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: 0.3vw'>
                        <q-item-label class='m--font--impact' style='font-size: 3.6vw; transform: translate(0, 0.55vw)'>{{ groupSelect.price.toString().split('.')[0] }}.</q-item-label>
                        <div>
                          <q-item-label class='m--font--impact' style='font-size: 1.9vw; transform: translate(0, 0.4vw)'>{{ groupSelect.price.toString().split('.')[1] ? (groupSelect.price.toString().split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                          <q-item-label class='text-bold' style='font-size: 1.3vw; margin: 0 0 0 0.2vw; transform: translate(0, 0.15vw)'>/{{ groupSelect.unit }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <template v-if='dataSelect'>
                <template v-if='dataSelect.price === 0'>
                  <div class='m--flex--1-1 relative-position'>
                    <div class='absolute-right flex row no-wrap items-end'>
                      <q-item-label class='m--font--ys-hello-font-bang-bang-ti text-no-wrap' style='font-size: 2.4vw'>无料</q-item-label>
                    </div>
                  </div>
                </template>
                <template v-if='dataSelect.price > 0'>
                  <div class='m--flex--1-1 relative-position'>
                    <div class='absolute-right flex row no-wrap'>
                      <div class='m--flex--0-0 flex row no-wrap items-end'>
                        <q-item-label class='m--font--impact' style='font-size: 1.8vw; transform: translate(0, 0.2vw)'>{{ dataSelect.currency }}</q-item-label>
                      </div>
                      <div class='m--flex--0-0 flex row no-wrap items-end' style='margin-left: 0.3vw'>
                        <q-item-label class='m--font--impact' style='font-size: 3.6vw; transform: translate(0, 0.55vw)'>{{ dataSelect.price.toString().split('.')[0] }}.</q-item-label>
                        <div>
                          <q-item-label class='m--font--impact' style='font-size: 1.9vw; transform: translate(0, 0.4vw)'>{{ dataSelect.price.toString().split('.')[1] ? (dataSelect.price.toString().split('.')[1] + '00').substring(0, 2) : '00' }}</q-item-label>
                          <q-item-label class='text-bold' style='font-size: 1.3vw; margin: 0 0 0 0.2vw; transform: translate(0, 0.15vw)'>/{{ dataSelect.unit }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
            <template v-if='groupSelect'>
              <template v-if='groupSelect.description'>
                <div class='flex row no-wrap' style='margin-top: 0.6vw'>
                  <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw; margin-left: 1vw'>
                    <q-item-label>{{ groupSelect.description }}</q-item-label>
                  </div>
                </div>
              </template>
            </template>
            <template v-if='dataSelect'>
              <template v-if='dataSelect.description'>
                <div class='flex row no-wrap' style='margin-top: 0.6vw'>
                  <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw; margin-left: 1vw'>
                    <q-item-label>{{ dataSelect.description }}</q-item-label>
                  </div>
                </div>
              </template>
            </template>
            <div class='flex row no-wrap' style='margin-top: 0.6vw'>
              <template v-if='dataSelect'>
                <template v-if='dataSelect.id in imageRecord'>
                  <div class='m--flex--0-0' style='width: calc(50% - 1vw)'>
                    <div>
                      <q-img :src='imageRecord[dataSelect.id]'></q-img>
                    </div>
                  </div>
                  <div class='m--flex--1-1'>

                  </div>
                </template>
              </template>
              <div class='m--flex--0-0' :style='dataSelect && dataSelect.id in imageRecord ? `width: calc(50% - 1vw)` : `width: 100%`'>
                <template v-if='groupSelect'>
                  <div class='flex row no-wrap'>
                    <div class='m--flex--0-0' :style='`width: 0.3vw; background-color: ${ electronMenuExcel.config.themeColor9 }`'></div>
                    <div class='full-height m--flex--1-1' style='max-width: calc(100% - 0.3vw)'>
                      <div class='bg-grey-3' style='padding: 0.6vw 0.8vw 0.8vw 0.8vw'>
                        <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>
                          <template v-if='groupSelect.size'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>规格</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.size }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='groupSelect.material'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>材质</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.material }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='groupSelect.manufacture'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>工艺</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.manufacture }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='groupSelect.producer'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>制造设计</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.producer }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='groupSelect.author'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>画师</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.author }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='groupSelect.timestamp'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>定稿日期</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ groupSelect.timestamp }}</q-item-label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if='dataSelect'>
                  <div class='flex row no-wrap'>
                    <div class='m--flex--0-0' :style='`width: 0.3vw; background-color: ${ electronMenuExcel.config.themeColor9 }`'></div>
                    <div class='full-height m--flex--1-1' style='max-width: calc(100% - 0.3vw)'>
                      <div class='bg-grey-3' style='padding: 0.6vw 0.8vw 0.8vw 0.8vw'>
                        <div class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>
                          <template v-if='dataSelect.size'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>规格</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.size }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='dataSelect.material'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>材质</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.material }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='dataSelect.manufacture'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>工艺</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.manufacture }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='dataSelect.producer'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>制造设计</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.producer }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='dataSelect.author'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>画师</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.author }}</q-item-label>
                            </div>
                          </template>
                          <template v-if='dataSelect.timestamp'>
                            <div class='row no-wrap' style='margin-top: 0.2vw'>
                              <q-item-label class='text-no-wrap m--electron-menu--scroll-area--grid-item--justify-info'>定稿日期</q-item-label>
                              <q-item-label class='text-no-wrap ellipsis' style='margin: 0'>：{{ dataSelect.timestamp }}</q-item-label>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if='groupSelect'>
                  <template v-if='groupSelect.titleBefore'>
                    <div style='margin-top: 0.6vw'>
                      <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                        <div class='--title flex row flex-center'>
                          <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                          <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ groupSelect.titleBefore }}</q-item-label>
                        </div>
                        <div class='--content'>
                          <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ groupSelect.textBefore }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if='dataSelect'>
                  <template v-if='dataSelect.titleBefore'>
                    <div style='margin-top: 0.6vw'>
                      <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                        <div class='--title flex row flex-center'>
                          <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                          <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ dataSelect.titleBefore }}</q-item-label>
                        </div>
                        <div class='--content'>
                          <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ dataSelect.textBefore }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if='groupSelect'>
                  <template v-if='groupSelect.titleAfter'>
                    <div style='margin-top: 0.6vw'>
                      <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                        <div class='--title flex row flex-center'>
                          <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                          <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ groupSelect.titleAfter }}</q-item-label>
                        </div>
                        <div class='--content'>
                          <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ groupSelect.textAfter }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-if='dataSelect'>
                  <template v-if='dataSelect.titleAfter'>
                    <div style='margin-top: 0.6vw'>
                      <div class='m--electron-menu--scroll-area--grid-item--warning-card'>
                        <div class='--title flex row flex-center'>
                          <q-icon size='1.2vw' name='mdi-alert-circle-outline' style='transform: translate(0, 0.05vw)'></q-icon>
                          <q-item-label class='m--font--source-han-sans-sc --medium text-center' style='font-size: 1.1vw; margin-left: 0.2vw'>{{ dataSelect.titleAfter }}</q-item-label>
                        </div>
                        <div class='--content'>
                          <q-item-label class='m--font--source-han-sans-sc --medium' style='font-size: 1vw'>{{ dataSelect.textAfter }}</q-item-label>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang='ts' src='./ElectronicMenu.ts'/>
<style lang='scss' src='./ElectronicMenu.scss'/>
<style scoped lang='scss' src='./ElectronicMenu.scoped.scss'/>
