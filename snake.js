function snake(){
    this.sencen=document.querySelector('.sace');
    this.snake=['4_0','5_0','6_0'];
    this.porstion=40;
    this.food='';
    this.flog={'4_0':true,'5_0':true,'6_0':true};

}
snake.prototype={
      start:function () {
          this.dronlin();
          this.dronsnke();
          this.move();
          this.key();
          this.flood();
      },
      dronlin:function () {
          for(let i=0;i<20;i++){
              for(let j=0;j<20;j++){
                  this.sencen.innerHTML+=`
                   <div class="block" id="${i}_${j}"></div>
                  `
              }
          }
      },
      dronsnke:function () {
          this.snake.forEach((element,index)=>{
              document.getElementById(element).classList.add('hot');
          })

      },
      move:function() {
          this.t=setInterval(function(){
              let old = this.snake[this.snake.length - 1];
              let arr = old.split("_");
              let newa = ``;
              if(this.porstion==37){
                  newa=`${arr[0]*1}_${arr[1]*1-1}`;
              }else if(this.porstion==38){
                  newa=`${arr[0]*1-1}_${arr[1]*1}`;
              }else if(this.porstion==39){
                  newa=`${arr[0]*1}_${arr[1]*1+1}`;
              }else if(this.porstion==40){
                  newa=`${arr[0]*1+1}_${arr[1]*1}`;
              }
              //判断边界
              if(arr[1]<0||arr[1]>19||arr[0]<0||arr[0]>19||this.flog[newa]){
                  clearInterval(this.t);
                  alert('gameover');
              }
              //判断吃foold
              if(newa==this.food){
                  this.snake.push(newa);
                  this.flog[newa]=true;
                  document.getElementById(this.food).style.background='';
                   this.flood();

              }
                  this.snake.push(newa);
                  this.flog[newa]=true;
                  let weibu=this.snake.shift();
                  delete this.flog[weibu];
                  document.getElementById(weibu).classList.remove('hot');
                  this.dronsnke();

          }.bind(this),200);
      },
    key:function(){
        document.onkeydown =function(e){
            let keys=e.keyCode;
            if(Math.abs(keys-this.porstion)==2){
                return
            }
            this.porstion=keys;
        }.bind(this)
    },
    flood:function(){
        let x=Math.floor(Math.random()*20);
        let y=Math.floor(Math.random()*20);
        do{
            x=Math.floor(Math.random()*20);
            y=Math.floor(Math.random()*20);
        }while(this.flog[`${x}_${y}`]);
        this.food=`${x}_${y}`;
        document.getElementById(this.food).style.background='url("2.png") no-repeat center/cover';
        document.getElementById(this.food).style.borderRadius='50%';
    }

}
