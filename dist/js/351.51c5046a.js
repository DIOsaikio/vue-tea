"use strict";(self["webpackChunkvue_tea"]=self["webpackChunkvue_tea"]||[]).push([[351],{2245:function(e,t,a){a.d(t,{A:function(){return l}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("header",[a("div",{staticClass:"left",on:{click:e.goBack}},[a("i",{staticClass:"iconfont icon-fanhui"})]),a("div",{staticClass:"middle"},[a("form",{attrs:{action:"",onsubmit:"return false"}},[a("i",{staticClass:"iconfont icon-sousuo"}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchVal,expression:"searchVal"}],ref:"myinput",attrs:{type:"text",placeholder:"搜索您喜欢的商品...",autofocus:""},domProps:{value:e.searchVal},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goSearch.apply(null,arguments)},input:function(t){t.target.composing||(e.searchVal=t.target.value)}}})])]),a("div",{staticClass:"right",on:{click:e.goSearch}},[e._v("搜索")])])},r=[],i=(a(4114),{data(){return{searchVal:this.$route.query.keyword||"",searchArr:[]}},created(){},mounted(){window.addEventListener("touchmove",this.myTouchMove,!0)},methods:{myTouchMove(){this.$refs.myinput.blur()},goBack(){this.$router.back()},goSearch(){if(!this.searchVal)return;localStorage.getItem("searchList")?this.searchArr=JSON.parse(localStorage.getItem("searchList")):localStorage.setItem("searchList","[]"),this.searchArr.unshift(this.searchVal);let e=new Set(this.searchArr);localStorage.setItem("searchList",JSON.stringify(Array.from(e))),this.searchVal!==this.$route.query.keyword&&this.$router.push({name:"list",query:{keyword:this.searchVal}})}}}),c=i,n=a(1656),o=(0,n.A)(c,s,r,!1,null,"9bdefd1c",null),l=o.exports},2351:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search-list"},[a("div",{staticClass:"header"},[a("Header"),a("ul",e._l(e.serechTab.data,(function(t,s){return a("li",{key:s,on:{click:function(t){return e.changeTab(s)}}},[a("div",{class:e.serechTab.currentindex==s?" active":""},[e._v(e._s(t.name))]),0!=s?a("div",{staticClass:"search-filter"},[a("i",{staticClass:"iconfont  icon-shaixuanjiantou1",class:1==t.status?" active":""}),a("i",{staticClass:"iconfont  icon-shaixuanjiantou",class:2==t.status?" active":""})]):e._e()])})),0)],1),a("section",{staticClass:"wrapper"},[a("div",[e.goodsList.length?a("ul",e._l(e.goodsList,(function(t,s){return a("li",{key:s},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgUrl,expression:"item.imgUrl"}],attrs:{alt:""}}),a("h3",[e._v(e._s(t.content))]),a("div",{staticClass:"info"},[a("div",{staticClass:"price"},[a("b",[e._v("￥")]),a("span",[e._v(e._s(t.price))])]),a("div",{staticClass:"buy"},[e._v("立即购买")])])])})),0):a("h1",[e._v("暂无数据...")])])]),a("Tabbar")],1)},r=[],i=a(9930),c=a(2245),n=a(3890),o=a(414),l={data(){return{goodsList:[],serechTab:{currentindex:0,data:[{name:"综合",key:"zh"},{name:"价格",status:0,key:"price"},{name:"销量",status:0,key:"sale"}]}}},computed:{orderBy(){let e=this.serechTab.data[this.serechTab.currentindex],t="";return t=0!=this.serechTab.currentindex?"1"==e.status?"asc":"desc":"asc",{[e.key]:t}}},created(){this.getData()},methods:{async getData(){let e=await n.A.$axios({url:"/api/goods/shopList",params:{searchName:this.$route.query.keyword,...this.orderBy}});this.goodsList=e.data.data,this.$nextTick((()=>{new o.Ay(".wrapper")})),console.log(e)},changeTab(e){this.serechTab.currentindex=e;let t=this.serechTab.data[e];this.serechTab.data.forEach(((t,a)=>{a!=e&&(t.status=0)})),this.serechTab.currentindex===e&&(t.status=1==t.status?2:1,this.getData())}},watch:{$route(e,t){this.getData()}},components:{Tabbar:i.A,Header:c.A}},u=l,h=a(1656),d=(0,h.A)(u,s,r,!1,null,"6c289774",null),m=d.exports}}]);