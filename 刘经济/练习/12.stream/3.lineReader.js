var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
///r/n 0x0d 0x0a
// http://baike.baidu.com/link?url=ZwIraTFCTerLt5dqA-DLufYtnzCnwJJVDkyWnU-6zEFq15P7YBOzX4m5Bu4LHtuT_34TPwo9lfaJwpQWuDfMK_ 

var RETURN= 0x0d; // ascii \r       ʮ�����Ƶ�d�͵���ʮ���Ƶ�13  �س� return �ƶ���굽���е���ʼλ��
var NEWLINE = 0x0a; // ascii  \n   ʮ�����Ƶ�a����ʮ���Ƶ�10 ���� newline ��������һ��������ʼλ��

function LineReader(path){
    this._rs = fs.createReadStream(path, 'ascii');
}
util.inherits(LineReader,EventEmitter);

LineReader.prototype.on('newListener',function(name,func){
    var self=this;
    var lineData;
    var ok=false;
    var dataArr=[];
    if(name === "newLine"){
        this._rs.on("readable",function(){
            var data;
            var dataArr=[];
            while(null!=(data=self._rs.read(1))){
                console.log(data === NEWLINE)
                //for(var i=0;i<data.length;i++){
                //    console.log(data[i], 'test')
                //    if(ok){
                //        console.log(data[i], NEWLINE, data[i] === NEWLINE , 'liu')
                //        if(data[i] === NEWLINE){
                //            //console.log(dataArr,"dd")
                //            var buf=new Buffer(dataArr,"utf8");
                //            //console.log(buf,"ee")
                //            if(buf.length>0){
                //                self.emit("newLine",buf)
                //            }
                //            dataArr=[]
                //            ok=false;
                //        }
                //    }else if(data[i] === RETURN){
                //        ok=true;
                //    }else
                //        ok=false;
                //    dataArr.push(data[i])
                //}

            }


        })
    }
    if(name === "end"){
        this._rs.on("end",function(){
            self.emit("end")
        })
    }

});

var reader = new LineReader('./read.txt');
reader.on('newLine',function(data){
    console.log(data.toString(),"dd");
});
reader.on('end',function(){
    console.log('end');
});