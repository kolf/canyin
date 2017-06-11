<template>
  <div class="">
    <div class="qt">
      <div class="app-header">{{n+1}}/{{qts.length}}</div>
      <div class="app-body" v-if="qt">
        <div class="qt-title pad">
          {{qt.QuestionInfo.QuestionName}}
        </div>
        <div class="qt-box pad">
          <checkbox-group v-if="qt.QuestionInfo.QuestionType==2" :class="qt.QuestionInfo.Remark ? 'is-'+qt.QuestionInfo.Remark : ''">
            <checkbox :custom-value="qt.OptionId" v-for="qt in qt.OptionList">{{qt.OptionName}}</checkbox>
          </checkbox-group>
          <radio-group v-model="val" v-if="qt.QuestionInfo.QuestionType==1" :class="qt.QuestionInfo.Remark ? 'is-'+qt.QuestionInfo.Remark : ''">
            <radio @changeOpen="changeOpen" :is-open="option.IsOpen==1" v-for="option in qt.OptionList" :value="{IsOpen: option.IsOpen, AnswerValue: option.OptionCode, OptionId: option.OptionId, OpenTextValue: '', QuestionId: qt.QuestionInfo.QuestionId}" :image="option.OptionPicUrl">{{option.OptionName}}
              <!--<input v-modal="openVal" class="input" v-if="option.IsOpen==1" type="text">-->
            </radio>
          </radio-group>
          <textarea placeholder="请输入" v-model="val" v-if="qt.QuestionInfo.QuestionType==3"></textarea>
        </div>
      </div>
      <div class="pad" v-if="n<qts.length">
        <button class="btn-lg" :disabled="!val" @click="next" v-text="n==qts.length-1?'提交':'下一题'"></button>
        <!--{{result}}-->
      </div>
    </div>

    <div class="start-page full-height" v-if="!start">
      <button class="btn-lg btn-default start-btn" @click="start=true" :disabled="this.qts==0">开始</button>
    </div>

    <div class="end-page full-height" v-if="end">
      <img src="http://canyin.eqiying.com/webpage/Questionnairpage/questioninnairimages/tp_10.png" alt="">
      <p>您已完成问卷，感谢您的配合与支持。</p>
      <p>祝您用餐愉快！</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { Checkbox, CheckboxGroup } from '@/components/checkbox';
import { Radio, RadioGroup } from '@/components/radio';
import getNowFormatDate from '@/utils/getTime';
const { ROOT } = process.env;

export default {
  name: 'qt',
  components: {
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup
  },
  data() {
    return {
      qtsInfo: {},
      qts: [],
      n: 0,
      val: '',
      result: [],
      start: false,
      end: false
    };
  },
  computed: {
    qt() {
      return this.qts.length ? this.qts[this.n] : { QuestionInfo: {}, OptionList: [] }
    }
  },
  created() {
    const {id} = this.$route.query;
    this.query(id);
  },
  watch: {
    val(value){
      let val = {}
      if(typeof value == 'string'){
        val.OpenTextValue = value
      }else{
        val = value
      }
      // val.QuestionId = this.qt.QuestionInfo.QuestionId

      this.result[this.n] = val
    }
  },
  methods: {
    query(id) {
      axios.get(ROOT + '/controller/questioninfocontrol.ashx?questionnairId='+id+'&action=queryquestioninfobyid').then((res) => {
        const { data, msg, result } = res.data;
        if (result === 'success') {
          const {RestaurantId} = this.$route.query;
          this.qts = data.QuestionInfos
          this.qtsInfo = data.QuesitonnairInfo
          this.qtsInfo.RestaurantId = RestaurantId || 2
        }
      })
    },
    next() {
      if(this.n==this.qts.length-1){
        this.submit()
      }else{
        this.n++
        this.val = ''
        this.openVal = ''
      }
    },
    submit(){
      console.log(this.qtsInfo)
      const {QuestionnairId, RestaurantId} = this.qtsInfo
      const userdata = this.result.map((item) => {
        return {
          QuestionId: item.QuestionId,
          RestaurantId,
          QuestionnairId,
          AnswerStatus: 1,
          AnswerType: 1,
          AnswerValue: item.AnswerValue || '',
          OptionId: item.OptionId || '',
          OpenTextValue: item.OpenTextValue || '',
          CreatedTime: getNowFormatDate()
        }
      });

      axios.post(ROOT + '/controller/Answer.ashx', qs.stringify({
        action: 'DataCollection',
        userdata: JSON.stringify(userdata)
      })).then((res) => {
        const { data, msg, result } = res.data;
        if (result === 'success') {
           this.end = true
        }else{
          alert(msg)
        }
      })
    },
    changeOpen(openVal, val){
      val.OpenTextValue = openVal
      this.result[this.n] = val
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-header {
  height: 52px;
  background: #ededed;
  overflow: hidden;
  text-align: center;
  line-height: 52px;
  font-size: 18px;
}
.qt{
  &-title{
    padding-bottom:0 !important
  }
  &-item{
    padding: 5px 0;
  }
}

textarea{
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  outline: none;
  height: 120px;
  border-radius: 4px;
  font-size: 14px;
  color: #666
}

.start{
  &-page{
    padding-top: 130%;
    background:#fa4d60 url(http://canyin.eqiying.com/webpage/Questionnairpage/questioninnairimages/tp_11.png) 50% 0 no-repeat;
    background-size: auto 100%;
  }

  &-btn{
    top: 76%;
    width: 80%;
    left: 10%;
    position: absolute;
  }
}

.end{
  &-page{
    background-color: #fff;
    text-align: center;
    img{
      width: 50%;
      display: inline-block;
      margin: 10% 0
    }
  }
}
</style>
