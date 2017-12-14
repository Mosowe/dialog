    function dialog(){
        this.oDiv = null;
        this.oBg = null;
        this.btns='';
        this.settings = {
            title: '',            // 标题
            width: 300,           // 宽度
            height: 300,          // 高度
            left: 0,              // X定位
            top: 0,               // Y定位
            drag:true,            // 是否需要拖拽功能
            dialogHtml:'',        // 主体内容
            buttons:[
                {
                    name: '确定',
                    className:'yes',
                    id:'yes',
                    method: 'closedialog()'
                }
            ]         // 按钮组
        }
        this.settings.left = (winWidth()-this.settings.width)/2;   // 初始化弹框定位位置为正中心
        this.settings.top = (winHeight()-this.settings.height)/2;
    }
    dialog.prototype.init = function(opt){
        extend( this.settings,opt)
        this.creatEl();
        this.closeEl();
        this.doSomething();
    };
    //弹框加载完成后执行的js
    dialog.prototype.doSomething = function(){
        if(this.settings.drag == true){
            this.drag();
        }
    };
//创建弹框
    dialog.prototype.creatEl = function(){
        this.oDiv = document.createElement("div");
        this.oDiv.id = "dialog-wrapper";
        this.oBg = document.createElement('div');
        this.oBg.id = "dialogbox";
        for(var i = 0; i<this.settings.buttons.length; i++){
            this.btns += '<button class="'+this.settings.buttons[i].className+'" id="'+this.settings.buttons[i].id+'" onclick="'+this.settings.buttons[i].method+'">'+this.settings.buttons[i].name+'</button>'
        }
        this.oDiv.innerHTML = "<h1 class='dialog-title'>"+this.settings.title+"</h1>" +
            "<i class='dialog-close ion ion-android-close' onclick='closedialog()'></i>" +
            "<div class='dialog-content'>"+this.settings.dialogHtml+"</div><div class='dialog-btns'>"+this.btns+"</div>";
        this.oDiv.style.width = this.settings.width+"px";
        this.oDiv.style.height= this.settings.height+"px";
        this.oDiv.style.left = this.settings.left+"px";
        this.oDiv.style.top = this.settings.top+"px";

        this.oBg.style.width = winWidth()+"px";
        this.oBg.style.height = winHeight()+"px";
        this.oBg.appendChild(this.oDiv);
        document.body.appendChild(this.oBg);
    };

//弹框拖拽功能
    dialog.prototype.drag = function(){
        var This = this;
        This.oDiv.getElementsByTagName("h1")[0].onmousedown = function(){
            var ev = event || window.event;
            var dleft = ev.clientX - This.oDiv.offsetLeft;
            var dtop  = ev.clientY - This.oDiv.offsetTop;

            if(This.oDiv.setCapture){//设置全局捕获==>取消浏览器默认的文字拖拽（ie8及以下）
                This.oDiv.setCapture();
            }
            document.onmousemove = function(){
                var e = event || window.event;
                var mLeft = e.clientX - dleft;
                var mTop  = e.clientY - dtop;

                w = document.documentElement.clientWidth
                h = document.documentElement.clientHeight

                if(mLeft < 20){
                    mLeft = 20;
                }else if(mLeft>w-This.oDiv.offsetWidth-20){
                    mLeft = w-This.oDiv.offsetWidth-20;
                }
                if(mTop < 20){
                    mTop = 20;
                }else if(mTop>h-This.oDiv.offsetHeight-20){
                    mTop = h -This.oDiv.offsetHeight-20;
                }
                This.oDiv.style.left = mLeft+"px";
                This.oDiv.style.top = mTop+"px";
            }
            document.onmouseup =function(){

                document.onmousemove  = null;
                document.onmouseup = null;
                if(This.oDiv.releaseCapture){//取消全局捕获
                    This.oDiv.releaseCapture();
                }
            }
            return false;//取消浏览器默认的文字拖拽
        }
    };

//键盘事件esc关闭按钮/按键
    dialog.prototype.closeEl = function(){
        var This = this;
        document.onkeydown = function(){
            var e = event||window.event;
            if(e.keyCode == 27){
                document.body.removeChild(This.oBg);
            }
        }
    };

//可视区域宽高
    function winWidth() {
        return document.documentElement.clientWidth
    }
    function winHeight() {
        return document.documentElement.clientHeight
    }
//点击事件关闭dialog
    function closedialog(){
        document.body.removeChild(document.getElementById("dialogbox"))
    }
    function extend(obj1,obj2){
        for(var attr in obj2){
            obj1[attr] = obj2[attr];
        }
    }
