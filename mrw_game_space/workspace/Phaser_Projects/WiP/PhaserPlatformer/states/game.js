/*global Phaser*/

class Game extends Phaser.State
{
    preload() {
        
        this.loadingLabel = this.game.add.text(80,150, 'loading...', {font: '30px Courier', fill: '#000'});
         
    }
 
    create() {
        
    }
 
    update() {
        
    }
}