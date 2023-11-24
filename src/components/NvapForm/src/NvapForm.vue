<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 10:32:01
 * @LastEditTime: 2023-11-24 17:07:54
 * @Description: 表单组件
-->
<template>
  <div class="operation">
    <template v-for="(oper, index) in getProps?.operation" :key="index">
      <template v-if="oper.location == 'prefix'">
        <el-button
          :disabled="oper.disabled"
          ml-5
          v-if="getProps.showSubmitButton"
          :type="oper.type ? oper.type : 'primary'"
          @click="oper.method"
        >
          <el-icon v-if="oper.icon!" :class="{ 'is-loading': oper.loading }" mr-1>
            <component :is="oper.icon!" />
          </el-icon>
          {{ oper.label }}
        </el-button>
      </template>
    </template>
    <template v-for="(oper, index) in getProps?.operation" :key="index">
      <template v-if="oper.location == 'suffix'">
        <el-button
          v-auth="oper.auth"
          :disabled="oper.disabled"
          ml-5
          v-if="getProps.showSubmitButton"
          :type="oper.type ? oper.type : 'primary'"
          @click="oper.method"
        >
          <el-icon v-if="oper.icon!" :class="{ 'is-loading': oper.loading }" mr-1>
            <component :is="oper.icon!" />
          </el-icon>
          {{ oper.label }}
        </el-button>
      </template>
    </template>
  </div>
  <el-form
    class="form"
    style="height: auto"
    v-bind="getBindValue"
    :model="formModel"
    ref="formElRef"
  >
    <el-row>
      <el-col
        v-show="colShows && index <= colShows"
        :span="schema.span"
        v-for="(schema, index) in getSchema"
        :key="schema.prop"
        p-1
        pb-5
      >
        <el-form-item v-bind="schema" v-if="!schema.itemShow">
          <!--标签名右侧温馨提示-->
          <template #label v-if="schema.labelMessage">
            {{ schema.label }}
            <el-tooltip >
              <icon-system-uicons:circle-menu />
              <template #content>
                <span>{{ schema.labelMessage }} </span>
              </template>
            </el-tooltip>
          </template>
          <template #label v-else-if="!getBindValue.labelPosition">
            <div
              w-full
              flex
              :class="schema.labelPosition == 'left' ? 'flex-row' : 'flex-row-reverse'"
            >
              {{ schema.label }}
            </div>
          </template>
          <!--判断插槽-->
          <template v-if="schema.slot">
            <slot
              :disabled="schema.disabled ? schema.disabled : false"
              :name="schema.slot"
              :model="formModel"
              :prop="schema.prop"
              :value="formModel[schema.prop]"
            ></slot>
          </template>
          <!--多选框Checkbox-->
          <template v-else-if="schema.component === 'ElCheckbox'">
            <el-checkbox-group
              v-model="formModel[schema.prop]"
              :disabled="schema.disabled"
              v-bind="schema.componentProps"
            >
              <el-checkbox
                v-for="item in schema.componentProps.options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-checkbox-group>
          </template>
          <!--单选框Radio-->
          <template v-else-if="schema.component === 'ElRadio'">
            <el-radio-group
              v-model="formModel[schema.prop]"
              :disabled="schema.disabled"
              v-bind="schema.componentProps"
            >
              <el-radio
                v-for="item in schema.componentProps.options"
                :key="item.value"
                :label="item[schema.componentProps.value]"
              >
                {{ item[schema.componentProps.label] }}
              </el-radio>
            </el-radio-group>
          </template>
          <!--下拉框Select-->
          <template v-else-if="schema.component === 'ElSelect'">
            <el-select
              :disabled="schema.disabled ? schema.disabled : false"
              :value-key="schema.componentProps.valueKey || 'id'"
              @change="schema.componentProps.onChange"
              :placeholder="
                getProps?.notPlaceholder
                  ? ''
                  : schema.componentProps.placeholder ||
                    `请选择${String(schema.label || '').replace(/[:：]/g, '')}`
              "
              v-bind="schema.componentProps"
              v-model="formModel[schema.prop]"
              filterable
              clearable
              w-full
            >
              <el-option
                v-for="(item, index) in schema.componentProps.options"
                v-bind="schema.componentProps"
                :key="index"
                :label="item[schema.componentProps.label] || item.label"
                :value="
                  schema.componentProps.returnItem
                    ? item
                    : item[schema.componentProps.value] || item.value
                "
                :disabled="item.disabled"
              />
            </el-select>
          </template>
          <template v-else-if="schema.component === 'ElCascader'">
            <el-cascader
              w-full
              v-model="formModel[schema.prop]"
              :options="schema.componentProps.options"
              :props="schema.componentProps.props"
              :size="schema.componentProps.size"
              :placeholder="
                getProps?.notPlaceholder
                  ? ''
                  : schema.componentProps.placeholder ||
                    `请选择${String(schema.label || '').replace(/[:：]/g, '')}`
              "
              :filterable="schema.componentProps.filterable"
              :disabled="schema.disabled"
              v-bind="schema.componentProps"
              @change="schema.componentProps.onChange"
              clearable
            />
          </template>
          <!--时间-->
          <template v-else-if="schema.component === 'ElDatePicker'">
            <el-date-picker
              v-model="formModel[schema.prop]"
              :type="schema.componentProps.type"
              :placeholder="
                getProps?.notPlaceholder
                  ? ''
                  : schema.componentProps.placeholder ||
                    `请选择${String(schema.label || '').replace(/[:：]/g, '')}`
              "
              :format="schema.componentProps.format"
              :picker-options="schema.componentProps.pickerOptions"
              :value-format="schema.componentProps.valueFormat"
              :disabled="schema.disabled"
              v-bind="schema.componentProps"
            />
          </template>
          <CellComponent
            v-else
            v-bind="getComponentProps(schema)"
            :is="schema.component"
            v-model="formModel[schema.prop]"
          />
        </el-form-item>
      </el-col>
      <el-col :span="getProps.buttonSpan" flex p-1 pb-5 class="buttonLayout" items-center>
        <el-button
          ml-5
          v-if="getProps.showSubmitButton"
          :type="getProps.submitButtonType"
          @click="handleSubmit"
        >
          <TheIcon
            :icon="getProps.submitIcon"
            :size="20"
            style="margin-right: 6px"
            v-show="getProps.submitIcon"
          />
          {{ getProps.submitButtonText }}
        </el-button>
        <el-button
          v-if="getProps.showResetButton"
          :type="getProps.resetButtonType"
          @click="resetFields"
        >
          <TheIcon
            :icon="getProps.resetIcon"
            :size="20"
            style="margin-right: 6px"
            v-show="getProps.resetIcon"
          />
          {{ getProps.resetButtonText }}
        </el-button>
        <div ml-5>
          <el-text
            type="primary"
            style="cursor: pointer"
            @click="handleSetcolshows"
            v-if="!coltags"
          >
            {{ coltext }}
            <icon-ep:arrow-up v-show="colState" />
            <icon-ep:arrow-down v-show="!colState" />
          </el-text>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
  import { createPlaceholderMessage } from './helper';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useFormValues } from './hooks/useFormValues';
  import { CellComponent } from './CellComponent';
  import { nvapProps } from './props';
  // import Select from './components/select/index';
  import type { Ref } from 'vue';
  import type { FormSchema, FormProps, FormActionType } from './types/form';
  export default defineComponent({
    name: 'NvapForm',
    components: {
      CellComponent,
    },
    props: { ...nvapProps },
    emits: ['reset', 'submit', 'register'],
    setup(props, { emit, attrs }) {
      const defaultFormModel = ref<Recordable>({});
      const formModel = reactive<Recordable>({});
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref<Nullable<FormSchema[]>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const loadingSub = ref(false);
      const isUpdateDefaultRef = ref(false);
      async function handleToFatech(type) {
        await nextTick();
        if (type) {
          const data: any = await queryDictRe(type);
          return data;
        } else {
          return [];
        }
      }
      function getComponentProps(schema) {
        const compProps = schema.componentProps ?? {};
        const component = schema.component;
        return {
          ...schema,
          clearable: true,
          placeholder: getProps.value?.notPlaceholder
            ? ''
            : createPlaceholderMessage(unref(component)) +
              String(schema.label || '').replace(/[:：]/g, ''),
          ...compProps,
        };
      }
      const getProps = computed((): FormProps => {
        //@ts-expect-error
        const formProps = { ...props, ...unref(propsRef) } as FormProps;
        const rulesObj: any = {
          rules: {},
        };
        const schemas: any = formProps.schemas || [];
        schemas.forEach(async ({ rules, prop }) => {
          if (rules && isArray(rules)) {
            rulesObj.rules[prop] = rules;
          }
        });
        return { ...formProps, ...unref(rulesObj) };
      });

      const getBindValue = computed(
        () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable)
      );

      const buttonLayout = computed(() => {
        const { buttonLayout } = unref(getProps);
        return buttonLayout;
      });

      const colState = ref(false); //展开状态
      const coltags = ref(false); //是否显示展开
      //搜索条件显示个数
      const colShows = computed(() => {
        const { colShows } = unref(getProps);
        if (colShows === null) {
          coltags.value = true;
          return getSchema.value.length;
        } else if (colState.value) {
          return getSchema.value.length;
        } else {
          //@ts-ignore
          return colShows - 1;
        }
      });
      const coltext = ref('展开');
      const handleSetcolshows = () => {
        colState.value = !colState.value;
        if (colState.value) {
          coltext.value = '收起';
        } else {
          coltext.value = '展开';
        }
      };
      const handleLabel = (val) => {
        if (val && val.indexOf(':') == -1 && val.indexOf('：') == -1) {
          return val + ':';
        }
        return val;
      };
      const getSchema = computed((): FormSchema[] => {
        const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
        for (const schema of schemas) {
          const { defaultValue } = schema;
          if (defaultValue) {
            schema.defaultValue = defaultValue;
          }
        }
        return schemas as FormSchema[];
      });
      watch(
        () => getSchema.value,
        async (res) => {
          for (let index = 0; index < res.length; index++) {
            const { component, type, componentProps } = res[index];
            if (component === 'ElSelect' || component === 'ElRadio') {
              if (type && componentProps.options.length <= 0) {
                componentProps.options = await handleToFatech(type);
              }
            }
            if (componentProps && componentProps.hasOwnProperty('optionsFunc')) {
              const data = await componentProps.optionsFunc();
              componentProps.options = data;
            }
            res[index].label = handleLabel(res[index].label);
          }
        },
        {
          flush: 'post',
        }
      );
      const { handleFormValues, initDefault } = useFormValues({
        defaultFormModel,
        getSchema,
        formModel,
      });
      const {
        handleSubmit,
        validate,
        resetFields,
        getFieldsValue,
        clearValidate,
        setFieldsValue,
        setSchemas,
        updateProps,
      } = useFormEvents({
        emit,
        getProps,
        formModel,
        getSchema,
        formElRef: formElRef as Ref<FormActionType>,
        defaultFormModel,
        loadingSub,
        handleFormValues,
      });

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }
      // async function updateProps(callback: any) {
      // 	callback(toRaw(unref(getProps)));
      // }
      const formActionType: Partial<FormActionType> = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        validate,
        updateProps,
        clearValidate,
        setProps,
        submit: handleSubmit,
        setSchemas,
      };
      watch(
        () => getSchema.value,
        (schema) => {
          if (unref(isUpdateDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initDefault();
            isUpdateDefaultRef.value = true;
          }
        }
      );

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      return {
        formElRef,
        formModel,
        getProps,
        buttonLayout,
        getBindValue,
        getSchema,
        handleSubmit,
        resetFields,
        loadingSub,
        getComponentProps,
        colShows,
        handleSetcolshows,
        coltags,
        coltext,
        colState,
        handleToFatech,
      };
    },
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label) {
    pointer-events: none;
  }
  :deep(.el-cascader__tags .el-tag) {
    height: 20px !important;
  }
  .buttonLayout {
    display: flex;
    justify-content: v-bind(buttonLayout);
  }

  :deep(.el-cascader) {
    width: 100%;
  }

  .operation {
    align-self: flex-end;
    margin-bottom: 15px;
  }
</style>
