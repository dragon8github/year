import Vue from 'vue';
var myloader = require('./loader.vue');
const Indicator = Vue.extend(require('./loader.vue'));
let instance;
let idlader_arr = []

export default {
  show(options = {}, id = '') {
    // 我自己添加的模式，如果存在id，那么也需要id才可以关闭
    if (id) {
        // 新建一个属于自己的Loader
        let myinstance;

        // 从缓存中遍历看看有没有和id一样的Loader
        for (let [index,ele] of idlader_arr.entries()) {
            if (Object.keys(ele)[0] + '' == id) {
                myinstance = Object.values(ele)[0]
                break;
            }
        }

        // 如果缓存没有则新建一个
        myinstance = myinstance || new Indicator({ el: document.createElement('div') });

        // 加入到缓存中
        idlader_arr.push( { [id]: myinstance})

        // 设置文本
        myinstance.text = typeof options === 'string' ? options : options.text || '';
        
        // 设置形状，默认为snake（其实已经写死为snake了）
        myinstance.spinnerType = options.spinnerType || 'snake';

        // 插入body中
        document.body.appendChild(myinstance.$el);

        // 等待加载完成就显示出来
        Vue.nextTick(() => {
            myinstance.visible = true;
        });

    } else {
    // 单例模式
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      });
    }
      // 如果已经在显示中，那么返回
      if (instance.visible) return;

      // 设置文本
      instance.text = typeof options === 'string' ? options : options.text || '';
      
      // 设置形状，默认为snake（其实已经写死为snake了）
      instance.spinnerType = options.spinnerType || 'snake';

      // 插入body中
      document.body.appendChild(instance.$el);

      // 等待加载完成就显示出来
      Vue.nextTick(() => {
          instance.visible = true;
      });
    }
  },
  // 隐藏
  hide (id = '') {
    // 自己添加的逻辑
    if (id && idlader_arr.length) {
      // 新建一个属于自己的Loader
      let myinstance

      // 从缓存中遍历看看有没有和id一样的Loader
      for (let [index,ele] of idlader_arr.entries()) {
          if (Object.keys(ele)[0] + '' == id) {
              myinstance = Object.values(ele)[0]
              break;
          }
      }
      // 如果缓存列表中存在该id，则隐藏指定的Loader
      if (myinstance) myinstance.visible = false

    // 官方本来的逻辑
    } else {
      if (instance) {
        instance.visible = false;
      }
    }
  },
  hideAll() {
    if (instance) {
      instance.visible = false;
    }

    for (let [index,ele] of idlader_arr.entries()) {
        Object.values(ele)[0].visible = false
    }
  }
};
