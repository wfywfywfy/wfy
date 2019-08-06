(function () {


    var Sli = function (id) {
        this.contain = document.getElementById(id.id);

        // console.log(contain);
        this.imglist = this.contain.getElementsByClassName('imglist')[0];
        this.imglistul = this.imglist.getElementsByClassName('imglistul')[0];
        this.imglistli = this.imglistul.getElementsByClassName('imglistli');
        // console.log(this.imglistli);
        this.step = 1;
        this.conwidth = null;
        this.timer = null;
        fns.fire.call(this);
        this.layer = this.contain.getElementsByClassName('layer')[0];
        // console.log(this.layer);
    }
    fns = {
        //克隆第一张和最后一张
        clonefn: function () {
            var that = this;
            var firstchi = that.imglistli[0].cloneNode(true);
            that.imglistul.appendChild(firstchi);
            var lastchi = that.imglistli[(that.imglistli.length - 2)].cloneNode(true);
            that.imglistul.insertBefore(lastchi, that.imglistli[0]);
        },
        //设置ul的宽度，li的宽度
        getulfn: function () {
            var that = this;
            that.conwidth = that.contain.clientWidth;
            var ulwidth = that.imglistul.style.width;
            ulwidth = that.conwidth * that.imglistli.length + 'px';

            for (var i = 0; i < that.imglistli.length; i++) {
                that.imglistli[i].style.width = that.conwidth + 'px';

            }

            that.imglistul.style.width = ulwidth;
            toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
            // that.step++;
            // console.log(conwidth);
        },
        //图片左右滑动的方法
        bindmovfn: function () {
            var that = this;
            var starpageX, endpageX, diff;

            that.imglist.addEventListener("touchstart", function (e) {
                // console.log(e);
                clearInterval(that.timer);
                starpageX = e.changedTouches[0].pageX;
                // console.log(starpagex);
            });

            // that.imglist.addEventListener("touchmove", function (e) {
            //     console.log(endpageX);


            // });
            that.imglist.addEventListener("touchend", function (e) {
                // console.log('结束');
                // console.log(e);
                endpageX = e.changedTouches[0].pageX;
                // console.log(diff);
                // console.log(that.step);
                diff = starpageX - endpageX
                that.layer.style.display = 'block';
                console.log(that.layer.style.display);
                if (diff >= 30) {
                    that.step++;
                    console.log(that.step);
                    toolfn.setTransition(that.imglistul, 1000);
                    toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                    that.imglistul.addEventListener("webkitTransitionEnd", function () {
                        if (that.step > that.imglistli.length - 2) {

                            // toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                            toolfn.clearTransition(that.imglistul);
                            that.step = 1;
                            console.log(that.step);
                            console.log(that.imglistli.length);
                            toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                        }
                    }, false)
                    // console.log(that.step);

                }
                else if (diff < -30) {
                    console.log(that.step);
                    that.layer.style.display = 'block';
                    // console.log(that.layer.style.display);
                    that.step--;
                    toolfn.setTransition(that.imglistul, 1000);
                    console.log(that.step);
                    toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                    that.imglistul.addEventListener("webkitTransitionEnd", function () {
                        if (that.step < 1) {
                            toolfn.clearTransition(that.imglistul);
                            that.step = that.imglistli.length - 2;
                            toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                        }
                        that.layer.style.display = 'none';
                    })
                    // console.log(that.step);
                } else {

                    toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                }



                // toolfn.clearTransition(that.imglistul);
                fns.settimeoutfn.call(that);

            });
        },
        settimeoutfn: function (that) {
            var that = this;
            that.timer = setInterval(function () {
                that.layer.style.display = 'block';
                that.step++;
                toolfn.setTransition(that.imglistul, 1000);
                // console.log(that.step);
                toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                // toolfn.clearTransition(that.imglistul);
                that.imglistul.addEventListener("webkitTransitionEnd", function () {
                    if (that.step > that.imglistli.length - 2) {
                        toolfn.clearTransition(that.imglistul);
                        that.step = 1;
                        toolfn.setTransform(that.imglistul, -that.conwidth * that.step, 0);
                    }
                    that.layer.style.display = 'none';
                })

            }, 3000);
        },
        resizefn: function () {
            var that = this;
            window.addEventListener("resize", function () {
                that.step = 1;
                toolfn.clearTransition(that.imglistul);
                that.layer.style.display = 'block';
                clearInterval(that.timer);
                fns.getulfn.call(that);

                that.layer.style.display = 'none';
                fns.settimeoutfn.call(that);
            }, false)
        },
        fire: function () {
            fns.clonefn.call(this);
            fns.getulfn.call(this);
            fns.settimeoutfn.call(this);
            fns.bindmovfn.call(this);
            fns.resizefn.call(this);

        }

    }
    var toolfn = {
        /*
        * 
        * @exports 设置transform
        * @param {any} paramName
        * @returns 
        */
        setTransform: function (dom, xVal, yVal) {
            if (!yVal) {
                yVal = 0;
            }
            dom.style.webkitTransform = 'translate(' + xVal + 'px,' + yVal + 'px)';
            dom.style.transform = 'translate(' + xVal + 'px,' + yVal + 'px)';
        },
        /** 
        * 设置transition
        */
        setTransition: function (dom, time) {
            dom.style.transition = 'transform ' + time + 'ms ease-out';
            dom.style.webkitTransition = '-webkit-transform ' + time + 'ms ease-out';
        },
        /**
         * 清除动画特效
         */
        clearTransition: function (dom) {
            // dom.style.transition = 'transform 0ms ease-out';
            dom.style.transition = null;
            dom.style.webkitTransition = null;
        }, /**
         * 判断元素中是否存在指定className
         * element{dom对象},元素对象
         * className{String},类名
         * return {object}
         */
        hasClass: function (element, className) {
            return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')); // className1 classname2 classname3
        },
        /**
         * 给元素添加一个className
         * element{dom对象},元素对象
         * className{String},类名
         */
        addClass: function (element, className) {
            //如果已经存在指定的className,就结束代码块
            if (toolfn.hasClass(element, className)) {
                return;
            }
            // var str = "classname "
            var oldClassName = element.className; //获取元素的已经存在的className-->String
            var pattern = /^\s*(.+)\s*$/;
            oldClassName = oldClassName.replace(pattern, '$1'); //去除oldClassName前后空格
            element.className = oldClassName + " " + className; //最后追加新的类名
        },
        /**
         * 给dom对象删除一个className
         * element{dom对象},元素对象
         * className{String},类名
         */
        removeClass: function (element, className) {
            //如果不存在指定的className，就结束
            if (!toolfn.hasClass(element, className)) {
                return;
            }
            element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        },
        //复制对象方法
        cloneObj: function (oldObj) {
            var _this = this;
            if (typeof (oldObj) != 'object') return oldObj;
            if (oldObj == null) return oldObj;
            var newObj = new Object();
            for (var i in oldObj)
                newObj[i] = _this.cloneObj(oldObj[i]);
            return newObj;
        },
        //扩展对象
        extendObj: function () {
            var _this = this;
            var args = arguments;
            if (args.length < 2) return;
            var temp = _this.cloneObj(args[0]); //调用复制对象方法
            for (var n = 1; n < args.length; n++) {
                for (var i in args[n]) {
                    temp[i] = args[n][i];
                }
            }
            return temp;
        }
    }
    window.aa = Sli;
})();