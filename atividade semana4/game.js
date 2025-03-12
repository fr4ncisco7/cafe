var jogador, plataformas, teclado, fundos, painel, bombas;
    var gameOver = false;

class TelaJogo extends Phaser.Scene{
    constructor(){
        super({key:'TelaJogo'})
    
    }

    preload() {
        // Carrega as imagens e spritesheets
        this.load.image('fundo', 'assets/bg_spacenova.png');
        this.load.image('platform', 'assets/platform_resized.png');
        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bomba', 'assets/bomb.png');
    }
   
    create() {
        // Fundo da tela do jogo
        this.add.image(400, 300, 'fundo');
   
        // Grupo de plataformas/adicionando as plataformas
        plataformas = this.physics.add.staticGroup();
   
        // Lista de posições das plataformas
        var platformPositions = [
            { x: 680, y: 370 },
            { x: 50, y: 400 },
            { x: 650, y: 105 },
            { x: 350, y: 255 },
            { x: 350, y: 500 }
        ];
   
        // Cria as plataformas usando a lista de posições
        platformPositions.forEach(function (pos) {
            plataformas.create(pos.x, pos.y, 'platform');
        });
   
        // Criando o jogador
        jogador = this.physics.add.sprite(100, 200, 'player');
        this.physics.add.collider(jogador, plataformas); // Adiciona colisão com plataformas
        jogador.setCollideWorldBounds(false); // Permite sair da tela superior
   
        // Definição das animações do jogador
        // Animação de movimento para a esquerda
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
   
        // Animação de movimento para a direita
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
   
        // Definindo uma imagem para quando ele ficar de frente
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }]
        });
   
        // Captura os controles do teclado
        teclado = this.input.keyboard.createCursorKeys();
   
        // Texto do painel
        painel = this.add.text(16, 16, 'Tempo: 0s', { fontSize: '32px', fill: '#FFFFFF' });
   
        // Atualizar o tempo a cada segundo
        this.time.addEvent({
            delay: 1000, // 1000 ms = 1s
            callback: function () {
                console.log(tempo);
                if (!gameOver) { // Se a variável for falsa, logo o jogo está rodando
                    tempo += 1; // Adiciona o tempo
                    painel.setText('Tempo: ' + tempo + 's'); // Atualiza o tempo na tela
                }
            },
            callbackScope: this,
            loop: true // Mantém rodando
        });
   
        // Criando bombas como objetos dinâmicos
        bombas = this.physics.add.group();
        this.physics.add.collider(bombas, jogador, this.fimJogo, null, this); // Definindo que quando o personagem tocar na bomba chama a função
        this.physics.add.collider(bombas, plataformas); // Adicionando colisão com as plataformas
   
        // Acabando o jogo quando a bomba encosta no jogador
        // Desativando a física do jogo
       
   
        // Criando bombas de acordo com o tempo
        this.time.addEvent({
            delay: 7000, // 7000 = 7 segundos
            callback: function () {
                // Define que a bomba será criada a cada 7 segundos
                if (!gameOver && tempo % 7 === 0) {
                    let bomba = bombas.create(Phaser.Math.Between(100, 200), 0, 'bomba');
                    bomba.setBounce(1); // Faz a bomba quicar
                    bomba.setVelocity(Phaser.Math.Between(-200, 200), 500); // Dá uma velocidade inicial aleatória
                }
            },
            callbackScope: this,
            loop: true // Mantém criando bombas a cada 2 segundos
        });
    }
   
    update() {
        // Movimentação lateral
        if (teclado.left.isDown) {
            jogador.setVelocityX(-160);
            jogador.anims.play('left', true);
   
            // Movimentação Lateral
        } else if (teclado.right.isDown) {
            jogador.setVelocityX(160);
            jogador.anims.play('right', true);
   
            // Quando ele tiver parado
        } else {
            jogador.setVelocityX(0);
            jogador.anims.play('turn');
        }
   
        // Pulo apenas quando estiver tocando o chão
        if (teclado.up.isDown && jogador.body.touching.down) {
            jogador.setVelocityY(-330);
        }
   
        // Mantém o jogador/bombas dentro do mundo -> faz aparecer do lado oposto
        this.physics.world.wrap(jogador, 0);
        this.physics.world.wrap(bombas, 0);
    }
   
    fimJogo(jogador, bomba) {
       this.physics.pause();
       jogador.anims.play('turn');
       jogador.anims.pause();
       jogador.setTint(0xff0000); // Deixando o jogador vermelho
       this.scene.start('TelaDois', {});
   }
} // Variáveis
