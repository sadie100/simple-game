import { BaseScene } from "./BaseScene";
import { Pig } from "../gameobjects/monsters/Pig";

export class FirstScene extends BaseScene {
    constructor() {
        super("FirstScene");
    }

    completeStage() {
        super.completeStage();
        // this.time.delayedCall(2000, () => {
        //     this.goToNextStage();
        // });
    }

    getBackgroundKey() {
        return "background1";
    }

    spawnSingleMonster() {
        let x, y, direction;

        if (this.gameTime >= this.advancedSpawnTime) {
            const spawnArea = Math.random();
            if (spawnArea < 0.6) {
                x = this.scale.width;
                y = Phaser.Math.Between(0, this.scale.height);
                direction = "straight";
            } else if (spawnArea < 0.8) {
                x = Phaser.Math.Between(
                    this.scale.width * 0.7,
                    this.scale.width
                );
                y = 0;
                direction = "down";
            } else {
                x = Phaser.Math.Between(
                    this.scale.width * 0.7,
                    this.scale.width
                );
                y = this.scale.height;
                direction = "up";
            }
        } else {
            x = this.scale.width;
            y = Phaser.Math.Between(0, this.scale.height);
            direction = "straight";
        }

        const pig = new Pig(this, x, y, this.currentMonsterSpeed, direction);
        this.monsters.add(pig);
    }

    // goToNextStage() {
    //     this.cameras.main.fade(1000, 0, 0, 0);
    //     this.cameras.main.once("camerafadeoutcomplete", () => {
    //         this.scene.start("SecondScene", {
    //             points: this.points,
    //             currentMonsterSpeed: this.currentMonsterSpeed,
    //             currentSpawnDelay: this.currentSpawnDelay,
    //             monstersPerSpawn: this.monstersPerSpawn,
    //         });
    //     });
    // }

    startNextRound() {
        this.cameras.main.pan(this.scale.width, 0, 1000, "Power2");

        this.time.delayedCall(1000, () => {
            this.scene.start("SecondScene", {
                player: this.player,
                points: this.points,
                lives: this.player.getLives(),
                selectedItem: this.selectedItem, // 선택된 아이템 정보 전달
            });
        });
    }

    createItems() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // FirstScene에서는 아이템 1과 2를 생성합니다
        this.itemManager.addItem(
            centerX - 100,
            centerY,
            "itemList1",
            0,
            "item1"
        );
        this.itemManager.addItem(
            centerX + 100,
            centerY,
            "itemList1",
            1,
            "item2"
        );
    }
}

