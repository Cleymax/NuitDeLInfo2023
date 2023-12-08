let cursors;

let devArrayText;
let scoreText;
let yearText;
let goalText;
let nextPieceImage;
let gameOverLetters;
let winLetters;
let tryAgnLetters;
let btnRetry;
let backgroundMenu;
let instructions;

let frameInterval = 300;
let actualFrameInterval = null;
let map = null;
let ps = null;
let combos = 0;
let score = 404;
let level = 0;
let year = 2023;
const goal = 0;
let gameOver = false;
let win = false;

class GameScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.menuGameOver = this.add.group();
    this.menuWin = this.add.group();
    this.imageGroup = this.add.group();
    this.load.image("background", "./assets/whiteBackground2.png");
    this.load.image("backgroundM", "./assets/background.jpg");
    var rect = this.add
      .rectangle(MAP_MARGIN, MAP_MARGIN, MAP_WIDTH, 250, 0x000000)
      .setOrigin(0, 0);
    rect.setDepth(10);

    this.load.image("orange", "./assets/orange.png");
    this.load.image("red", "./assets/red.png");
    this.load.image("purple", "./assets/purple.png");
    this.load.image("blue", "./assets/blue.png");
    this.load.image("dark_blue", "./assets/dark_blue.png");
    this.load.image("yellow", "./assets/yellow.png");
    this.load.image("green", "./assets/green.png");

    this.load.image("sunTile", "./assets/sunTile.jpg");
    this.load.image("fuelTile", "./assets/fuelTile.jpg");
    this.load.image("bikeTile", "./assets/bikeTile.jpg");
    this.load.image("eolTile", "./assets/eolTile.jpg");
    this.load.image("lightTile", "./assets/lightTile.jpg");
    this.load.image("plantTile", "./assets/plantTile.jpg");
    this.load.image("recycleTile", "./assets/recycleTile.jpg");
    this.load.image("grayTile", "./assets/grayTile.jpg");
  }

  create() {
    map = new Map(this);
    // this.add
    //   .image(0, 0, "backgroundM")
    //   .setOrigin(0, 0)
    //   .setDisplaySize(window.innerWidth, window.innerHeight);
    this.add.image(10, 10, "background").setOrigin(0, 0);
    ps = new PieceSet(this);
    map.mapDrawer();

    cursors = this.input.keyboard.createCursorKeys();

    this.drawGui();
    //this.drawDeveloperMap(); //matrice des position

    this.frame();
  }

  update() {
    if (!gameOver) {
      document.addEventListener("keydown", this.keyDownHandler, false);
      document.addEventListener("keyup", this.keyUpHandler, false);
    }
  }

  frame() {
    setTimeout(() => {
      if (this.isGameOver()) {
        return;
      }

      if (this.isWin()) {
        return;
      }
      this.downCicle();
      map.comboVerify();
      //devArrayText.setText(map.getMap()); //va avec la matrice
      map.mapDrawer(this);
      this.frame();
    }, frameInterval);
  }

  keyDownHandler(event) {
    if (event.keyCode == 39) {
      // RIGHT ARROW
      ps.move("right");
    } else if (event.keyCode == 37) {
      // LEFT ARROW
      ps.move("left");
    }
    if (event.keyCode == 32) {
      // SPACE
      ps.turn("right");
    } else if (event.keyCode == 40) {
      // DOWN
      if (frameInterval != 20) actualFrameInterval = frameInterval;
      frameInterval = 20;
    }
  }

  keyUpHandler(event) {
    if (event.keyCode == 40) {
      frameInterval = actualFrameInterval;
    }
  }

  isGameOver() {
    for (var i = 0; i < map.xArrayLength; i++) {
      var value = map.getMapPosition(4, i);
      if (value == 3 ) {
        gameOver = true;
        this.drawGameOverScreen();
        return true;
      }
    }
    return false;
  }

  isWin() {
    if (win == true ) {
      win = false;
      this.drawWinnerScreen();
      return true;
    }
    return false;
  }

  drawWinnerScreen() {
    const MENU_WIN_WIDTH = 350;
    const MENU_WIN_Y = 600;

    winLetters = this.add.text(
      MENU_WIN_WIDTH / 2 - 20,
      MENU_WIN_Y + 10,
      "Félicitation vous \navez perdu votre temps ! \n"+"("+score+" Kg C02 non émie )",
      { font: "bold 25px Geneva", color: "black" }
    );
    tryAgnLetters = this.add.text(
      MENU_WIN_WIDTH / 2,
      MENU_WIN_Y + 80,
      "Voulez vous continuez \na perdre votre temps?",
      { font: "bold 15px Geneva", color: "black" }
    );
    backgroundMenu = this.add
      .rectangle(
        MAP_WIDTH / 2 - MENU_WIN_WIDTH / 2,
        580,
        MENU_WIN_WIDTH,
        180,
        0xffffff
      )
      .setOrigin(0, 0);
    btnRetry = this.add
      .rectangle(MAP_WIDTH / 2 - 125, 670, 250, 50, 0xdedede)
      .setOrigin(0, 0);

    this.menuWin.add(tryAgnLetters);
    this.menuWin.add(backgroundMenu);
    this.menuWin.add(btnRetry);
    this.menuWin.add(winLetters);

    tryAgnLetters.setInteractive({ useHandCursor: true });
    tryAgnLetters.on("pointerdown", () => this.nextLevel());
    // tryAgnLetters.on('pointerover', () => this.restart() );
    winLetters.setDepth(12);
    tryAgnLetters.setDepth(12);
    
  }

  drawGameOverScreen() {
    const MENU_GAMEOVER_WIDTH = 350;
    const MENU_GAMEOVER_Y = 600;

    gameOverLetters = this.add.text(
      MENU_GAMEOVER_WIDTH / 2 - 20,
      MENU_GAMEOVER_Y + 10,
      "Game Over  \n"+"("+score+" Kg C02 non émie )",
      { font: "bold 25px Geneva", color: "black" }
    );
    tryAgnLetters = this.add.text(
      MENU_GAMEOVER_WIDTH / 2,
      MENU_GAMEOVER_Y + 80,
      "Try Again",
      { font: "bold 15px Geneva", color: "black" }
    );
    backgroundMenu = this.add
      .rectangle(
        MAP_WIDTH / 2 - MENU_GAMEOVER_WIDTH / 2,
        580,
        MENU_GAMEOVER_WIDTH,
        180,
        0xffffff
      )
      .setOrigin(0, 0);
    btnRetry = this.add
      .rectangle(MAP_WIDTH / 2 - 125, 670, 250, 50, 0xdedede)
      .setOrigin(0, 0);

    this.menuGameOver.add(tryAgnLetters);
    this.menuGameOver.add(backgroundMenu);
    this.menuGameOver.add(btnRetry);
    this.menuGameOver.add(gameOverLetters);

    tryAgnLetters.setInteractive({ useHandCursor: true });
    tryAgnLetters.on("pointerdown", () => this.restart());
    // tryAgnLetters.on('pointerover', () => this.restart() );
    gameOverLetters.setDepth(12);
    tryAgnLetters.setDepth(12);
  }

  nextLevel() {
    this.menuWin.clear(true);

    frameInterval = 300;
    combos = 0;
    score = 404;
    level = level+1;
    year = year + 1;
    gameOver = false;

    map = null;
    map = new Map(this);
    ps = new PieceSet(this);

    yearText.setText("Year: " + (year + level) + " (level " + level + " ");
    scoreText.setText("Kg C02 Actuelle : " + score);
    goalText.setText("Objectif : " + goal);


    this.frame();
  }

  restart() {
    this.menuGameOver.clear(true);

    frameInterval = 300;
    combos = 0;
    score = 404;
    level = 0;
    year = 2023;
    gameOver = false;

    map = null;
    map = new Map(this);
    ps = new PieceSet(this);

    yearText.setText("Year: " + (year + level) + " (level " + level + " ");
    scoreText.setText("Kg C02 Actuelle : " + score);
    goalText.setText("Objectif : " + goal);
    this.frame();
  }

  downCicle() {
    if (map.isDownLimit() == true) {
      map.tearDownPiece();
      ps.createAnotherPiece();
      return true;
    }

    ps.downCicle();
    map.downCicle();
    return false;
  }

  addNextPieceImage(next_piece_name) {
    if (nextPieceImage != null) nextPieceImage.remove();
    nextPieceImage = this.add.image(20, 80, next_piece_name).setOrigin(0, 0);
    nextPieceImage.setDepth(12);
  }

  drawGui() {
    var guiRect = this.add
      .rectangle(20, 80, 110, 100, 0xffffff)
      .setOrigin(0, 0);
    guiRect.setDepth(12);
    this.addNextPieceImage(ps.next_piece_name);
    yearText = this.add.text(
      150,
      80,
      "Année : " + (year + level) + " (level " + level + " )",
      {
        font: "bold 20px Geneva",
        color: "white",
      }
    );
    scoreText = this.add.text(150, 120, "Kg C02 Actuelle : " + score, {
      font: "bold 20px Geneva",
      color: "white",
    });
    goalText = this.add.text(150, 160, "Objectif : " + goal /*+ " Kg C02"*/, {
      font: "bold 20px Geneva",
      color: "white",
    });
    yearText.setDepth(12);
    scoreText.setDepth(12);
    goalText.setDepth(12);

    instructions = this.add.text(
      50,
      220,
      "< Arrows to move and Space to turn >",
      { font: "bold 20px Geneva", color: "white" }
    );
    instructions.setDepth(12);
  }

  drawDeveloperMap() {
    devArrayText = this.add.text(DEV_X, DEV_Y + 250, map.getMap(), {
      font: "bold 15px Geneva",
      color: "white",
    });
  }

  incrSpeed() {
    combos++;
    if (combos % 2 == 0) {
      level++;
      frameInterval -= 30;
    }
    score -= 40;

    if (score <= 0) {
      score = 0;
      win = true;
    }

    yearText.setText("Year: " + (year + level) + " (level " + level + " ");
    scoreText.setText("Kg C02 Actuelle : " + score);
    goalText.setText("Objectif : " + goal);
  }
}

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth / 3.7, // Utilisez la largeur de la fenêtre
  height: window.innerHeight,
  backgroundColor: "#ff0000",
  // width: "70%",
  // height: "140%",
  height: "139%",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: GameScene,
};

var game = new Phaser.Game(config);
