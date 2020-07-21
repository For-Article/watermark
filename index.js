class obj {
    constructor(params){
        this.params = Object.assign({
            fontSize: '30px',
            color: '#f1f1f1', 
            id: this.getRandomString(18),
            text: 'Luoyang',
            size: 200,
            clarity: 1,
            supportTip: '你的浏览器不支持Canvas'
        }, params);
        this.init();
        this.setSafetyLock();
    }
    init(){
        this.createCanvas();
        this.fillCanvas();
    }
    setSafetyLock() {
        let self = this;
        window.setInterval(function(){
            let canvasDom = document.getElementById(self.params.id);            
            if (!canvasDom 
            || canvasDom.style.cssText !== 'position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; z-index: -1;' 
            || canvasDom.width !== (window.screen.width * self.params.clarity)
            || canvasDom.height !==  (window.screen.height * self.params.clarity)) {
            self.init();
          }
        }, 500);
    }
    createCanvas(){
        let oldCanvas = document.getElementById(this.params.id);
        if(oldCanvas){
            oldCanvas.parentNode.removeChild(oldCanvas);
        }

        let body = document.getElementsByTagName('body');
        let width = window.screen.width;
        let height = window.screen.height;
        let canvas = document.createElement('canvas');

        canvas.setAttribute('id', this.params.id);
        canvas.innerHTML = this.params.supportTip;
        canvas.width = width * this.params.clarity;
        canvas.height = height * this.params.clarity;
        canvas.style.cssText= 'position: fixed;width: 100%;height: 100%;left:0;top:0;z-index: -1;';
        body[0].appendChild(canvas);
    }
    fillCanvas(){
        let redundance = 10;
        let canvas = document.getElementById(this.params.id);
        let cxt = canvas.getContext('2d');
        let xCount = window.screen.width * this.params.clarity / this.params.size + redundance;
        let yCount = window.screen.height * this.params.clarity / this.params.size + redundance;
        cxt.rotate(-15*Math.PI/180);
        
        for(let i = 0; i < xCount; i++) {
        for(let j = 0; j < yCount; j++) {
            cxt.fillStyle = this.params.color;
            cxt.font = this.params.fontSize + ' Arial';
            cxt.fillText(this.params.text, this.params.size*(i-redundance/2), j*this.params.size); 
        }
        }
    }
    getRandomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (let i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
}
export default obj;