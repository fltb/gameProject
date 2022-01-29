import { Entity } from "./entity.js";
import { config } from "../config/config.js";

export default class Player extends Entity {

    constructor(scene, x, y, texture, infos) {
        infos.type = "player";
        super(scene, x, y, texture, infos);

        // remember WASD is not always the "WASD" key on keyboard
        this.W = this.game.input.keyboard.addKey(Phaser.Keyboard[config.upKey]);
		this.A = this.game.input.keyboard.addKey(Phaser.Keyboard[config.leftKey]);
		this.S = this.game.input.keyboard.addKey(Phaser.Keyboard[config.rightKey]);
		this.D = this.game.input.keyboard.addKey(Phaser.Keyboard[config.downKey]);
    }

    update() {
        if (this.W.isDown) {
            this.moveUp();
        }
        if (this.S.isDown) {
            this.moveDown();
        }
        if (this.A.isDown) {
            this.moveLeft();
        }
        if (this.D.isDown) {
            this.moveRight();
        }
    }
}