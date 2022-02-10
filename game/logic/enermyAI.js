import { Entity } from "../entity/enermy/entity.js";
import { WorldManager } from "../world/WorldManager.js";

export class EnermyAI {

    /**
     * A simple AI with some basic logic to control the enermy
     * @param {Phaser.Scene} scene
     * @param {WorldManager} worldManager
     * @param {Entity} entity - The entity that this AI controled 
     */
    constructor(scene, worldManager, entity) {
        this.scene = scene;
        this.worldManager = worldManager;
        this.entity = entity;

        /**@type {Number} */
        this.tileWidth = 32;
        /**@type {Number} */
        this.tileHeight = 32;

        this.easystar = new EasyStar.js();

        // init easystar map
        this.easystar.setGrid(this.worldManager.exportToArray());
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();
    }

    /**
     * 
     * @param {Entity} entity 
     */
    setHateTarget(entity) {
        /**@type {Entity} */
        this.hateTarget = entity;
    }

    async startCharseTarget() {
        if (!this.hateTarget) {
            return;
        }

        let that = this;

        function finding(selfPosition, targetPosition) {
            return new Promise(function (resolve, reject) {
                try {
                    that.easystar.findPath(selfPosition.x, selfPosition.y, targetPosition.x, targetPosition.y, function (path) {
                        if (!path || path.length === 0) {
                            resolve(false);
                        }
                        resolve(path);
                    });
                } catch (err) {
                    reject(err);
                }
            })
        }

        that.charsing = true;
        function charsing() {
            const selfPosition = that.getThisPosition();
            const targetPosition = that.getTargetPosition();
            finding(selfPosition, targetPosition).then(function (path) {
                if (!path || !that.charsing) {
                    that.sleep(100).then(function() {
                        charsing();
                        that.easystar.calculate();
                    })
                }

                path.splice(0, 1);
                const nextPoint = path[0];

                that.walkToward(nextPoint.x, nextPoint.y).then(function () {
                    charsing();
                    that.easystar.calculate();
                })
            })
        }
        charsing();
        that.easystar.calculate();
        /** 
         *path finding promise
         *@returns {Array<Object>} -x, y  
        function findPath() {
            return new Promise((resolve, reject) => {
                try {
                    const selfPosition = that.getThisPosition();
                    const targetPosition = that.getTargetPosition();
                    that.easystar.findPath(selfPosition.x, selfPosition.y, targetPosition.x, targetPosition.y, path => {
                        const rts = path[0];
                        path.splice(0, 1);
                        resolve(rts);
                    });
                    that.easystar.calculate();
                } catch (err) {
                    reject(err);
                }
            });
        }
        that.charsing = true;

        // move this entity to the center of a block then start
        await that.walkToward(that.getThisPosition().x, that.getThisPosition().y);
        while (that.charsing) {
            const nextPoint = await findPath();
            const targetPosition = that.getTargetPosition();
            await this.walkToward(nextPoint.x, nextPoint.y);
            if (nextPoint.x === targetPosition.x && nextPoint.y === targetPosition.y) {
                return true;
            }
        }
        return false;*/
    }

    stopCharseTarget() {
        this.charsing = false;
    }

    /**@returns {Object} - .x .y*/
    getThisPosition() {
        return {
            x: Math.floor(this.entity.x / this.tileWidth),
            y: Math.floor(this.entity.y / this.tileHeight)
        }
    }

    /**@returns {Object} - .x .y*/
    getTargetPosition() {
        if (!this.hateTarget) {
            throw new Error("Haven't set target before call the Charse");
        }
        return {
            x: Math.floor(this.hateTarget.x / this.tileWidth),
            y: Math.floor(this.hateTarget.y / this.tileHeight)
        };
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    async walkToward(x, y) {
        let that = this;
        const realPosition = {
            x: this.entity.x,
            y: this.entity.y
        }

        const realDestination = {
            x: Math.floor((x + 0.5) * this.tileWidth),
            y: Math.floor((y + 0.5) * this.tileHeight)
        }

        const speed = this.entity.infos.speed;
        const timeX = Math.floor(Math.abs(realDestination.x - realPosition.x) * 1000 / speed);
        const timeY = Math.floor(Math.abs(realDestination.y - realPosition.y) * 1000 / speed);

        if (realPosition.x < realDestination.x) {
            this.entity.moveRight();
        } else {
            this.entity.moveLeft();
        }
        this.sleep(timeX).then(function () {
            that.entity.clearMoveX();
        });

        if (realPosition.y < realDestination.y) {
            this.entity.moveDown();
        } else {
            this.entity.moveUp();
        }
        this.sleep(timeY).then(function () {
            that.entity.clearMoveY();
        });

        await this.sleep(Math.max(timeX, timeY));
        return;
    }


    sleep(sleepTime) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.scene.time.delayedCall(sleepTime, function () {
                resolve();
            }, [], that.scene);
        });
    };

    isAttackAble() {

    }
}