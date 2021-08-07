class SceneMain extends Phaser.Scene {
    constructor(){
        super('playGame');
    }

    preload(){
        this.load.image('snake', 'assets/snake.png');
        this.load.image('snakeHead', 'assets/snakeHead2.png');
        // this.load.image('brick', 'assets/brick_na.png');
        this.load.image('ball', 'assets/ball.png');
    }

    create(){
        // Create the left/right arrow keys
         this.cursorKeys = this.input.keyboard.createCursorKeys();

        // Add the paddle at the bottom of the screen
        // this.snake = this.physics.add.image(200, 400, 'paddle').;
        this.snakeHead = this.physics.add.image(0, 300, 'snakeHead').setImmovable();
        this.food = this.physics.add.image(200, 200, 'ball').setImmovable();  
  

        this.snakeBodyGroup = this.add.group();  
        //this.snakeBodyGroup.add(this.snakeHead);

        this.snakeHead.setVelocityX(100);

        this.physics.add.collider(this.snakeHead, this.food, (snakeHead, food)=>{
            // console.dir(food);
            this.eatingFood(snakeHead, food);
        }, null, this);

        this.physics.add.collider(this.snakeHead, this.snakeBodyGroup, (snakeHead, bodyPart)=>{
            //TODO 
            let newArray = Array.from(this.snakeBodyGroup.children.entries);
            if(newArray.indexOf(bodyPart) > 1){
                alert('You lost');
            }
        }, null, this);

        // this.headTurns = {
        //     x: [], 
        //     y: []
        // }

        this.headTurns = [];

    }

    update(){
       // console.log(this.headTurns.x.length);
       for(let i =0; i< this.headTurns.length;i++){
        let xTurn = this.headTurns[i][0];
        let yTurn = this.headTurns[i][1];

       this.snakeBodyGroup.children.entries.forEach((bodyPart)=>{
            if((bodyPart.x.toFixed(4) ===  xTurn.toFixed(4) || bodyPart.body.x.toFixed(4) ===  xTurn.toFixed(4)) && (bodyPart.y.toFixed(4) ===  yTurn.toFixed(4) || bodyPart.body.y.toFixed(4) ===  yTurn.toFixed(4))){
                    this.headTurns[i][2]++;
                if(this.headTurns[i][3] === 1000 || this.headTurns[i][3] === -1000){
                    bodyPart.setVelocityX(0); 
                    bodyPart.setVelocityY(this.headTurns[i][3]/10);
                }else{
                    bodyPart.setVelocityX(this.headTurns[i][3]); 
                    bodyPart.setVelocityY(0);
                }
                //if all snake parts have gone through this turn remove this turn from the array
                if(this.headTurns[i][2] >= this.snakeBodyGroup.children.size){
                    this.headTurns.splice(i, 1);
                    // console.log('removed: ' + i);
                    // console.log('------------------');
                }

            }
        })
    }


        // Move the paddle left/right when an arrow key is pressed
        if (this.cursorKeys.down.isDown) {
            if(this.snakeHead.body.velocity.y === 0){

                let turnX = this.snakeHead.body.velocity.x > 0? this.snakeHead.x: this.snakeHead.body.x;
                let turnY = this.snakeHead.body.velocity.y > 0? this.snakeHead.y: this.snakeHead.body.y;
               
               
                //[The turn position, number of bodyParts that past that point, and velocity (2000 is to know it is for the y - will actually use 20)]
                let currentTurn = [turnX, turnY, 0, 1000];
                if(this.snakeBodyGroup.children.size > 0 ){
                    this.headTurns.push(currentTurn);
                }
                this.snakeHead.setVelocityX(0);
                this.snakeHead.setVelocityY(100);
                // console.dir(this.headTurns);
            }
        }
        else if (this.cursorKeys.up.isDown) {
            if(this.snakeHead.body.velocity.y === 0){

                let turnX = this.snakeHead.body.velocity.x > 0? this.snakeHead.x: this.snakeHead.body.x;
                let turnY = this.snakeHead.body.velocity.y > 0? this.snakeHead.y: this.snakeHead.body.y;
                
                let currentTurn = [turnX, turnY, 0, -1000];
                if(this.snakeBodyGroup.children.size > 0 ){
                    this.headTurns.push(currentTurn);
                }
                this.snakeHead.setVelocityX(0);
                this.snakeHead.setVelocityY(-100);
                // console.dir(this.headTurns);                
            }
        }
        else if (this.cursorKeys.left.isDown) {
            if(this.snakeHead.body.velocity.x === 0){

                // console.log(this.snakeHead.x);
                // console.log(this.snakeHead.body.x);

                let turnX = this.snakeHead.body.velocity.x > 0? this.snakeHead.x: this.snakeHead.body.x;
                let turnY = this.snakeHead.body.velocity.y > 0? this.snakeHead.y: this.snakeHead.body.y;

                let currentTurn = [turnX, turnY, 0, -100];
                if(this.snakeBodyGroup.children.size > 0 ){
                    this.headTurns.push(currentTurn);
                }
                this.snakeHead.setVelocityY(0);
                this.snakeHead.setVelocityX(-100);
                // console.dir(this.headTurns);
            }
        }
        else if (this.cursorKeys.right.isDown) {
            if(this.snakeHead.body.velocity.x === 0){

                let turnX = this.snakeHead.body.velocity.x > 0? this.snakeHead.x: this.snakeHead.body.x;
                let turnY = this.snakeHead.body.velocity.y > 0? this.snakeHead.y: this.snakeHead.body.y;
                //  x   [turn x position, only head has passed this turn, velocityX]
                let currentTurn = [turnX, turnY, 0, 100];
                if(this.snakeBodyGroup.children.size > 0 ){
                    this.headTurns.push(currentTurn);
                }

                // console.dir(this.headTurns);

                this.snakeHead.setVelocityY(0);
                this.snakeHead.setVelocityX(100);
            }
        }

        if(this.snakeHead.x <= 0 && this.snakeHead.body.velocity.x < 0){
            this.snakeHead.x = 300;
        } else if(this.snakeHead.x >= 300 && this.snakeHead.body.velocity.x > 0){
            this.snakeHead.x = 0;
        } else if(this.snakeHead.y <= 0 && this.snakeHead.body.velocity.y < 0){
            this.snakeHead.y = 350;
        } else if(this.snakeHead.y >= 350 && this.snakeHead.body.velocity.y > 0){
            this.snakeHead.y = 0;
        }

        this.snakeBodyGroup.children.entries.forEach((bodyPart)=>{
            if(bodyPart.x <= 0 && bodyPart.body.velocity.x < 0){
                bodyPart.x = 300;
            } else if(bodyPart.x >= 300 && bodyPart.body.velocity.x > 0){
                bodyPart.x = 0;
            } else if(bodyPart.y <= 0 && bodyPart.body.velocity.y < 0){
                bodyPart.y = 350;
            } else if(bodyPart.y >= 350 && bodyPart.body.velocity.y > 0){
                bodyPart.y = 0;
            }
        })

 

        // for(let i =0; i< this.headTurns.y.length;i++){
        //     let yTurn = this.headTurns.y[i];
        //     // let avoidHead = 0;

        //     this.snakeBodyGroup.children.entries.forEach((bodyPart)=>{
        //     //for(let j = 0; j< this.snakeBodyGroup.children.entries.length; j++){
        //         //let bodyPart = this.snakeBodyGroup.children.entries[j];
        //         //TODO i am assuming i am looping the array in order...
        //        // if(avoidHead !== 0){
                
        //             if(bodyPart.y ===  yTurn[0]){
        //                 bodyPart.setVelocityY(yTurn[2]); //set velocity to what head had during the turn
        //                 bodyPart.setVelocityX(0); 
        //                 yTurn[1]++;  // Now another body part completed the turn

        //                 //if all snake parts have gone through this turn remove this turn from the array
        //                 if(yTurn[1] === this.snakeBodyGroup.children.size){
        //                     this.headTurns.y.splice(i, 1);
        //                 }
        //             }
        //     })
        // }
    }

    eatingFood = (snakeHead, food) => {
        this.repositionFood(food);
        this.snakeGrows(snakeHead);
    }

    repositionFood = (food) => {
        // food.x = -100;
        // food.y = -100;
        let x = Math.random() * (300 - food.width/2);
        let y = Math.random() * (350 - food.height/2);
        x = x > food.width/2 ? x : food.width/2;
        y = y > food.height/2 ? y : food.height/2;
        food.x = x;
        food.y = y;
    }

    snakeGrows = (snakeHead) => {
        let snakeGroup = this.snakeBodyGroup;
        let size = snakeGroup.children.size;
        let tail = size > 0 ? snakeGroup.children.entries[size-1]: snakeHead;
        // let beforeTail = size > 1 ? snakeGroup.children.entries[size-2] : tail;
        // let beforeTailX = beforeTail.x; 
        // let beforeTailY = beforeTail.y; 
        let tailX1 = tail.x; //the right end of the tail 
        let tailY1 = tail.y; //the bottom end of the tail

        let tailX2 = tail.body.x; //the left end of the tail 
        let tailY2 = tail.body.y; //the up end of the tail
        
        // let bodyPartX = tailX >= beforeTailX ? tailX + tail.width: tailX - tail.width;
        //let bodyPartY = tailY;

        let bodyPartX = 0;
        let bodyPartY = 0;
        if(tail.body.velocity.x > 0){
            bodyPartX =  tailX1 - tail.width;
            bodyPartY = tailY1;
        } else if(tail.body.velocity.x < 0){
            bodyPartX =  tailX2 + 3/2 * tail.width;
            bodyPartY = tailY1;
        } else if(tail.body.velocity.y > 0){
            bodyPartX =  tailX1;
            bodyPartY = tailY2 - 1/2 * tail.height;
        } else if(tail.body.velocity.y < 0){
            bodyPartX =  tailX1;
            bodyPartY = tailY1 + tail.height;
        }
        // console.log('snakeHead');
        // console.log(snakeHead);
        // console.log(snakeHead.body.velocity.x);
        // console.log(snakeHead.body.velocity.y);
        let separationX = 0 ;
        let separationY = 0 ;

        if(tail.body.velocity.x !== 0){
            separationY =0;
            if(tail.body.velocity.x > 0){
                separationX = -5;  
            }else{
                separationX = 5;  
            }
        }else{
            separationX =0;
            if(tail.body.velocity.y > 0){
                separationY = -5;  
            }else{
                separationY = 5;  
            }
        }


        bodyPartX += separationX;
        bodyPartY += separationY;

        let snakeBodyPart = this.physics.add.image(bodyPartX, bodyPartY, 'snake').setImmovable();
        snakeBodyPart.body.velocity.x = tail.body.velocity.x;
        snakeBodyPart.body.velocity.y = tail.body.velocity.y;
        snakeGroup.add(snakeBodyPart);
        // console.log('size');
        // console.log(snakeGroup.children.size);
        //TODO What about if tail as at zero (at any edge)?
        //TODO is there a difference between user has y vs x velocity?

    }

    // snakeOutOfBounds = (snakeHead) => {
    //     if(snakeHead.x = 0 && snakeHead.body.velocity.x < 0){
    //         snakeHead.x = 400;
    //     } else if(snakeHead.x = 400 && snakeHead.body.velocity.x > 0){
    //         snakeHead.x = 0;
    //     } else if(snakeHead.y = 0 && snakeHead.body.velocity.y < 0){
    //         snakeHead.y = 450;
    //     } else if(snakeHead.y = 450 && snakeHead.body.velocity.y > 0){
    //         snakeHead.y = 0;
    //     }
    // }
}
