import { Monster } from "./Monster";

export class Pig extends Monster {
    constructor(scene, x, y, speed = 100) {
        super(scene, x, y, "pig", speed);
        this.health = 1; // Pig의 체력을 1로 설정

        if (this.scene.anims.exists("pig_walk")) {
            this.play("pig_walk");
        }
    }
}
