<template>
  <div class="editable-cell">
    <div v-show="!isEdit" class="editable-cell-content" @click="handleEdit">
      {{ getValues }}
      <icon-system-uicons:create edit-icon v-if="!column.editRow" cursor-pointer />
    </div>
    <div class="flex editable-cell-content" v-show="isEdit" v-click-outside="onClickOutside">
      <div class="editable-cell-content-comp">
        <CellComponent
          v-model="currentValueRef"
          v-bind="getComponentProps"
          :component="getComponent"
          :popoverVisible="getRuleVisible"
          :ruleMessage="ruleMessage"
          :rule="getRule"
          :class="getWrapperClass"
          ref="elRef"
          @options-change="handleOptionsChange"
          @pressEnter="handleEnter"
        />
      </div>
      <div ml-10 class="editable-cell-action" v-if="!getRowEditable">
        <icon-system-uicons:check @click="handleSubmit" mr-5 cursor-pointer />
        <icon-system-uicons:cross @click="handleCancel" mx-2 cursor-pointer />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import type { BasicColumn } from '../../types/table';
  import type { EditRecordRow } from './index';
  import { CellComponent } from './CellComponent';
  import { useTableContext } from '../../hooks/useTableContext';
  import clickOutside from './clickOutside';
  import { propTypes } from './propTypes';
  import { isString, isBoolean, isFunction, isNumber, isArray } from '@/utils/is';
  import { createPlaceholderMessage } from './helper';
  import { set, omit } from 'lodash-es';
  import { parseISO, format } from 'date-fns';
  import {
    defineComponent,
    PropType,
    ref,
    computed,
    unref,
    watchEffect,
    nextTick,
    toRaw,
  } from 'vue';

  export default defineComponent({
    name: 'EditableCell',
    components: { CellComponent },
    directives: {
      clickOutside,
    },
    props: {
      value: {
        type: [String, Number, Boolean, Object] as PropType<string | number | boolean | Recordable>,
        default: '',
      },
      record: {
        type: Object as PropType<EditRecordRow>,
      },
      column: {
        type: Object as PropType<BasicColumn>,
        default: () => ({}),
      },
      index: propTypes.number,
    },
    setup(props) {
      const table = useTableContext();
      const isEdit = ref(false);
      const elRef = ref();
      const ruleVisible = ref(false);
      const ruleMessage = ref('');
      const optionsRef = ref<LabelValueOptions>([]);
      const currentValueRef = ref<any>(props.value);
      const defaultValueRef = ref<any>(props.value);

      // const { prefixCls } = useDesign('editable-cell');

      const getComponent = computed(() => props.column?.editComponent || 'ElInput');
      const getRule = computed(() => props.column?.editRule);

      const getRuleVisible = computed(() => {
        return unref(ruleMessage) && unref(ruleVisible);
      });

      const getComponentProps = computed(() => {
        const compProps = props.column?.editComponentProps ?? {};
        return {
          placeholder: createPlaceholderMessage(unref(getComponent)),
          ...omit(compProps, 'onChange'),
        };
      });

      const getValues = computed(() => {
        const { editComponentProps, editValueMap } = props.column;

        const value = unref(currentValueRef);

        if (editValueMap && isFunction(editValueMap)) {
          return editValueMap(value);
        }
        const component = unref(getComponent);
        if (!component.includes('ElSelect')) {
          return value;
        }

        const options: LabelValueOptions = editComponentProps?.options ?? (unref(optionsRef) || []);
        const option = options.find((item) => `${item.value}` === `${value}`);

        return option?.label ?? value;
      });

      const getWrapperClass = computed(() => {
        const { align = 'center' } = props.column;
        return `edit-cell-align-${align}`;
      });

      const getRowEditable = computed(() => {
        const { editable } = props.record || {};
        return !!editable;
      });

      watchEffect(() => {
        defaultValueRef.value = props.value;
      });

      watchEffect(() => {
        const { editable } = props.column;
        if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
          isEdit.value = !!editable || unref(getRowEditable);
        }
      });

      function handleEdit() {
        if (unref(getRowEditable) || unref(props.column?.editRow)) return;
        ruleMessage.value = '';
        isEdit.value = true;
        nextTick(() => {
          const el = unref(elRef);
          el?.focus?.();
        });
      }

      async function handleChange(e: any) {
        const component = unref(getComponent);
        const compProps = props.column?.editComponentProps ?? {};

        if (!e) {
          currentValueRef.value = e;
        } else if (e?.target && Reflect.has(e.target, 'value')) {
          currentValueRef.value = (e as ChangeEvent).target.value;
        } else if (component === 'ElCheckbox') {
          currentValueRef.value = (e as ChangeEvent).target.checked;
        } else if (isString(e) || isBoolean(e) || isNumber(e)) {
          currentValueRef.value = e;
        }

        //TODO 特殊处理 NDatePicker 可能要根据项目 规范自行调整代码
        if (component === 'ElDatePicker') {
          if (isNumber(currentValueRef.value)) {
            if (compProps.valueFormat) {
              currentValueRef.value = format(currentValueRef.value, compProps.valueFormat);
            }
          } else if (isArray(currentValueRef.value)) {
            if (compProps.valueFormat) {
              currentValueRef.value = currentValueRef.value.map((item) => {
                format(item, compProps.valueFormat);
              });
            }
          }
        }
        const onChange = props.column?.editComponentProps?.onChange;
        if (onChange && isFunction(onChange)) onChange(...arguments);

        table.emit?.('edit-change', {
          column: props.column,
          value: unref(currentValueRef),
          record: toRaw(props.record),
        });
        await handleSubmiRule();
      }

      async function handleSubmiRule() {
        const { column, record } = props;
        const { editRule } = column;
        const currentValue = unref(currentValueRef);

        if (editRule) {
          if (isBoolean(editRule) && !currentValue && !isNumber(currentValue)) {
            ruleVisible.value = true;
            const component = unref(getComponent);
            ruleMessage.value = createPlaceholderMessage(component);
            return false;
          }
          if (isFunction(editRule)) {
            const res = await editRule(currentValue, record as Recordable);
            if (res) {
              ruleMessage.value = res;
              ruleVisible.value = true;
              return false;
            } else {
              ruleMessage.value = '';
              return true;
            }
          }
        }
        ruleMessage.value = '';
        return true;
      }

      async function handleSubmit(needEmit = true, valid = true) {
        if (valid) {
          const isPass = await handleSubmiRule();
          if (!isPass) return false;
        }

        const { column, index, record } = props;
        if (!record) return false;
        const { prop } = column;
        const value = unref(currentValueRef);
        if (!prop) return;

        const dataKey = prop as string;

        set(record, dataKey, value);
        //const record = await table.updateTableData(index, dataKey, value);
        needEmit && table.emit?.('edit-end', { record, index, prop, value });
        isEdit.value = false;
      }

      async function handleEnter() {
        if (props.column?.editRow) {
          return;
        }
        await handleSubmit();
      }

      function handleCancel() {
        isEdit.value = false;
        currentValueRef.value = defaultValueRef.value;
        const { column, index, record } = props;
        const { prop } = column;
        ruleVisible.value = true;
        ruleMessage.value = '';
        table.emit?.('edit-cancel', {
          record,
          index,
          key: prop,
          value: unref(currentValueRef),
        });
      }

      function onClickOutside() {
        if (props.column?.editable || unref(getRowEditable)) {
          return;
        }
        const component = unref(getComponent);

        if (component.includes('ElInput')) {
          handleCancel();
        }
      }

      // only ApiSelect
      function handleOptionsChange(options: LabelValueOptions) {
        optionsRef.value = options;
      }

      function initCbs(cbs: 'submitCbs' | 'validCbs' | 'cancelCbs', handle: Fn) {
        if (props.record) {
          /* eslint-disable  */
          isArray(props.record[cbs])
            ? props.record[cbs]?.push(handle)
            : (props.record[cbs] = [handle]);
        }
      }

      if (props.record) {
        initCbs('submitCbs', handleSubmit);
        initCbs('validCbs', handleSubmiRule);
        initCbs('cancelCbs', handleCancel);

        if (props.column.prop) {
          if (!props.record.editValueRefs) props.record.editValueRefs = {};
          props.record.editValueRefs[props.column.prop] = currentValueRef;
        }
        /* eslint-disable  */
        props.record.onCancelEdit = () => {
          isArray(props.record?.cancelCbs) && props.record?.cancelCbs.forEach((fn) => fn());
        };
        /* eslint-disable */
        props.record.onSubmitEdit = async () => {
          if (isArray(props.record?.submitCbs)) {
            const validFns = (props.record?.validCbs || []).map((fn) => fn());

            const res = await Promise.all(validFns);

            const pass = res.every((item) => !!item);

            if (!pass) return;
            const submitFns = props.record?.submitCbs || [];
            submitFns.forEach((fn) => fn(false, false));
            table.emit?.('edit-row-end');
            return true;
          }
        };
      }

      return {
        isEdit,
        handleEdit,
        currentValueRef,
        handleSubmit,
        handleChange,
        handleCancel,
        elRef,
        getComponent,
        getRule,
        onClickOutside,
        ruleMessage,
        getRuleVisible,
        getComponentProps,
        handleOptionsChange,
        getWrapperClass,
        getRowEditable,
        getValues,
        handleEnter,
        // getSize,
      };
    },
  });
</script>

<style lang="scss">
  .editable-cell {
    &-content {
      position: relative;
      overflow-wrap: break-word;
      word-break: break-word;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &-comp {
        flex: 1;
      }

      .edit-icon {
        font-size: 14px;
        //position: absolute;
        //top: 4px;
        //right: 0;
        display: none;
        width: 20px;
        cursor: pointer;
      }

      &:hover {
        .edit-icon {
          display: inline-block;
        }
      }
    }

    &-action {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
