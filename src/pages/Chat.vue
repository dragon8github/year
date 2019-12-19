<template>
    <div class='Chat'>
        <div class='Chat__main' @click='clickOutside'>
            <div class='Chat__items'>
                <div class='Chat__item' v-for='(item, index) in items' :key='index'>
                    <div class='Chat__item--avatar' :class='{ "is-boss": isHighlight(item.role) }'><img class='Chat__item--img' :src='item.avatar'></div>
                    <div class='Chat__item--content'>
                        <span class='Chat__item--name'> {{ item.username }}：</span>
                        <span class='Chat__item--text' :class='{ "is-highlight": isHighlight(item.role) }'>{{ item.content }}</span>
                    </div>
                </div>
            </div>
        </div>

        <footer class='Chat__footer u-flex-bc'>
            <div class='Chat__footer--left'><img class='Chat__footer--img' :src='avatar'></div>
            <el-input class='Chat__footer--input' autofocus v-model='text' @focus='scrollToBottom' @keyup.enter.native='send' :placeholder='isDisable ? disableText : "发送祝福，竞猜大奖~(｡･ω･｡)~"' clearable :disabled='isDisable'></el-input>
            <div class='Chat__footer--right' @click='face'></div>
        </footer>
    </div>
</template>
<script>
// 示例微信头像
const avatar = require('@/assets/wx.jpg')

export default {
    name: 'Chat',
    data() {
        return {
            text: '',
            avatar: avatar,
            items: [],
            isDisable: false,
            disableText: '',
            isFirst: true,
            isCommit: false,
        }
    },
    methods: {
        isHighlight(role) {
            return role === 'boss'
        },
        clickOutside() {
            document.querySelector('.Chat__footer--input').blur()
        },
        face() {

        },
        async scrollToBottom() {
          setTimeout(() => window.scrollTo(0, document.querySelector('.Chat__main').scrollHeight), 50);
        },
        send() {
          let params = JSON.stringify({ userName: '李钊鸿', content: this.text.trim(), isShow: true })
           $.ajax({
               url: 'http://47.107.160.191:3078/api/addComment',
               contentType: 'application/json; charset=utf-8',
               method: 'POST',
               data: params,
               success: msg => {
                  console.log('send', msg)
                  this.isCommit = true
                  this.disable(5)
               }
           })
        },
        disable(n) {
          // 清空文本
          this.text = ''
          if (n === 0) {
            this.isDisable = false
            this.disableText = ''
          } else {
            this.isDisable = true
            this.disableText = `请稍等 ${n} 秒～(￣▽￣～)`  
            setTimeout(() => this.disable(--n), 1000);
          }
        }
    },
    components: {

    },
    computed: {

    },
    watch: {

    },
    beforeMount() {
        const ws = new WebSocket('ws://47.107.160.191:7878')
        ws.onopen  = e => console.log('WebSocket onopen')
        ws.onclose = e => console.log('WebSocket onclose')
        ws.onerror = e => console.log('WebSocket onclose')
        ws.onmessage = e => {
          // 获取消息列表
          let data  = JSON.parse(e.data)
          // 数据清洗
          this.items = data.filter(_ => {
              /* （可选）数据过滤 */
              return _
          }).map(_ => {
              /* (可选)数据清洗 */

              // 返回最终数据
              return Object.assign({}, _ ,{ avatar })
          })

          // 第一次的时候，需要 this.scrollToBottom()
          if (this.isFirst) {
            this.isFirst = false
            this.scrollToBottom()
          }

          // 自己发送的以后的接受时，需要调用 this.scrollToBottom()
          if (this.isCommit) {
            this.isCommit = false
            this.scrollToBottom()
          }

          console.log('消息队列', this.items)
        }
    }
}
</script>
<style lang='scss' scoped>
.Chat {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}


.Chat__main {
    flex: 1;
    background: url('~@/assets/bg.png') center center / rem(101) rem(302) repeat content-box;
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

    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .5em 1em rgba(51, 51, 51, 0.5);
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
    @include bg(rem(64), rem(64), '~@/assets/btn_emoji.png') padding: rem(35);
}

.is-highlight {
    display: inline-block;
    background-image: linear-gradient(to right, rgb(255, 83, 253) 0px, rgb(251, 240, 118) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>