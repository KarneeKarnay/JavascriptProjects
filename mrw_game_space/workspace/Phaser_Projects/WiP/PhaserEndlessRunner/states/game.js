/*global Phaser*/

class Game extends Phaser.State
{
    preload() {
        
        this.style = { font: "30px Courier", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.loadingLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "loading...",this.style);
        this.loadingLabel.anchor.setTo(0.5);
         
    }
 
    create() {
        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');
    
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();
    
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
    
        // Here we create the ground.
        this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
    
        this.power = 0;
        
        //add the hero in 
        this.hero = this.game.add.sprite(32, this.game.world.height - 89, "hero");
        //add the power bar just above the head of the hero
        this.powerBar = this.game.add.sprite(this.hero.x + 25, this.hero.y - 25, "star");
        this.powerBar.width = 0;
        //add the clouds
        this.clouds = this.game.add.sprite(0, 0, "clouds");
        this.clouds.width = this.game.width;
        //start the physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the hero for physics
        this.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        
        this.hero.body.gravity.y = 200;
        this.hero.body.collideWorldBounds = true;
        //this.hero.body.bounce.set(0, 0.2);
        
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
        //record the initial position
        this.startY = this.hero.y;
    
        //set listeners
        this.game.input.onDown.add(this.mouseDown, this);
        
        this.blocks = this.game.add.group();
        this.makeBlocks();
        this.makeBird();
    }
 
    mouseDown () 
    {
        if (this.hero.y != this.startY) {
            return;
        }
        this.game.input.onDown.remove(this.mouseDown, this);
        this.timer = this.game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
        this.game.input.onUp.add(this.mouseUp, this);
    }
    mouseUp () {
        this.game.input.onUp.remove(this.mouseUp, this);
        this.doJump();
        this.game.time.events.remove(this.timer);
        this.power = 0;
        this.powerBar.width = 0;
        this.game.input.onDown.add(this.mouseDown, this);
    }
    increasePower() {
        this.power++;
        this.powerBar.width = this.power;
        if (this.power> 50) {
            this.power = 50;
        }
    }
    doJump() {
        this.hero.body.velocity.y = -this.power * 12;
    }
    
    makeBlocks() {
        this.blocks.removeAll();
        this.wallHeight=this.game.rnd.integerInRange(1, 4);
        for (var i = 0; i < this.wallHeight; i++) {
            this.block = this.game.add.sprite(0, (this.game.height-89)-i * 25 , "block");
            this.blocks.add(this.block);
        }
        
        this.blocks.x = this.game.width - this.blocks.width;
        //Loop through each block
        //and apply physics
        var container = this;
        this.blocks.forEach(function(block) {
            //enable physics
            container.game.physics.enable(block, Phaser.Physics.ARCADE);
            //set the x velocity to -160
            block.body.velocity.x = -150;
            //apply some gravity to the block
            //not too much or the blocks will bounce
            //against each other
            block.body.gravity.y = 4;
            //set the bounce so the blocks
            //will react to the runner
            block.body.bounce.set(1, 1);
        });
    }
    
    makeBird() {
        //if the bird already exists 
        //destroy it
        if (this.bird) {
            this.bird.destroy();
        }
        //pick a number at the top of the screen
        //between 10 percent and 40 percent of the height of the screen
        var birdY = this.game.rnd.integerInRange(this.game.height * .1, this.game.height * .4);
        //add the bird sprite to the game
        this.bird = this.game.add.sprite(this.game.width + 100, birdY, "bird");
        //enable the sprite for physics
        this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
        //set the x velocity at -200 which is a little faster than the blocks
        this.bird.body.velocity.x = -200;
        //set the bounce for the bird
        this.bird.body.bounce.set(2, 2);
    }
    
    update() {
        this.game.physics.arcade.collide(this.hero, this.ground);

        //
        //collide the hero with the blocks
        //
        this.game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);
        //
        //colide the blocks with the ground
        //
        this.game.physics.arcade.collide(this.ground, this.blocks);
        //
        //when only specifying one group, all children in that
        //group will collide with each other
        //
        this.game.physics.arcade.collide(this.blocks);
        //colide the hero with the bird
        //
        this.game.physics.arcade.collide(this.hero, this.bird, this.delayOver, null, this);
        
        //
        //get the first child
        var fchild = this.blocks.getChildAt(0);
        //if off the screen reset the blocks
        if (fchild.x < -this.game.width) {
            console.log("here");
            this.makeBlocks();
        }
        
        if (this.bird.x < 0) {
            this.makeBird();
        }
        
        if (this.hero.y < this.hero.height) {
            this.hero.body.velocity.y=200;
            this.delayOver();
         }
    }
    
    delayOver() {
        this.clickLock = true;
        this.game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
    }
    gameOver() {
        this.game.state.start("GameOver");
    }
    
}