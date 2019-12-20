<template>
    <div class="PC">
    </div>
</template>
<script>
// 示例微信头像
const avatar = require('@/assets/wx.jpg')

export default {
    name: 'PC',
    data() {
        return {
            items: [],
        }
    },
    methods: {
        isHighlight(role) {
            return role === 'boss'
        },
    },
    beforeMount() {
        const ws = new WebSocket('ws://47.107.160.191:7878')
        ws.onopen  = e => console.log('WebSocket onopen')
        ws.onclose = e => console.log('WebSocket onclose')
        ws.onerror = e => console.log('WebSocket onclose')
        ws.onmessage = e => {
          // 获取消息列表
          let data  = JSON.parse(e.data)

          // 找出新长度
          const len = data.length - this.items.length

          // 先赋值
          this.items = data

          // 如果长度健康的话
          if (len) {
            // 往后取n个
            const newList = this.items.slice(-len)

            // 获取当前时间
            const now = Date.now()

            // 只取最近一分钟之内的。
            const _newList = newList.filter(_ => now - new Date(_.createTime) <= 600 * 1000)

            // 开始发送
            _newList.forEach(item => $('body').barrager({ space: 10, 'img': avatar, 'info': item.content }))            
          }
        }
    },
}
</script>
<style lang="scss" scoped>
.PC {
    background: transparent url('~@/assets/main.png') center center / 100% 100%  no-repeat content-box;
}

.is-highlight {
    background: linear-gradient(to right, rgb(73, 200, 149), rgb(38, 198, 218));
    color: white;
}
</style>
<style>
.barrage {
    position: fixed;
    bottom: 70px;
    right: -500px;
    display: inline-block;
    z-index: 99999
}

.barrage_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: rgba(0, 0, 0, .3);
    padding-right: 8px;
    height: 44px;
    transition: all .3s;

    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;


    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.barrage_box .portrait {
    display: inline-block;
    width: 44px;
    height: 44px;
    overflow: hidden;

    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.14);
    border-style: solid;
    border-width: 3px;
    border-image-source: linear-gradient(103deg, rgba(255, 68, 69, 1) 0%, rgba(211, 151, 254, 1) 100%);
    border-image-slice: 1;
}

.barrage_box .portrait img {
    width: 100%;
    height: 100%;
}

.barrage_box div.p a {
    margin-right: 2px;
    font-size: 22px;
    color: #fff;
    line-height: 44px;
    margin-left: 10px;
}

.barrage_box div.p a:hover {
    text-decoration: none;
}

.barrage_box .close {
    width: 15px;
    height: 15px;
    background: rgba(255, 255, 255, .1) url('~@/assets/close.png') center center / 100% 100%  no-repeat content-box;
    visibility: hidden;
    opacity: 0;
    text-align: center;
    border-radius: 50%;
}

.barrage_box:hover .close {
    visibility: visible;
    opacity: 1;
}

.barrage_box .close a {
    display: block;
}

.barrage_box .close .icon-close {
    font-size: 14px;
    color: rgba(255, 255, 255, .5);
    display: inline-block;
    margin-top: 5px;
}

.barrage .z {
    float: left !important;
}

.barrage a {
    text-decoration: none;
}
</style>