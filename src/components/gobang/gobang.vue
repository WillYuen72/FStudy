<template>
    <canvas id="canva"  width="450px" height="450px"></canvas>
</template>

<script>
export default {
    name : 'Gobang',
    data(){
        return {
        over : false,
        me : true,
        _nowi : 0,
        _nowj : 0,
        _myWin : [],
        _compWin : [],
        backAble :false,
        returnAble : false,
        resultTxt : '',
        chressBord : [],
        myWin : [],
	    computerWin : [],
        wins : [],
        counts : 0,
        canva : Object,
		ctx : null,
		myScore : [],
		computerScore : [],
		max : 5,
		u : 0,
		v : 0
        }
	},
	created(){
		for(var i=0;i<15;i++){
			this.chressBord[i]=[];
			this.wins[i]=[];
			this.myScore[i] = [];
			this.computerScore[i] = [];
			for(var j=0;j<15;j++){
				this.chressBord[i][j]=0;
				this.wins[i][j]=[];
				this.myScore[i][j] = 0;
				this.computerScore[i][j] = 0;
			}
		}
		for (var i = 0; i < 15; i++) {
				for (var j = 0; j <11; j++) {
					for (var k = 0; k < 5; k++) {
						this.wins[i][j+k][this.counts] = true;
					}
					this.counts++;
				}
			}
			 //竖线赢法
			for (var i = 0; i < 15; i++) {
				for (var j = 0; j <11; j++) {
					for (var k = 0; k < 5; k++) {
						this.wins[j+k][i][this.counts] = true;
					}
					this.counts++;
				}
			}
			//正斜线赢法
			for (var i = 0; i < 11; i++) {
				for (var j = 0; j <11; j++) {
					for (var k = 0; k < 5; k++) {
						this.wins[i+k][j+k][this.counts] = true;
					}
					this.counts++;
				}
			}
			//反斜线赢法
			for (var i = 0; i < 11; i++) {
				for (var j = 14; j > 3; j--) {
					for (var k = 0; k < 5; k++) {
						this.wins[i+k][j-k][this.counts] = true;
					}
					this.counts++;
				}
			}
		for(var i=0;i<15;i++){
			this.chressBord[i]=[];
			this.wins[i]=[];
			this.myScore[i] = [];
			this.computerScore[i] = [];
			for(var j=0;j<this.counts;j++){
				this.chressBord[i][j]=0;
				this.wins[i][j]=[];
				this.myScore[i][j] = 0;
				this.computerScore[i][j] = 0;
			}
		}
	},
    mounted(){
        this.canva = document.querySelector('#canva');
        this.ctx = this.canva.getContext('2d');
        this.ctx.strokeStyle='#000';
        // const i = Number(1);
        // const j = Number(2);
        // this.ctx.arc(15 +i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
        // this.ctx.closePath();
        // const gradient =this.ctx.createRadialGradient(15 + i * 30
		// 		+ 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 -
        //         2, 0)
        // if(!this.me){
        //         gradient.addColorStop(0,'#0a0a0a');
        //         gradient.addColorStop(1,'#636766');
        //     }else{
        //         gradient.addColorStop(0,'#d1d1d1');
        //         gradient.addColorStop(1,'#f9f9f9');
        //     }
        // this.ctx.fillStyle = gradient;
        // this.ctx.fill();
        this.drawChessBoard();
        this.canva.onclick = (e)=>{
				if(this.over){
					return;
				}
				if(!this.me){
					return;
                }
                console.log(e);console.log(this.ctx);
				var x = e.offsetX;
				var y = e.offsetY;
				var i = Number(Math.floor(x / 30));
                var j = Number(Math.floor(y / 30));
				this._nowi = i;
                this._nowj = j;
				console.log(i,j);
				if(this.chressBord[i][j]==0){
                    console.log(2222222222);
					this.oneStep(i,j,this.me);
					this.chressBord[i][j] = 1; //我，已占位置
					for (var k = 0; k < this.counts; k++) { // 将可能赢的情况都加1
						if(this.wins[i][j][k]){
							 // debugger;
							this.myWin[k]++;
							this._compWin[k] = this.computerWin[k];
							this.computerWin[k] = 6;
							if(this.myWin[k] == 5){
                                alert('恭喜，你赢了！');
								this.over = true;
							}
						}
					}
					console.log('this over'+this.over);
					if(!this.over){
						this.me = !this.me;
						this.computerAI();
					}
				}
        };
    },
    methods:{
        //绘画棋盘
        drawChessBoard(){
            for (var b = 0; b < 15; b++) {
            this.ctx.moveTo(15 + (b * 30) , 15);
            this.ctx.lineTo(15 + (b * 30) , 435);
            this.ctx.stroke();
            this.ctx.moveTo(15 , 15 + (b * 30));
            this.ctx.lineTo(435 , 15 + (b * 30));
            this.ctx.stroke();
	}
        },
        oneStep(i,j,mes){
            console.log(11111111111);
                this.ctx.beginPath();
				this.ctx.arc(15 +(i * 30), 15 + (j * 30), 13, 0, 2 * Math.PI);// 画圆
				this.ctx.closePath();
				//渐变
				const gradient = this.ctx.createRadialGradient(15 + i * 30
				+ 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 -
				2, 0);
				if(mes){
					gradient.addColorStop(0,'#0a0a0a');
					gradient.addColorStop(1,'#636766');
				}else{
					gradient.addColorStop(0,'#d1d1d1');
					gradient.addColorStop(1,'#f9f9f9');
				}
				this.ctx.fillStyle = gradient;
                this.ctx.fill();
        },
        computerAI(){
				this.u=this._nowi+1;
				this.v=this._nowj+1;
				for (var i = 0; i < 15; i++) {
					for (var j = 0; j < 15; j++) {
						if(this.chressBord[i][j] == 0){
							for (var k = 0; k < this.counts; k++) {
								if(this.wins[i][j][k]== 0){
									if(this.myWin[k] == 1){
										this.myScore[i][j] += 200;
									}else if(this.myWin[k] == 2){
										this.myScore[i][j] += 400;
									}
									else if(this.myWin[k] == 3){
										this.myScore[i][j] += 2000;
									}
									else if(this.myWin[k] == 4){
										this.myScore[i][j] += 10000;
									}
									if(this.computerWin[k] == 1){
										this.computerScore[i][j] += 220;
									}else if(computerWin[k] == 2){
										this.computerScore[i][j] += 420;
									}
									else if(this.computerWin[k] == 3){
										this.computerScore[i][j] += 2100;
									}
									else if(this.computerWin[k] == 4){
										this.computerScore[i][j] += 20000;
									}
								}
							}
							console.log( this.computerScore[i][j]+'&&'+this.max);
							if(this.myScore[i][j] > this.max){
								this.max = this.myScore[i][j];
								this.u = i;
								this.v = j;
							}else if(this.myScore[i][j] == this.max){
								if(this.computerScore[i][j]>this.computerScore[this.u][this.v]){
									this.u = i;
									this.v = j;
								}
							}
							if(this.computerScore[i][j] > this.max){
								this.max = this.computerScore[i][j];
								this.u = i;
								this.v = j;
							}else if(this.computerScore[i][j] == this.max){
								if(this.myScore[i][j]>this.myScore[this.u][this.v]){
									this.u = i;
									this.v = j;
								}
							}
							console.log( 'will yuen');
						}
					}
				console.log( 'u '+this.u);
				console.log( 'v '+this.v);
                }
                console.log( 'myScore '+this.myScore);
				console.log( 'computerScore '+this.computerScore);
				console.log( 'u'+this.u);
                console.log( 'v'+this.v);
				this._compi = this.u;
				this._compj = this.v;
				this.oneStep(this.u,this.v,false);
                this.chressBord[this.u][this.v] = 2; //计算机占据位置
				for (var k = 0; k < this.counts; k++) {
					if(this.wins[this.u][this.v][k]){
						this.computerWin[k]++;
						this._myWin[k] = this.myWin[k];
						this.myWin[k] = 6; //这个位置对方不可能赢了
						if(this.computerWin[k] == 5){
							alert('o(╯□╰)o，计算机赢了，继续加油哦！');
							this.over = true;
						}
					}
				}
				if(!this.over){
					this.me = !this.me;
				}
				this.backAble = true;
				// this.returnAble = false;
				// var hasClass = new RegExp('unable').test('' +
				// returnbtn.className + '');
				// if(hasClass) {
				// 	returnbtn.className += '' + 'unable';
				// }
        },
    }
}
// }
</script>

<style>
canvas {
    display: block;
    margin: 50px auto;
    box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
    cursor: pointer;
    background-color: #D2691D
}
.btn-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.btn-wrap div {
    margin: 0 10px;
}
div>span {
    display: inline-block;
    padding: 10px 20px;
    color: #FFFFFF;
    background-color: #EE82ED;
    border-radius: 5px;
    cursor: pointer;
}
div.unable span {
    background: #D6D6D4;
    color: #ADACAA;
}
#result-wrap {
    text-align: center;
}
</style>
