var botao;
class TelaInicial extends Phaser.Scene{
    constructor(){
        super({key:'TelaInicial'})
    }

    preload(){
        this.load.image('botaoIniciar', 'assets/botao.png')
    };

    create(){
        botao = this.add.image(400, 300, 'botaoIniciar')
        botao.setInteractive();
        botao.on('pointerdown', () => {
        console.log('botão clicado')
        this.scene.start('TelaJogo', {})
    
        })
    };
};