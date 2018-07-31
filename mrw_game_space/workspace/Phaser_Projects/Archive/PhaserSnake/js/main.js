window.onload = function(){
    
    snake.phaserGame = new Phaser.Game(snake.baseWidth, snake.baseHeight, Phaser.AUTO);
    
    snake.phaserGame.state.add('Boot', Boot);
    snake.phaserGame.state.add('Preloader', Preloader);
    snake.phaserGame.state.add('Menu', Menu);
    snake.phaserGame.state.add('Game', Game);
    snake.phaserGame.state.add('GameOver', GameOver);
    
    snake.phaserGame.state.start('Boot');
};