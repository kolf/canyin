<template>
    <div class="checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'CheckboxGroup',
        props: {
            value: Array
        },
        data() {
            return {
                checkedList: [],
                isCheckboxGroup: true
            }
        },
        watch: {
            value() {
                this.initChecked()
            }
        },
        methods: {
            updateValue() {
                this.checkedList = []
                this.$children.forEach((child) => {
                    child.newValue && this.checkedList.push(child.customValue)
                })
                this.$emit('input', this.checkedList)
                this.$emit('change', this.checkedList)
            },
            initChecked() {
                this.$children.forEach((child) => {
                    if (this.value && this.value.indexOf(child.customValue) >= 0) {
                        child.newValue = true
                    } else {
                        child.newValue = false
                    }
                })
            }
        },
        mounted() {
            this.initChecked()
        }
    }
</script>