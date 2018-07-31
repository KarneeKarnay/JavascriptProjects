/*global Phaser*/

class PreLoad extends Phaser.State
{
    preload() {
        
        this.style = { font: "30px Courier", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.loadingLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "loading...",this.style);
        this.loadingLabel.anchor.setTo(0.5);
        this.game.load.image('sky', 'states/images/game/sky.png');
        this.game.load.image('ground', 'states/images/game/platform.png');
        this.game.load.image('star', 'states/images/game/star.png');
        this.game.load.spritesheet('dude', 'states/images/game/dude.png', 32, 48);
         
    }
 
    create() {
        this.state.start('Game');
    }

}