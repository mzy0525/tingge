Page({

  data: {
    //所有歌曲数据
    musicDate: [],
    //选择歌曲   选择歌曲   下标
    index: 0,
    //当前歌词，名称
    songname: [],
    //选择歌名
    songname_user: [],
    //当前歌曲地址
    src: "",
    //当前16个字
    keyword: [],
    //控制动画
    fal:false
  },
  //点击选择文字
  xuan(e) {
    /**
     * 循环真实歌名的长度，让接受用户歌名数组不得超过真实歌名长度
     * 如果用户数组中有空选项则先添加空
     */
    for (let s = 0; s < this.data.songname.length; s++) {
      if (this.data.songname_user[s] == "") {
        this.data.songname_user[s] = this.data.keyword[e.target.id]
        //动态改变data的值 用户数组
        this.setData({
          songname_user: this.data.songname_user
        })
        //当真实革命长度=用户革命长度  并没有空值
        if (s == this.data.songname.length - 1) {
          //判断歌名是否选对
          if (this.data.songname_user.join("") == this.data.songname.join("")) {
            //判断是否通关
            if (this.data.musicDate[this.data.index + 1] == undefined) {
              wx.showModal({
                title: '恭喜你，全部通关了',
                content: '点击领奖',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url:'../victory/victory'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            } else {
              wx.showToast({
                title: '恭喜你，进入下一关',
                icon: 'success',
                duration: 2000
              })

              this.setData({
                index: this.data.index + 1,
              })
              this.a()
            }

          } else {
           this.setData({
             fal:true
           })
          }

        }


        break;
      }

    }




  },
  //点击修改错误
  songnamechange(e) {
    console.log(e)
    this.data.songname_user[e.target.id] = "";
    this.setData({
      fal:false,
      songname_user: this.data.songname_user
    })
  },

  //页面加载
  onLoad: function () {
    let s = require("./../static/json")
    this.setData({
      musicDate: s.data
    })

    this.a()

  },
  //初始化数据
  a() {
    this.data.songname = this.data.musicDate[this.data.index].songname.split("");
    this.data.keyword = this.data.musicDate[this.data.index].keyword;
    this.data.src = this.data.musicDate[this.data.index].src;
    this.data.songname_user = []
    for (let s = 0; s < this.data.songname.length; s++) {
      this.data.songname_user.push("")
    }
    this.setData({
      songname: this.data.songname,
      keyword: this.data.keyword,
      src: this.data.src,
      songname_user: this.data.songname_user
    })
  }

})