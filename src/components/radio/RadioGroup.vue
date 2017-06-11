<template>
    <div class="radio-group" :class="{ 'field has-addons': $data._isRadioButtonGroup }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'RadioGroup',
        props: {
            value: [String, Number, Boolean, Object],
            buttonSize: String
        },
        data() {
            return {
                _isRadioGroup: true, // Used internally by Radio and RadioButton
                _isRadioButtonGroup: false // Used internally by RadioButton
            }
        },
        watch: {
            /**
             * Set checked state on the correct children Radio
             * or RadioButton when v-model change.
             */
            value() {
                this.initChecked()
            }
        },
        methods: {
            /**
             * This is called from a child Radio or RadioButton.
             * Emit input event to update the user v-model.
             */
            updateValue(value, event) {
                console.log(event)
                this.$emit('change', value, event)
                this.$emit('input', value)
            },
            /**
             * Set checked state on the correct children Radio or RadioButton based on v-model.
             */
            initChecked() {
                this.$children.forEach((child) => {
                    child.size = this.buttonSize
                    this.$data._isRadioButtonGroup = child.$data._isRadioButton
                    child.isChecked = this.value === child.value
                })
            }
        },
        mounted() {
            this.initChecked()
        }
    }
</script>

<style lang="scss">
$primary: #fa4d60;

.radio-group{
    &.is-score{
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        .qt-item{
            display: inline-block;
            width: 33%;
            text-align: center;
            .check{
                width:72px;
                height: 72px;
                background-color: #FAFAFA;
                box-shadow: 0px 4px 8px #d5caca;
                border: none;
                 &:before{
                    display: none
                }
            }
            .control-label{
                padding-left: 0;
                position: absolute;
                left: 0;
                top: 28px;
                width: 100%;
                font-size: 16px;
                font-weight: 700
            }
            .radio input[type=radio]:checked+.check {
                color:#fff;
                box-shadow: 0px 4px 8px #d5caca;
                background-color: $primary
            }
            .radio input[type=radio]:checked+.check+.control-label {
                color:#fff;
            }
        }
    }
    &.is-image, &.is-sex{
        .qt-item{
            display: inline-block;
            width: 33%;
            height: 140px;
            text-align: center;
            position: relative;
            .check{
                width:100px;
                height: 100px;
                border-radius: 0;
                // background-color: #FAFAFA;
                background-size: auto 100%;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                // box-shadow: 0px 4px 8px #d5caca;
                border: none;
                 &:before{
                    display: none
                }
            }
            .control-label{
                padding-left: 0;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                // width: 72px;
                color: $primary;
                border: 1px solid $primary;
                border-radius: 3px;
                padding: 0 8px;
                line-height: 18px;
                height: 20px;
                overflow: hidden;
                top:110px;
                font-size: 12px;
                // font-size: 16px;
                // font-weight: 700
            }
            .radio input[type=radio]:checked+.check {
                // color:#fff;
                box-shadow: none;
                // background-color: $primary
            }
            .radio input[type=radio]:checked+.check+.control-label {
                color:#fff;
                background-color: $primary
            }
        }
    }
    &.is-sex{
        .qt-item{
            width: 50%
        }
    }
    &.is-image{
        
    }
}


.radio {
    outline: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
}

.radio+.radio {
    margin-left: .5em
}

.radio input[type=radio] {
    display: none
}

.radio input[type=radio]+.check {
    position: relative;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid #7a7a7a;
    background: none;
    // transition: all 86ms ease-out;
    border-radius: 50%
}

.radio input[type=radio]+.check:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    left: -2px;
    top: -2px;
    width: inherit;
    height: inherit;
    background: $primary;
    -webkit-transform: scale(0);
    transform: scale(0);
    // transition: transform 86ms ease-out;
}

.radio input[type=radio]:checked+.check {
    border-color: $primary
}

.radio input[type=radio]:checked+.check:before {
    -webkit-transform: scale(.5);
    transform: scale(.5)
}

.radio .control-label {
    padding-left: .5em
}

.radio[disabled] {
    opacity: .5
}

.radio:hover input[type=radio]+.check {
    border-color: $primary
}

.radio:focus input[type=radio]+.check {
    box-shadow: 0px 4px 8px #d5caca;
}

.radio:focus input[type=radio]:checked+.check {
    box-shadow: 0px 4px 8px #d5caca;
}
</style>
