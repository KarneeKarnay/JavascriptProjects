/*global Phaser*/

class GameOver extends Phaser.State
{
    preload() {
         
    }
 
    create() {
        this.style = { font: "30px Courier", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.loadingLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "GAME OVER",this.style);
        this.loadingLabel.anchor.setTo(0.5);
        
        this.loadingLabel.inputEnabled=true;
        //add an event listener
        this.loadingLabel.events.onInputDown.add(this.restartGame,this);
    }
 
    restartGame()
    {
    	//restart the game by starting stateMain
    	this.game.state.start("Game");
    }
}