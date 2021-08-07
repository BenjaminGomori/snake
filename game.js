let config = {
    width:300,
    height: 350,
    backgroundColor: '#999fff',
    scene: [SceneMain],
    pixelArt: true,
    physics:{
        default: 'arcade',
        arcade:{
            debug: false
        }
    }
}

window.onload = function(){
    let game = new Phaser.Game(config);
}
