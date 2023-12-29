<script setup>
import { reactive, computed } from 'vue'
import InfoPopup from '@/components/InfoPopup.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  toggles: {
    type: Object,
    required: true
  },
  disable: {
    type: Object,
    required: false
  },
  withInput: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const valueProp = !props.withInput ? 'value' : 'label'

const selectedToggles = computed({
  get() {
    return !props.withInput
      ? [...props.modelValue]
      : props.modelValue.map((item) => Object.keys(item)[0])
  },
  set(value) {
    // On select
    if (selectedTogglesPrev.value.length < value.length) {
      const selectedToggles = props.toggles.filter((toggle) => value.includes(toggle.value))
      for (const toggle of selectedToggles) {
        if (toggle.parents) {
          // If none of the parents is selected, let's select automatically the first one
          if (!value.some((selected) => toggle.parents.includes(selected))) {
            value.splice(value.length - 1, 0, toggle.parents[0])
          }
        }
      }
    } else {
      const unselectedToggles = props.toggles.filter((toggle) => !value.includes(toggle.value))
      for (const toggle of unselectedToggles) {
        if (toggle.subs) {
          // If any of the subs is selected and none of its parents is selected, we need to unselect it
          for (const sub of toggle.subs) {
            const index = value.indexOf(sub)
            if (index > -1) {
              const subToggle = props.toggles.find((toggle) => sub === toggle.value)
              if (
                subToggle.parents &&
                !value.some((selected) => subToggle.parents.includes(selected))
              ) {
                value.splice(index, 1)
              }
            }
          }
        }
      }
    }
    emit('update:modelValue', !props.withInput ? value : getTogglesWithInputValues(value))
  }
})

const selectedTogglesPrev = computed(() => selectedToggles.value)

const disabledToggles = computed(() => {
  const arr = props.disable ? [...props.disable] : []
  if (selectedToggles.value.length > 0) {
    // Disable the intersected disallowed for all selected
    arr.push(
      ...props.toggles
        .filter((toggle) => {
          let disallow = false
          selectedToggles.value.some((selected) => {
            const selectedToggle = props.toggles.find((item) => item[valueProp] === selected)
            if (selectedToggle.disallow && selectedToggle.disallow.includes(toggle.value)) {
              disallow = true
            }
            return disallow
          })
          return disallow
        })
        .map((toggle) => toggle.value)
    )
  }
  return arr
})

function toggleIsSelected(toggle) {
  return selectedToggles.value.includes(toggle[valueProp])
}

function toggleIsDisabled(toggle) {
  return toggle.disable || disabledToggles.value.includes(toggle[valueProp])
}

function toggleIsCombineHint(toggle) {
  let combineHint = false
  selectedToggles.value.some((selected) => {
    const selectedToggle = props.toggles.find((item) => item[valueProp] === selected)
    if (selectedToggle.combineHint && selectedToggle.combineHint.includes(toggle.value)) {
      combineHint = true
    }
    return combineHint
  })
  return combineHint
}

const toggleInputValues = reactive({})
if (props.withInput) {
  for (const toggle of props.toggles) {
    if (toggleIsSelected(toggle)) {
      const item = props.modelValue.find((item) => Object.keys(item)[0] === toggle.label)
      const key = Object.keys(item)[0]
      toggleInputValues[toggle.label] = item[key]
    } else {
      toggleInputValues[toggle.label] = toggle.value
    }
  }
}

function getTogglesWithInputValues(selectedToggles) {
  return props.toggles
    .filter((toggle) => selectedToggles.includes(toggle.label))
    .map((toggle) => {
      const object = {}
      object[toggle.label] = toggleInputValues[toggle.label]
      return object
    })
}

function toggleInputOnChange() {
  emit('update:modelValue', getTogglesWithInputValues(selectedToggles.value))
}

function resetToggleInput(toggle) {
  const index = selectedToggles.value.indexOf(toggle.label)
  if (index > -1) {
    selectedToggles.value.splice(index, 1)
  }
  toggleInputValues[toggle.label] = toggle.value
  toggleInputOnChange()
}
</script>

<template>
  <div
    v-for="toggle in toggles"
    class="toggle rounded-borders relative-position"
    :class="{
      'toggle--disabled': toggleIsDisabled(toggle),
      'toggle--selected bg-primary text-white': toggleIsSelected(toggle),
      'toggle--combine-hint': toggleIsCombineHint(toggle)
    }"
    :key="toggle.value"
  >
    <div class="row items-center">
      <div class="col">
        <q-checkbox
          v-if="!withInput"
          v-model="selectedToggles"
          :disable="toggleIsDisabled(toggle)"
          :val="toggle.value"
          :label="toggle.label"
          :title="
            toggleIsDisabled(toggle)
              ? toggle.disableMessage || 'Cannot be combined with the currently selected'
              : toggleIsCombineHint(toggle)
              ? 'Combining this with the currently selected might be what you are after'
              : ''
          "
        />
        <div v-else class="row q-gutter-x-sm items-center">
          <div class="col" style="overflow: hidden">
            <q-checkbox
              v-model="selectedToggles"
              :disable="toggleIsDisabled(toggle)"
              :val="toggle.label"
              :label="toggle.label"
              :title="
                toggleIsDisabled(toggle)
                  ? toggle.disableMessage || 'Not applicable to the currently selected'
                  : ''
              "
            />
          </div>
          <div class="col row q-gutter-x-sm items-center">
            <div class="col">
              <q-select
                v-if="toggle.lookup || toggle.type === 'boolean'"
                outlined
                dense
                options-dense
                :disable="toggle.disable || !toggleIsSelected(toggle)"
                v-model="toggleInputValues[toggle.label]"
                bg-color="white"
                input-class="toggle-input"
                :options="
                  toggle.lookup || [
                    { label: 'true', value: true },
                    { label: 'false', value: false }
                  ]
                "
                emit-value
                @update:model-value="toggleInputOnChange"
              />
              <q-input
                v-else
                outlined
                dense
                :disable="toggle.disable || !toggleIsSelected(toggle)"
                v-model="toggleInputValues[toggle.label]"
                bg-color="white"
                input-class="toggle-input"
                :type="toggle.type"
                @update:model-value="toggleInputOnChange"
              />
            </div>
            <div class="col col-auto">
              <div v-if="toggleInputValues[toggle.label] !== toggle.value" style="width: 40px">
                <q-btn
                  :disable="toggle.disable || !toggleIsSelected(toggle)"
                  @click="resetToggleInput(toggle)"
                  flat
                  dense
                  round
                  icon="close"
                  size="sm"
                  title="Reset to default"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-auto q-ml-xs">
        <InfoPopup :info="toggle.description" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle + .toggle {
  margin-top: 1px;
}
.q-checkbox {
  display: flex;
}
.toggle :deep(.q-checkbox__label) {
  overflow: hidden;
  word-wrap: break-word;
}
.toggle :deep(.q-field__control),
.toggle :deep(.q-field__native),
.toggle :deep(.q-field__append) {
  height: 34px;
  min-height: 34px;
}
.toggle--selected :deep(.q-checkbox__bg) {
  border-color: white;
}
.toggle--combine-hint {
  background: rgba(0, 193, 0, 0.15);
}
.toggle--disabled {
  background: rgba(193, 0, 21, 0.15);
}
</style>
