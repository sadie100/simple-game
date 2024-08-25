import { Pig } from "../gameobjects/monsters/Pig";
import { Cat } from "../gameobjects/monsters/Cat";
import { Background } from "../backgrounds/Background";
import { NormalScene } from "./NormalScene";

export class SecondScene extends NormalScene {
    constructor() {
        super("SecondScene");
    }

    init(data) {
        super.init(data);
    }

    getBackground() {
        return new Background(this, "background2", 3);
    }

    createItems() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // SecondScene에서는 아이템 3과 4를 생성합니다 (예시)
        this.itemManager.addItem(
            centerX - 100,
            centerY,
            "itemList1",
            2,
            "SpeedBooster"
        );
        this.itemManager.addItem(
            centerX + 100,
            centerY,
            "itemList1",
            3,
            "EggSizeBooster"
        );
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

        if (Math.random() < 0.3) {
            // 30% 확률로 고양이 스폰
            const cat = new Cat(
                this,
                x,
                y,
                this.currentMonsterSpeed * 1.2,
                direction
            );
            this.monsters.add(cat);
        } else {
            const pig = new Pig(
                this,
                x,
                y,
                this.currentMonsterSpeed,
                direction
            );
            this.monsters.add(pig);
        }
    }

    startNextRound() {
        super.startNextRound("BossScene");
    }
}

