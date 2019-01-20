class mainScene {
	preload() {
		this.load.image('rosie', 'assets/rosie.png');
		this.load.image('coin', 'assets/coin.png');
	}

	create() {
        this.player = this.physics.add.sprite(100,100,'rosie');
        this.coin = this.physics.add.sprite(300,300,'coin');
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.player.body.gravity.y = 500;
        this.player.body.checkCollision.up = true;
        this.player.body.checkCollision.right = true;
        this.player.body.checkCollision.left = true;
        
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	}

	hit() {
		this.coin.x = Phaser.Math.Between(100, 600);
		this.coin.y = Phaser.Math.Between(100, 300);

		this.score += 10;

		this.scoreText.setText('score: ' + this.score);

		this.tweens.add({
			targets: this.player,
			duration: 200,
			scaleX: 2.0,
			scaleY: 2.0,
			yoyo: true,
		});
	}

	update() {
		if(this.physics.overlap(this.player, this.coin)) {
			this.hit();
		}
        this.arrow = this.input.keyboard.createCursorKeys();
        
		if(this.arrow.right.isDown) {
			this.player.x += 3;
		} else if(this.arrow.left.isDown) {
			this.player.x -= 3;
		}
                
        if(this.arrow.up.isDown) {
            this.player.body.velocity.y = -300;
        }
        // Spacebar key pressed
        if(this.key.isDown) {
            console.log('Spacebar has been pressed!');
        }
	}
}
new Phaser.Game({
    width: 4000,
    height: 700,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade'},
    parent: 'game'
});