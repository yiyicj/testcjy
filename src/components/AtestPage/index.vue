<!--
 * @Author: your name
 * @Date: 2020-09-27 17:43:55
 * @LastEditTime: 2020-09-29 00:17:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /huoli/web-huoli-v2/src/views/AtestPage/index.vue
-->

<template>
  <div id="test">
    <div class="swiper-container news-banner">
      <div class="swiper-wrapper display-flex">
        <div v-for="(item, index) in newsImgList"
          :key="index"
          class="img-item swiper-slide">
          <img :src="item.thumb" alt=""
            @click="goDetail(item.url)">
        </div>
      </div>
       <div class="swiper-pagination"></div>
    </div>

    <div class="news-list" v-if="newsList && newsList.length">
      <div class="news-item display-flex"
        v-for="(newsItem, nIndex) in newsList"
        :key="nIndex"
        @click="showNews(newsItem.url)">
        <img :src="newsItem.thumb" alt="">
        <div class="news-title">
          {{newsItem.title}}
        </div>
      </div>
    </div>

    <bottom-dialog :visible.sync="showImgModal">
      <iframe width="375" height="600" :src="activeNews">  </iframe>
      <img :src="activeNews" class="big-news-img">
    </bottom-dialog>
  </div>
</template>
<script>
  import Swiper from "swiper"
  import bottomDialog from '@/components/bottomDialog'
  import testData from './data'
  export default {
    name: 'AtestPage',
    components: {
      bottomDialog,
    },
    data() {
      return {
        showImgModal: false,
        activeNews: '',
        newsImgList: [
          // {
          //   img: "https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2020-09/18/26221151194955776.JPEG?id=1171079",
          //   url: 'http://localhost:8000/hl-eat/vue/pages/goodsShelf_index?hlTicket=cjticket',
          // },
          // {
          //   img: "https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2020-09/18/26221151194955776.JPEG?id=1171079",
          //   url: 'http://localhost:8000/hl-eat/vue/pages/goodsShelf_index?hlTicket=cjticket',
          // },
        ],
        newsList: [
          // {
          //   smallImg: 'https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2019-11/19/25790495301632000.png?id=1137329',
          //   title: '号外号外',
          //   bigImg: 'https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2020-04/28/26018701653508096.png'
            
          // },
          // {
          //   smallImg: 'https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2019-11/19/25790495301632000.png?id=1137329',
          //   title: '过来吃瓜',
          //   bigImg: 'https://cdn.rsscc.cn/huoli/huoli_image/huolijingxuan/2020-04/28/26018701653508096.png'
          // }
        ]
      }
    },

    mounted() {
      this.queryData()
      // setTimeout(() => {
        this.$nextTick(() => {
          this.swiper = new Swiper('.swiper-container', {
            autoplay: {
              disableOnInteraction: false,
              delay: 2000
            },
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      // }, 1000)
      
      
    },
    methods: {
      showNews(url) {
        this.activeNews = url
        this.showImgModal = true
      },
      goDetail(url) {
        location.assign(url || 'http://news.hbtv.com.cn/hbxw')
      },
      queryData() {
        /**外网访问接口失败将为了测试页面只能将之前获取的数据静态引入 */
        // var ajax = new XMLHttpRequest()
        // ajax.open("get","http://192.168.89.72:81/data",true);
        // ajax.onreadystatechange=function(){   
        //   if(ajax.readyState==4){
        //     if(ajax.status==200){
        //       (ajax.responseText)
              
        //     }
        //   }
        // }
        // //将请求发送到服务器
        // ajax.send(null);
        const apiData = testData.data
        this.newsImgList = apiData.slide
        this.newsList = apiData.lists
        
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/swiper/swiper.min.scss";
  $base: 375;
    @function vw($px){
      @return ($px / $base) * 100vw;
    }
    .swiper-container{
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #00ff33;/* 两种都可以 */
   
  }
  .bottom-dialog-box.active .bottom-dialog-content {
    height: 60vh;
  }
    .news-banner {
      img {
        width: vw(375);
        height: vw(200);
      }
    }
    .news-list {
      .news-item {
        width: 100%;
        background-color: #bbb;
        margin-top: vw(16);
        align-items: center;
        font-size: vw(12);
        img {
          width: vw(80);
          height: vw(80);
        }
        .news-title {
          margin-left: vw(8);
        }
      }
    }

</style>