<template>
  <view>
    <view class="search-box">
      <uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
          <uni-tag inverted="true" :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        //搜索
        searchResults:[],
        //搜索历史的数组
        historyList:[]
      };
    },
    onLoad() {
      console.log(JSON.parse(uni.getStorageSync('kw')))
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
      console.log();
    },
    methods:{
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.kw=e;
          this.getSearchList()
        },500)
      },
      async getSearchList(){
        if(this.kw.length === 0){
          this.searchResults=[]
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if(res.meta.status !== 200)  return uni.$showMsg()
        this.searchResults = res.message
        
        this.saveSearchHidtory()
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_details/goods_details?goods_id='+item.goods_id
        })
      },
      saveSearchHidtory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        console.log(set);
        console.log('====');
        set.delete(this.kw)
        set.add(this.kw)
        console.log(set);
        this.historyList = Array.from(set)
        
        // 对搜索历史数据，进行持久化
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    },
  
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box{
    background-color: #C00000;
    position: sticky;
    top:0;
    z-index:999;
  }
  
  .sugg-list{
    padding: 0 5px;

    .sugg-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #bfbfbf;
      
      .goods-name{
        // 文字不允许换行（单行）
        white-space: nowrap;
        overflow: hidden;
        // 文本溢出后，使用...代替
        text-overflow: ellipsis;
      }
    }
  }
  .history-box{
    padding: 0 5px;
    .history-title{
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
