class TelaDois extends Phaser.Scene{
    constructor(){
        super({key:'TelaDois'})
    }

    preload(){
        this.load.image('fim', 'assets/game_over_resized.png')
    }

    create(){
        this.add.image(400, 300, 'fim')
        
    }
}