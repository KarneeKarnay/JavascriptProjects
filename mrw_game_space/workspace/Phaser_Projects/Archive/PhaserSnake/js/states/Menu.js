var Menu = function (game){};

Menu.prototype = {
    
    preload:function(){
        
    },
    
    create:function(){
        this.game.add.sprite(0, 0, 'menu');
        
        this.game.add.button(0, 0, 'menu', this.startGame, this);
        
    },
    
    startGame:function(){
        this.game.state.start('Game');
    }
};