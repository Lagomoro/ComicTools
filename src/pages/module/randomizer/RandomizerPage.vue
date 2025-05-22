<template>
  <q-page style='height: 0'>
    <div class='fit flex flex-center'>
      <q-card square bordered class='m--randomizer--card'>
        <q-tabs v-model='currentTab'>
          <q-tab name='random' label='随机数生成器'></q-tab>
          <q-tab name='lottery' label='列表抽取'></q-tab>
        </q-tabs>
        <q-separator></q-separator>
        <q-tab-panels v-model='currentTab'>
          <q-tab-panel name='random' class='q-pa-none'>
            <div class='q-pa-lg'>
              <div class='flex flex-center q-pb-md'>
                <q-item-label class='m--text--md'>直播展示区域</q-item-label>
              </div>
              <q-card square bordered flat class='overflow-hidden'>
                <div>
                  <div class='q-my-md'>
                    <q-input borderless input-class='m--text--xl text-center' type='text' placeholder='随机数生成器' v-model='configRandom.title'></q-input>
                  </div>

                  <div class='flex flex-center'>
                    <div ref='elementDivRandom' class='flex flex-center overflow-hidden relative-position full-width m--randomizer--value-field q-mx-lg'>
                      <div ref='elementAutoRandom' class='--auto'>{{ randomizerRandom.currentValue.length > 0 ? randomizerRandom.currentValue.join(' ') : '-' }}</div>
                      <div ref='elementTextRandom' class='--text'>{{ randomizerRandom.currentValue.length > 0 ? randomizerRandom.currentValue.join(' ') : '-' }}</div>
                    </div>
                  </div>

                  <div class='flex flex-center q-py-md q-mt-lg'>
                    <div class='flex flex-center m--randomizer--result-field q-mx-lg'>
                      <q-item-label caption class='m--text--md' style='-webkit-user-select: all !important; user-select: all !important'>已中列表：{{ randomizerRandom.result.length > 0 ? randomizerRandom.result.join(' ') : '空' }}</q-item-label>
                    </div>
                  </div>

                  <div class='relative-position'>
                    <div class='row q-pa-md'>
                      <template v-if='!randomizerRandom.isBusy'>
                        <q-icon size='18px' name='mdi-check-circle-outline' color='positive'></q-icon>
                        <q-item-label caption class='m--text--md q-ml-sm'>待机中</q-item-label>
                      </template>
                      <template v-else>
                        <template v-if='randomizerRandom.requestCount < randomizerRandom.requestMax'>
                          <q-spinner size='18px'></q-spinner>
                          <q-item-label caption class='m--text--md q-ml-sm'>正在{{ configRandom.algorithm ? '请求 random.org' : '本地运算' }} ({{ randomizerRandom.requestCount }}/{{ randomizerRandom.requestMax }})</q-item-label>
                        </template>
                        <template v-else>
                          <q-spinner size='18px' color='positive'></q-spinner>
                          <q-item-label caption class='m--text--md q-ml-sm'>已从{{ configRandom.algorithm ? ' random.org ' : '本地' }} 获取全部随机数 ({{ randomizerRandom.requestCount }}/{{ randomizerRandom.requestMax }})</q-item-label>
                        </template>
                      </template>
                    </div>
                    <div class='absolute-bottom'>
                      <q-linear-progress :animation-speed='200' :value='randomizerRandom.requestCount / randomizerRandom.requestMax'></q-linear-progress>
                    </div>
                  </div>
                </div>
              </q-card>
              <div class='flex flex-center q-py-md'>
                <q-item-label class='m--text--md'>控制区域</q-item-label>
              </div>
              <q-card square bordered flat>
                <div class='q-pa-xl'>
                  <div class='row'>
                    <div class='col'>
                      <q-item-label caption style='margin-bottom: 2px'>最小值</q-item-label>
                      <q-input square outlined dense type='number' placeholder='最小值，默认为 0' :disable='configRandom.lock' v-model='configRandom.min'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-minus-circle-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class='col q-ml-md'>
                      <q-item-label caption style='margin-bottom: 2px'>最大值</q-item-label>
                      <q-input square outlined dense type='number' placeholder='最大值，默认为 1' :disable='configRandom.lock' v-model='configRandom.max'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-plus-circle-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class='col q-ml-md'>
                      <q-item-label caption style='margin-bottom: 2px'>生成随机数的数量</q-item-label>
                      <q-input square outlined dense type='number' placeholder='随机次数，默认为 1' :disable='randomizerRandom.isBusy' v-model='configRandom.count'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-clock-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class='row q-mt-md'>
                    <div class='col'>
                      <q-btn square :unelevated='!disableAutoRandom' :outline='disableAutoRandom' class='full-width' :color='disableAutoRandom ? `grey-5` : `primary`' label='自动抽取'
                             :disable='disableAutoRandom' @click.prevent.stop='autoRandom'></q-btn>
                    </div>
                    <div class='col q-ml-md'>
                      <q-btn square :unelevated='!disableManualRandom' :outline='disableManualRandom' class='full-width' :color='disableManualRandom ? `grey-5` : `primary`' label='手动抽取'
                             :disable='disableManualRandom' @click.prevent.stop='manualRandom'></q-btn>
                    </div>
                    <div class='col q-ml-md'>
                      <q-btn square :unelevated='!disableResetRandom' :outline='disableResetRandom' class='full-width' :color='disableResetRandom ? `grey-5` : `negative`' label='重置'
                             :disable='disableResetRandom' @click.prevent.stop='resetRandom'></q-btn>
                    </div>
                  </div>
                  <div class='row q-mt-md'>
                    <div class='col-2'>
                      <q-checkbox dense label='允许重复' :disable='configRandom.lock' v-model='configRandom.allowRepeated'></q-checkbox>
                    </div>
                    <div class='col q-ml-md'>
                      <q-checkbox dense label='使用 random.org，基于物理（大气噪音）的真随机生成器' :disable='randomizerRandom.isBusy' v-model='configRandom.algorithm' @update:model-value='updateAlgorithmRandom()'></q-checkbox>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-tab-panel>
          <q-tab-panel name='lottery' class='q-pa-none'>
            <div class='q-pa-lg'>
              <div class='flex flex-center q-pb-md'>
                <q-item-label class='m--text--md'>直播展示区域</q-item-label>
              </div>
              <q-card square bordered flat class='overflow-hidden'>
                <div>
                  <div class='q-my-md'>
                    <q-input borderless input-class='m--text--xl text-center' type='text' placeholder='列表抽取' v-model='configLottery.title'></q-input>
                  </div>

                  <div class='flex flex-center'>
                    <div ref='elementDivLottery' class='flex flex-center overflow-hidden relative-position full-width m--randomizer--value-field q-mx-lg'>
                      <div ref='elementAutoLottery' class='--auto'>{{ randomizerLottery.currentValue.length > 0 ? randomizerLottery.currentValue.join(' ') : '-' }}</div>
                      <div ref='elementTextLottery' class='--text'>{{ randomizerLottery.currentValue.length > 0 ? randomizerLottery.currentValue.join(' ') : '-' }}</div>
                    </div>
                  </div>

                  <div class='flex flex-center q-py-md q-mt-lg'>
                    <div class='flex flex-center m--randomizer--result-field q-mx-lg'>
                      <q-item-label caption class='m--text--md non-selectable' style='-webkit-user-select: all !important; user-select: all !important'>已中列表：{{ randomizerLottery.result.length > 0 ? randomizerLottery.result.join(' ') : '空' }}</q-item-label>
                    </div>
                  </div>

                  <div class='relative-position'>
                    <div class='row q-pa-md'>
                      <template v-if='!randomizerLottery.isBusy'>
                        <q-icon size='18px' name='mdi-check-circle-outline' color='positive'></q-icon>
                        <q-item-label caption class='m--text--md q-ml-sm'>待机中</q-item-label>
                      </template>
                      <template v-else>
                        <template v-if='randomizerLottery.requestCount < randomizerLottery.requestMax'>
                          <q-spinner size='18px'></q-spinner>
                          <q-item-label caption class='m--text--md q-ml-sm'>正在{{ configLottery.algorithm ? '请求 random.org' : '本地运算' }} ({{ randomizerLottery.requestCount }}/{{ randomizerLottery.requestMax }})</q-item-label>
                        </template>
                        <template v-else>
                          <q-spinner size='18px' color='positive'></q-spinner>
                          <q-item-label caption class='m--text--md q-ml-sm'>已从{{ configLottery.algorithm ? ' random.org ' : '本地' }} 获取全部随机数 ({{ randomizerLottery.requestCount }}/{{ randomizerLottery.requestMax }})</q-item-label>
                        </template>
                      </template>
                    </div>
                    <div class='absolute-bottom'>
                      <q-linear-progress :animation-speed='200' :value='randomizerLottery.requestCount / randomizerLottery.requestMax'></q-linear-progress>
                    </div>
                  </div>
                </div>
              </q-card>
              <div class='flex flex-center q-py-md'>
                <q-item-label class='m--text--md'>控制区域</q-item-label>
              </div>
              <q-card square bordered flat>
                <div class='q-pa-xl'>
                  <div class='row'>
                    <div class='col'>
                      <q-item-label caption style='margin-bottom: 2px'>随机抽取列表，以空格或换行符分隔</q-item-label>
                      <q-input square outlined dense autogrow clearable type='textarea' input-class='m--randomizer--textarea--input' placeholder='随机抽取数据，默认为 1 2 3 4' :disable='configLottery.lock' v-model='configLottery.dataArray'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-format-list-bulleted'></q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class='row q-mt-md'>
                    <div class='col'>
                      <q-item-label caption style='margin-bottom: 2px'>剔除数据，以空格分隔（这里出现的不会被抽中）</q-item-label>
                      <q-input square outlined dense clearable placeholder='剔除数据，默认为 空' :disable='randomizerLottery.isBusy' v-model='configLottery.ignoreArray' @update:model-value='updateIgnoreArrayLottery'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-cancel'></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class='m--randomizer--width-3 q-ml-md'>
                      <q-item-label caption style='margin-bottom: 2px'>随机抽取的数量</q-item-label>
                      <q-input square outlined dense type='number' placeholder='随机次数，默认为 1' :disable='randomizerLottery.isBusy' v-model='configLottery.count'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-clock-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class='row q-mt-md'>
                    <div class='col'>
                      <q-btn square :unelevated='!disableAutoLottery' :outline='disableAutoLottery' class='full-width' :color='disableAutoLottery ? `grey-5` : `primary`' label='自动抽取'
                             :disable='disableAutoLottery' @click.prevent.stop='autoLottery'></q-btn>
                    </div>
                    <div class='col q-mx-md'>
                      <q-btn square :unelevated='!disableManualLottery' :outline='disableManualLottery' class='full-width' :color='disableManualLottery ? `grey-5` : `primary`' label='手动抽取'
                             :disable='disableManualLottery' @click.prevent.stop='manualLottery'></q-btn>
                    </div>
                    <div class='col'>
                      <q-btn square :unelevated='!disableResetLottery' :outline='disableResetLottery' class='full-width' :color='disableResetLottery ? `grey-5` : `negative`' label='重置'
                             :disable='disableResetLottery' @click.prevent.stop='resetLottery'></q-btn>
                    </div>
                  </div>
                  <div class='row q-mt-md'>
                    <div class='col'>
                      <q-checkbox dense label='使用 random.org，基于物理（大气噪音）的真随机生成器' :disable='randomizerLottery.isBusy' v-model='configLottery.algorithm' @update:model-value='updateAlgorithmLottery()'></q-checkbox>
                    </div>
                  </div>
                  <div class='flex items-center'>
                    <q-separator class='q-my-lg m--flex--1-1'></q-separator>
                    <q-icon class='q-mx-md' name='mdi-circle-outline' color='grey'></q-icon>
                    <q-separator class='q-my-lg m--flex--1-1'></q-separator>
                  </div>
                  <div class='flex row items-end'>
                    <div class='col'>
                      <q-item-label caption style='margin-bottom: 2px'>自动填充 - 最小值</q-item-label>
                      <q-input square outlined dense type='number' placeholder='最小值，默认为 0' :disable='configLottery.lock' v-model='configLottery.autoMin'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-minus-circle-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class='col q-ml-md'>
                      <q-item-label caption style='margin-bottom: 2px'>自动填充 - 最大值</q-item-label>
                      <q-input square outlined dense type='number' placeholder='最大值，默认为 1' :disable='configLottery.lock' v-model='configLottery.autoMax'>
                        <template v-slot:prepend>
                          <q-icon name='mdi-plus-circle-outline'></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class='col q-ml-md'>
                      <q-btn square :unelevated='!configLottery.lock' :outline='configLottery.lock' class='full-width' style='height: 40px' :color='configLottery.lock ? `grey-5` : `primary`' label='自动填充数据'
                             :disable='configLottery.lock' @click.prevent.stop='autoFillLottery'></q-btn>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script lang='ts' src='./RandomizerPage.ts'/>
<style lang='scss' src='./RandomizerPage.scss'/>
<style scoped lang='scss' src='./RandomizerPage.scoped.scss'/>
