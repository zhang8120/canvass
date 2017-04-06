function  shape (canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.type="line";
    this.width=canvas.width;
    this.height=canvas.height;
    this.style="stroke";
    this.eraserR="5"
    this.fill="#000";
    this.border="#000";
    this.bianNum="5";
    this.linewidth=1;
    this.arr=[];
    this.isback=true;
}
shape.prototype={
    init: function () {
        this.cobj.strokeStyle=this.border;
        this.cobj.fillStyle=this.fill;
        this.cobj.linewidth=this.linewidth;

    },
    draw:function(){
        var that=this;
        this.canvas.onmousedown=function(e){
            var stratX= e.offsetX;
            var stratY= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.init();
                var endX= e.offsetX;
                var endY= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.arr.length>0){
                    that.cobj.putImageData(that.arr[that.arr.length-1],0,0)
                }
                that.cobj.beginPath();
                that[that.type](stratX,stratY,endX,endY);
            }
            that.canvas.onmouseup=function(){
                that.arr.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    line:function(x1,y1,x2,y2){
        this.cobj.moveTo(x1,y1);
        this.cobj.lineTo(x2,y2);
        this.cobj.stroke();
    },
    rect:function(x1,y1,x2,y2){
        this.cobj.rect(x1,y1,x2-x1,y2-y1);
        this.cobj[this.style]();
    },
    arc:function(x1,y1,x2,y2){
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        this.cobj.arc(x1,y1,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x1,y1,x2,y2){
        //prompt.val
      var  r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var angle=360/this.bianNum*Math.PI/180;
        for (var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.sin(angle*i)*r+x1,Math.cos(angle*i)*r+y1);
            //this.cobj.lineTo()
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    //eraser:function(){
    //    that.canvas.onmousemove=function(e){
    //        that.init();
    //        var x= e.offsetX;
    //        var y= e.offsetY;
    //    this.cobj.arc(x,y,eraserR,0,2*Math.PI);
    //        that.cobj.clearRect(x,y,that.width,that.height);
    //    }
    //},
    //jiao:function(){
    //
    //}

}