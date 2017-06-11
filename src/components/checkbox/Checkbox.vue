<template>
    <div class="qt-item">
        <label class="checkbox"
            :class="{ 'is-disabled': disabled }"
            ref="label"
            :disabled="disabled"
            :tabindex="disabled ? false : 0"
            @keydown.prevent.enter.space="newValue = !newValue">
            <input
                type="checkbox"
                :disabled="disabled"
                :name="name"
                v-model="newValue"
                @change="$emit('change', newValue, $event)">
            <span class="check"></span>
            <span class="control-label"><slot></slot></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'Checkbox',
        props: {
            value: Boolean,
            disabled: Boolean,
            name: String,
            checked: Boolean,
            nosync: Boolean,
            customValue: [String, Number, Boolean, Object]
        },
        data() {
            return {
                newValue: this.value || this.checked
            }
        },
        watch: {
            value(value) {
                this.newValue = value
            },
            newValue(value) {
                if (this.nosync) {
                    this.newValue = this.value
                    return
                }
                this.$emit('input', value)
                this.$parent.isCheckboxGroup && this.$parent.updateValue()
            }
        }
    }
</script>