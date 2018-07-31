var Boot = function (game){};

Boot.prototype = {
    
    preload:function(){
        
    },
    
    create:function(){
        
        this.game.stage.smooth = false;
        this.game.scale.minWidth = snake.baseWidth;
        this.game.scale.minHeight = snake.baseHeight;
        this.game.scale.maxWidth = snake.baseWidth * snake.scale;
        this.game.scale.maxHeight = snake.baseHeight * snake.scale;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.game.canvas.oncontextmenu = function(e) {
            e.preventDefault();
        };
        
        this.game.state.start('Preloader');
    },
};