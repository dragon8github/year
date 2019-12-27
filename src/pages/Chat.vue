<template>
    <div class='Chat'>
        <div class='Chat__main' @click='clickOutside'>
            <div class='Chat__items'>
                <div class='Chat__item' v-for='(item, index) in items' :key='index'>
                    <div class='Chat__item--avatar' :class='{ "is-boss": isHighlight(item.role) }'><img class='Chat__item--img' :src='item.headimgurl'></div>
                    <div class='Chat__item--content'>
                        <span class='Chat__item--name'> {{ item.userName }}：</span>
                        <span class='Chat__item--text' :class='{ "is-highlight": isHighlight(item.role) }'>{{ item.content }}</span>
                    </div>
                </div>
            </div>
        </div>
        <footer class='Chat__footer u-flex-bc'>
            <!-- <div class='Chat__footer--left'><img class='Chat__footer--img' :src='avatar'></div> -->
            <el-popover
              class='Chat__footer--rightWrapper'
              placement="top"
              title=""
              width="100%"
              trigger="click">
                <div class='face'>
                    <div class="face__item" v-for='(item, index) in faces' :key='index' @click='setFace(item)'>{{ item }}</div>
                </div>
                <div class='Chat__footer--right' slot="reference" @click="face"></div>
            </el-popover>
            <el-input type='textarea' resize="none" class='Chat__footer--input' autofocus v-model='text' @focus='scrollToBottom' @keyup.enter.native='send' :placeholder='isDisable ? disableText : "发送祝福，竞猜大奖~(｡･ω･｡)~"' clearable :disabled='isDisable'></el-input>
            <el-button type="success" @click='send'>发送</el-button>
        </footer>
    </div>
</template>
<script>

/**
 * @func
 * @desc - 从url地址中根据参数获取指定的值
 * @param {string} name - 参数
 * @param {string} url - url
 */
var getUrlParam = function(name, url) {
    if (!url) url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var returnValue;
    for (var i = 0; i < paraString.length; i++) {
        var tempParas = paraString[i].split('=')[0];
        var parasValue = paraString[i].split('=')[1];
        if (tempParas === name)
            returnValue = parasValue;
    }
    if (!returnValue) {
        return "";
    } else {
        if (returnValue.indexOf("#") != -1) {
            returnValue = returnValue.split("#")[0];
        }
        return returnValue;
    }
}

export default {
    name: 'Chat',
    data() {
        return {
            text: '',
            avatar: null,
            items: [],
            isDisable: false,
            disableText: '',
            isFirst: true,
            isCommit: false,
            name: '',
            openid: null,
            faces: ['（⌒▽⌒）', '（￣▽￣）', '(=・ω・=)', '(｀・ω・´)', '(〜￣△￣)〜', '(･∀･)', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '( ´_ゝ｀)', '→_→', '←_←', '(;¬_¬)', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)<', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '(╯°口°)╯(┴—┴',],
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
            document.querySelector('input').focus()
        },
        async scrollToBottom() {
            setTimeout(() => window.scrollTo(0, document.querySelector('.Chat__main').scrollHeight), 50);
        },
        send() {
            let params = JSON.stringify({ userName: this.name, content: this.text.trim().substr(0, 50), isShow: true, openid: this.openid })
            $.ajax({
                url: 'http://47.107.160.191:3078/nhcapi/addComment',
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
        setFace(face) {
            this.text += face
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
        },
        getUserInfo() {
            this.openid = getUrlParam('openid')
            
            console.log('openid', this.openid)

            $.ajax({
                url: "http://47.107.160.191:3078/nhcapi/userInfo",
                method: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ openid: this.openid }),
                success: result => {
                    const { headimgurl, nickname } = result.data
                    console.log('获取微信信息', headimgurl, nickname)
                    this.avatar = headimgurl
                    this.name = nickname
                }
            })
        }
    },
    beforeMount() {
        this.getUserInfo()

        const ws = new WebSocket('ws://47.107.160.191:7878')

        ws.onopen = (...args) => console.log('消息通道打开了', args)
        ws.onclose = e => console.log('WebSocket onclose')
        ws.onerror = e => console.log('WebSocket onclose')
        ws.onmessage = e => {

            console.log('您有新的消息:', e)

            // 获取消息列表
            let data = JSON.parse(e.data).slice(-100)

            // 数据清洗
            // this.items = data.filter(_ => {
            //     /* （可选）数据过滤 */
            //     return _
            // }).map(_ => {
            //     /* (可选)数据清洗 */

            //     // 返回最终数据
            //     return Object.assign({}, _, { avatar })
            // })

            // 插入
            this.items.push(...data)

            // 只取最后100条记录
            this.items.slice(-100)


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

/deep/ {
    .el-button {
        padding: 12px 10px;
    }

    .el-textarea__inner {
        padding: 5px 4px;
        line-height: 1.3;
    }
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
    word-break: break-all;

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

.Chat__footer--rightWrapper {
    width: rem(64);
    height: rem(64);
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

.face {
    display: flex;justify-content: flex-start;flex-wrap: wrap;
}

.face__item {
    margin: rem(30) rem(30) 0;
    color: #757575;
}
</style>