import { config } from "../config/config.js";
import { Player } from "../entity/player/player.js";
import { WorldManager } from "../world/WorldManager.js";

export class PlayerManager {
    
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {WorldManager} worldManager 
     * @param {Player} player 
     */
    constructor(scene, worldManager, player) {
        this.scene = scene;
        this.worldManager = worldManager;
        this.player = player;

        // remember move is not always the "WASD" key on keyboard
        scene.input.mouse.disableContextMenu();
        this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.upKey]);
        this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.downKey]);
        this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.leftKey]);
        this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[config.rightKey]);

        this.player.addToPreUpdate(this.update.bind(this));

        this.pointer = this.scene.input.activePointer;

        const pfx = this.pointer.x - this.scene.scale.width / 2 + this.player.x,
              pfy = this.pointer.y - this.scene.scale.height / 2 + this.player.y;
        this.pointerFollower = this.scene.add.circle(pfx, pfy, 1, 0xff0000);
        this.pointerFollower.setVisible(false);

        this.ppmid = this.scene.add.circle((pfx + this.player.x) / 2, (pfy + this.player.y) / 2, 1, 0xff0000);
        this.ppmid.setVisible(false);
        this.scene.cameras.main.startFollow(this.ppmid, true, 0.05, 0.05);
    }



    update() {
        this.moving();
        
        if (this.pointer.rightButtonDown()) {
            // left hand is right click!!!
            this.player.useSkill(this.pointerFollower);
        }
        if (this.pointer.leftButtonDown()) {
            this.player.useHand(this.pointerFollower);
        }
        this.pointerFollowerMove();
        //this.camaraMoving();
    }

    moving() {
        if (this.W.isDown && !this.S.isDown) {
            this.player.moveUp();
        } else if (this.S.isDown && !this.W.isDown) {
            this.player.moveDown();
        } else if (!(this.S.isDown || this.W.isDown)) {
            this.player.clearMoveY();
        }
        if (this.A.isDown && !this.D.isDown) {
            this.player.moveLeft();
        } else if (this.D.isDown && !this.A.isDown) {
            this.player.moveRight();
        } else if (!this.A.isDown && !this.D.isDown) {
            this.player.clearMoveX();
        }

        if (!(this.W.isDown || this.S.isDown || this.A.isDown || this.D.isDown)) {
            this.player.clearMove();
        }
    }

    pointerFollowerMove() {
        const pfx = this.pointer.x - this.scene.scale.width / 2 + this.player.x,
              pfy = this.pointer.y - this.scene.scale.height / 2 + this.player.y;
        this.pointerFollower.x = pfx;
        this.pointerFollower.y = pfy;

        this.ppmid.x = (pfx - this.player.x) / 3 + this.player.x;
        this.ppmid.y = (pfy - this.player.y) / 3 + this.player.y;
    }
}