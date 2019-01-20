class mainScene {
	preload() {
		this.load.image('player', 'assets/player.png');
		this.player = this.physics.add.sprite(100,100,'player');
		this.load.image('coin', 'assets/coin.png');
		this.coin = this.physics.add.sprite(300,300,'coin');
	}

	create() {
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
	}

	hit() {
		this.coin.x = Phaser.Math.Between(100, 600);
		this.coin.y = Phaser.Math.Between(100,300);

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
			this.player.y -= 3;
		} else if(this.arrow.down.isDown) {
			this.player.y += 3;
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