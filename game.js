class mainScene {
	preload() {
        //this.load.tilemapTiledJSON('tilemap', 'assets/level1.json');
		this.load.image('rosie', 'assets/rosie.png');
		this.load.image('coin', 'assets/coin.png');
        //this.load.image('tiles1', 'assets/PNG/jungle_pack_05.png');
        this.load.image('rosie_r_stand', 'assets/rosie_standing_right.png');
        this.load.image('rosie_l_stand', 'assets/rosie_standing_left.png');
        this.load.image('rosie_r_walk', 'assets/rosie_walking_right.png');
        this.load.image('rosie_l_walk', 'assets/rosie_walking_left.png');
	}

	create() {
		this.score = 0;
		let style = { font: '20px Arial', fill: '#fff' };
		this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.player = this.physics.add.sprite(100,100,'rosie');
		this.coin = this.physics.add.sprite(300,300,'coin');
        this.player.body.gravity.y = 500;
        this.player.body.checkCollision.up = true;
        this.player.body.checkCollision.right = true;
        this.player.body.checkCollision.left = true;
        
        //var map = this.add.tilemap('tilemap');
        //map.addTilesetImage('GroundLayer', 'tiles1');
        
        /*this.map = this.add.tilemap('tilemap');
        this.map.addTilesetImage('centerGround', 'tiles1');*/
        
        //var groundLayer = map.createStaticLayer('GroundLayer');
        //console.log(groundLayer);
        //map.setCollisionBetween(1, 100, true, 'GroundLayer');
        
        //groundLayer.resizeWorld();
        
        //this.game.camera.follow(this.player);
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
        //this.game.physics.arcade.collide(this.player, this.groundLayer);
        
		if(this.physics.overlap(this.player, this.coin)) {
			this.hit();
		}
        this.arrow = this.input.keyboard.createCursorKeys();
        
		if(this.arrow.right.isDown) {
			this.player.x += 3;
            if(this.player.x >= 1175)
                this.player.x = 1175;
		} else if(this.arrow.left.isDown) {
			this.player.x -= 3;
            if(this.player.x <= 25)
                this.player.x = 25;
		}
        if(this.arrow.up.isDown) {
            this.player.body.velocity.y = -300;
            if(this.player.y <= 40) {
                this.player.body.velocity.y = 0;
                this.player.y = 30;
            }
        }
        // Spacebar key pressed
        if(this.key.isDown) {
            console.log('Spacebar has been pressed!');
        }
	}
}

new Phaser.Game({
    width: 1200,
    height: 700,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: { default: 'arcade'},
    parent: 'game'
});