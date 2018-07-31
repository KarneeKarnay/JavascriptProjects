var Preloader = function (game){};

Preloader.prototype = {
    
    preload:function(){
        
        this.game.load.image('menu', './assets/images/menu.png');
        this.game.load.image('snake', './assets/images/snake.png');
        this.game.load.image('apple', './assets/images/apple.png');
        this.game.load.image('gameover', './assets/images/gameover.png');
        
    },
    
    create:function(){
        
        this.game.state.start('Menu');
    }
};