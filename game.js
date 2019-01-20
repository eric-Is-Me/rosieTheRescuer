class mainScene {
	preload() {
		this.load.image('player', 'assets/player.png');
		this.player = this.physics.add.sprite(100,100,'player');
		this.load.image('coin', 'assets/coin.png');
		this.coin = this.physics.add.sprite(300,300,'coin');
        this.load.tilemapTiledJSON('map1', 'map.json');
        this.load.image('tiles1', 'assets/map1.png');
	}

	create() {
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.player.body.gravity.y = 500;
        this.player.body.checkCollision.up = true;
        this.player.body.checkCollision.right = true;
        this.player.body.checkCollision.left = true;
        
        var map1 = this.make.tilemap({key: 'map1'});
        var tileset1 = map1.addTilesetImage('level1', 'tiles1');
        var layer1 = map1.createStaticLayer('World1', tileset1, 0, 0);
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
            this.player.body.velocity.y = -300;
        }
	}
}
var game = new Phaser.Game({
    width: 4000,
    height: 700,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade'},
    parent: 'game'
});