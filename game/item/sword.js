import { Entity } from "../entity/entity.js";
import { MeleeWeapon } from "./meleeweapon.js";
export class Sword extends MeleeWeapon {

    static texturePath = '/game/assets/textures/items/sword/'
    static icon = {
        name: 'diamond_sword',
        file: 'diamond_sword.png'
    }
    static animation = {
        name: 'qi-animi',
        img: 'qisheet.png',
        atlas: 'qisheet.json',
        duration: 200
    }
    /**@param {Phaser.Scene} */
    static loader(scene) {
        const path = this.texturePath;
        scene.load.atlas(
            this.animation.atlas,
            path + this.animation.img,
            path + this.animation.atlas
        );
    }
    /**
     * 
     * @param {*} scene 
     * @param {*} owner 
     */
    constructor(scene, owner) {
        super(scene, owner, Sword.texturePath + Sword.icon.file, 500, "Diamond Sword");
        scene.anims.create({ 
            key: Sword.animation.name, 
            frames: scene.anims.generateFrameNames(
                Sword.animation.atlas, {
                    prefix: 'qi', 
                    end: 10, 
                    zeroPad: 4 
                }), 
            duration: Sword.animation.duration
        });
        this.distance = 40; // px
    }

    /**
     * 在使用者前面放置剑气，剑气碰到(Overlap)的实体都扣血。为了防止重复扣血，自己记录用过的id
     * 
     * @param {Entity} caller 
     * @param {Number} radian - radian toword
     */
     use(caller, radian) {
        if (this.isLocking()) {
            return;
        }
        super.use(caller, undefined);
        const x = caller.x + this.distance * Math.cos(radian),
              y = caller.y + this.distance * Math.sin(radian);
        // summon a entity "qi"
        let qi = new Entity(caller.scene, x, y, "testman", {
            name: "sword qi",
            type: "qi",
        }, caller.worldManager);
        qi.rotation = radian;
        qi.setScale(2);
        qi.locks.hurt = true;
        qi.anims.play(Sword.animation.name);
        qi.avoid = [];
        qi.avoid[caller.id] = true;
        /**
         * 
         * @param {Entity} sprite 
         * @param {Entity} sprite2 
         */
        function callback(sprite, sprite2) {
            let qi, sp;
            if (sprite.infos.type === 'qi') {
                qi = sprite;
                sp = sprite2;
            } else {
                qi = sprite2;
                sp = sprite;
            }
            if (!qi.avoid[sp.id]) {
                qi.avoid[sp.id] = true;
                sp.hurt(1);
            }
        }
        caller.worldManager.entities.container.forEach(function(item) {
            caller.scene.physics.add.overlap(item, qi, callback);
        });
        this.sleep(Sword.animation.duration).then(
            function() {
                qi.die();
            }
        );
    }
}