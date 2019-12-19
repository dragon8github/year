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

        }
    },
    methods: {
        isHighlight(role) {
            return role === 'boss'
        },
        randomPos() {
            // 获取屏幕宽高
            const { innerWidth: w, innerHeight: h } = window
            // 获取随机数
            return { left: w + 200 + 'px', top: parseInt(Math.random() * h) + 'px' }
        },
        getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0),
                i = arr.length,
                min = i - count,
                temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
    },
    beforeMount() {
        $('body').barrager({ 'img': avatar, 'info': 'Hello world!' });
    },
}
</script>
<style lang="scss" scoped>
.PC {
    @include bg(100%, 100%, '~@/assets/main.png')
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
    background-color: rgba(0, 0, 0, .3);
    padding-right: 8px;
    height: 44px;
    display: inline-block;
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
    margin-left: 18px;
}

.barrage_box div.p a:hover {
    text-decoration: none;
}

.barrage_box .close {
    visibility: hidden;
    opacity: 0;
    text-align: center;
    width: 25px;
    height: 25px;
    margin-left: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .1);
    margin-top: 8px;
    background-image: url('~@/assets/close.png');
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