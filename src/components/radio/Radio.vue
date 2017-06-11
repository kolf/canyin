<template>
    <div class="qt-item">
        <label class="radio"
            :class="{ 'is-disabled': disabled }"
            ref="label"
            :disabled="disabled"
            :tabindex="disabled ? false : 0"
            @keydown.prevent.enter.space="$parent.updateValue(value)">
            <input
                type="radio"
                :disabled="disabled"
                :checked="isChecked"
                :name="name"
                :value="value"
                @change="changed">
            <span class="check" :style="{backgroundImage: image ? 'url(http://canyin.eqiying.com/webpage/Questionnairpage'+image+')' : ''}"></span>
            <span class="control-label"><slot></slot></span>
        </label>
        <input v-model="openVal" class="input" v-if="isOpen" type="text">
    </div>
</template>

<script>
    export default {
        name: 'Radio',
        props: {
            value: [String, Number, Boolean, Object],
            disabled: Boolean,
            name: String,
            image: String,
            isOpen: Boolean
        },
        data() {
            return {
                isChecked: false,
                openVal: ''
            }
        },
        methods: {
            /**
             * Input change listener.
             * Call updateValue from parent.
             */
            changed(event) {
                this.$parent.updateValue(this.value, event)
            }
        },
        created() {
            if (!this.$parent.$data._isRadioGroup) {
                this.$destroy()
                throw new Error('You should wrap bRadio on a bRadioGroup')
            }
        },
        watch: {
            openVal(val){
                if(!this.isChecked){
                    this.isChecked = true
                    this.$parent.updateValue(this.value)
                }
                this.$emit('changeOpen', val, this.value)
            }
        }
    }
</script>
<style lang="scss">
input[type=text]{
  border: 1px solid #ccc;
  padding: 6px;
  outline: none;
}
</style>
