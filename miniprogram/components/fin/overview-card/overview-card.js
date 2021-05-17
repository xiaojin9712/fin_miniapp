// components/fin/overview-card/overview-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      default: '卡片名字'
    },
    amount: {
      type: Number,
      default: 2300.00
    },
    isActive: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number,
      default: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
