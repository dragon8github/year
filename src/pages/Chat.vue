<template>
    <div class="Chat">

        <main class='Chat__main' @click='clickOutside'>
          <div class='Chat__items'>
            <div class='Chat__item' v-for='(item, index) in items' :key='index'>
              <div class="Chat__item--avatar" :class='{ "is-boss": isHighlight(item.role) }'><img class='Chat__item--img' :src="item.avatar"></div>
              <div class="Chat__item--content">
                <span class='Chat__item--name'> {{ item.name }}：</span>
                <span class='Chat__item--text' :class='{ "is-highlight": isHighlight(item.role) }'>{{ item.text }}</span>
              </div>
            </div>
          </div>
        </main>

        <footer class='Chat__footer u-flex-bc'>
          <div class='Chat__footer--left'><img class='Chat__footer--img' :src="avatar"></div>
          <el-input class='Chat__footer--input' v-model='text' placeholder="发送祝福，竞猜大奖~(｡･ω･｡)~" clearable></el-input>
          <div class='Chat__footer--right' @click='face'></div>
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
        avatar: avatar,
        items: [
          { avatar: avatar, name: '李钊鸿', text: '祝福公司繁荣昌盛', role: 'employee', pendant: 1 },
          { avatar: avatar, name: '李钊鸿', text: '祝愿公司越来越好，生意兴隆', role: 'employee', pendant: 2 },
          { avatar: avatar, name: '陈总', text: '公司明年必定会进入一个更加辉煌的时代', role: 'boss', pendant: 3 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 5 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 6 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 7 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 8 },
          { avatar: avatar, name: '李钊鸿', text: '祝福公司繁荣昌盛', role: 'employee', pendant: 1 },
          { avatar: avatar, name: '李钊鸿', text: '祝愿公司越来越好，生意兴隆', role: 'employee', pendant: 2 },
          { avatar: avatar, name: '陈总', text: '公司明年必定会进入一个更加辉煌的时代', role: 'boss', pendant: 3 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 5 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 6 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 7 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 8 },
          { avatar: avatar, name: '李钊鸿', text: '祝福公司繁荣昌盛', role: 'employee', pendant: 1 },
          { avatar: avatar, name: '李钊鸿', text: '祝愿公司越来越好，生意兴隆', role: 'employee', pendant: 2 },
          { avatar: avatar, name: '陈总', text: '公司明年必定会进入一个更加辉煌的时代', role: 'boss', pendant: 3 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 5 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 6 },
          { avatar: avatar, name: '李钊鸿', text: '希望明年能告别单身', role: 'employee', pendant: 7 },
          { avatar: avatar, name: '李钊鸿', text: '今天希望能抽中一等奖', role: 'employee', pendant: 8 },
        ],
    }
  },
  methods: {
      isHighlight (role) {
          return role === 'boss'
      },
      clickOutside() {
        document.querySelector('.Chat__footer--input').blur()
      },
      face() {
        
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
  display: flex;
  flex-direction: column;
  position: relative;
}


.Chat__main {
  flex: 1;
  background: url('~@/assets/bg.png') center center / rem(101) rem(302)  repeat content-box;
}

.Chat__items {
  @include flex(s, s, c);
  flex-wrap: wrap;  
  margin: rem(30);
  margin-bottom: rem(150);
}

.Chat__item { 
  @include flex(s, s);
  margin-bottom: rem(50);

  .Chat__item--avatar {
      position: relative;
      width: rem(78);
      height: rem(78);  
      box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.14);
      border-style: solid;
      border-width: rem(6);
      border-image-source: linear-gradient(103deg, rgba(255, 68, 69, 1) 0%, rgba(211, 151, 254, 1) 100%);
      border-image-slice: 1;
      box-sizing: content-box;

      &.is-boss::after {
        content: '';
        position: absolute;
        left: rem(-37);
        top: rem(-30);
        @include bg(rem(150), rem(150), '~@/assets/w1.png');
      }

      .Chat__item--img {
        width: rem(78);
        height: rem(78);  
      }
  }
}

.Chat__item--content {
    position: relative;
    border-radius: rem(7);
    border: solid rem(3) #E8B3BB;
    background-color: #fff;
    margin-left: rem(30);
    min-height: rem(90);
    padding: rem(10) rem(20);
    line-height: rem(45);


    &::before {
      @include ycenter;
      content: '';
      left: rem(-13);
      top: rem(28);
      width: rem(20);
      height: rem(20);
      border-top: rem(3) solid #E8B3BB;
      border-left: rem(3) solid #E8B3BB;
      transform: rotate(-45deg);
      background-color: #ffffff;
    }


    .Chat__item--name {
      font-size: rem(34);
      color: rgba(102, 102, 102, 1);
    }

    .Chat__item--text {
        font-size: rem(34);
        color: rgba(51, 51, 51, 1);
    }
}


.Chat__footer {
  @include flex(c, c);
  position: fixed;
  bottom: 0;
  
  height: rem(153);
  width: 100%;
  padding-left: rem(20);
  padding-right: rem(15);

  z-index: 199307100337;
  background-color: #fff;

  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset,0 .5em 1em rgba(51, 51, 51, 0.5);
}

.Chat__footer--input {
  background-color: rgba(246, 246, 248, 1);
  border-radius: 8px;
  color: #999999;
  height: rem(112);
  margin-left: rem(16);
  margin-right: rem(16);

  /deep/ {
    .el-input__inner {
      height: 100%;
      font-size: rem(34);
      padding: 0 10px;
    }
  }
}

.Chat__footer--left {
  width: rem(82);
  height: rem(82);

  .Chat__footer--img {
    width: rem(82);
    height: rem(82);
  }
}

.Chat__footer--right {
  @include bg(rem(64), rem(64), '~@/assets/btn_emoji.png')
  padding: rem(35);
}

.is-highlight {
      display: inline-block;
      background-image: linear-gradient(to right, rgb(255, 83, 253) 0px, rgb(251, 240, 118) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
}
 

</style>