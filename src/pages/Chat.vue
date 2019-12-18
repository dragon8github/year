<template>
    <div class="Chat">
        <main class='Chat__main'>
          <div class='Chat__items'>
            <div class='Chat__item' v-for='(item, index) in items' :key='index'>
              <div class="Chat__item--avatar"><img :src="item.avatar"></div>
              <div class="Chat__item--content">
                <div class='Chat__item--name'>{{ item.name }}</div>
                <div class='Chat__item--text'>{{ item.text }}</div>
              </div>
            </div>
          </div>
        </main>
        <footer class='Chat__footer'>
          <el-input class='Chat__footer--input' v-model='text' placeholder="发送祝福，竞猜大奖~(｡･ω･｡)~" clearable></el-input>
        </footer>
    </div>
</template>

<script>

// 示例微信头像
const avatar = require('@/assets/wx.jpg')

export default {
  name: 'Chat',
  data () {
    return {
        text: '',
        items: [
          { avatar: avatar, name: '李钊鸿', text: '祝福公司繁荣昌盛' },
          { avatar: avatar, name: '李钊鸿', text: '祝愿公司越来越好，生意兴隆' },
          { avatar: avatar, name: '李钊鸿', text: '公司明年必定会进入一个更加辉' },
          { avatar: avatar, name: '李钊鸿', text: '煌的时代' },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身' },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖' },
        ],
    }
  },
  methods: {
      go () {
          console.log('go');
      }
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  beforeMount () {
      
  }
}
</script>

<style lang="scss" scoped>
.Chat {
  width: 100%;
  height: 100%;
  background: url('~@/assets/bg.png') center center / rem(101) rem(302)  repeat content-box;
}

.Chat__footer {
  @include flex(c, c);
  position: fixed;
  bottom: 0;
  
  height: rem(153);
  width: 100%;
  padding: rem(20) rem(35);

  z-index: 199307100337;
  background-color: #ffffff;
}

.Chat__footer--input {
  background-color: #f6f6f8;
  border-radius: 8px;
  color: #999999;
  height: rem(112);

  /deep/ {
    .el-input__inner {
      height: 100%;
      font-size: rem(34);
    }
  }
}
</style>