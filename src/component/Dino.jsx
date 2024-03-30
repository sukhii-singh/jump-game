import { useEffect, useState } from "react";
import dino from "../assets/dino.svg";
import kaboom from "kaboom";
function Dino() {
  const [restart, setRestart] = useState(false);
  useEffect(() => {
    let boom = kaboom();
    let obstacle;
    let obstacle1;
    let player;
    let platform;

    boom.setGravity(1500);
    boom.loadBean();
    boom.loadSprite("dino", dino);

    boom.scene("game", () => {
      //|||||
      player = boom.add([
        boom.sprite("dino"),
        boom.pos(120, 300),
        boom.area(),
        boom.body(),
        "player",
      ]);

      platform = boom.add([
        boom.rect(2000, 48),
        boom.pos(0, 950 - 48),
        boom.outline(4),
        boom.area(),
        boom.body({ isStatic: true }),
        boom.color(127, 200, 255),
        "platform",
      ]);
      platform = boom.add([
        boom.rect(2000, 48),
        boom.pos(0, 10),
        boom.outline(4),
        boom.area(),
        boom.body({ isStatic: true }),
        boom.color(127, 200, 255),
        "platform",
      ]);

      boom.loop(2, () => {
        obstacle = boom.add([
          boom.rect(20, boom.rand(100, 400)),
          boom.area(),
          boom.outline(4),
          boom.pos(1000, 950),
          boom.anchor("botleft"),
          boom.color(255, 180, 255),
          boom.move(180, 240),
          "tree",
        ]);
      });

      boom.loop(3, () => {
        obstacle1 = boom.add([
          boom.rect(20, boom.rand(56, 800)),
          boom.area(),
          boom.outline(4),
          boom.pos(1100, 250),
          boom.anchor("center"),
          boom.color(25, 180, 255),
          boom.move(180, 240),
          "tree",
        ]);
      });
      boom.onKeyPress("space", () => {
        player.jump(600);
      });
      boom.onKeyPress("up", () => {
        player.jump(600);
      });

      player.onCollide("tree", () => {
        boom.go("lose", score);
        boom.burp();
        boom.addKaboom(player.pos);
        boom.shake();
        // player.destroy();
        setRestart(!restart);
      });
      player.onCollide("platform", () => {
        boom.go("lose", score);
        boom.burp();
        boom.addKaboom(player.pos);
        boom.shake();
        // player.destroy();
        setRestart(!restart);
      });

      ////////////
      let score = 0;

      const scoreLabel = boom.add([boom.text(score), boom.pos(24, 24)]);

      // increment score every frame
      boom.onUpdate(() => {
        score++;
        scoreLabel.text = score;
      });
    });
    // loose scene
    boom.scene("lose", (score) => {
      boom.add([
        boom.sprite("bean"),
        boom.pos(950, 900 / 2 - 80),
        boom.scale(2),
        boom.anchor("center"),
      ]);

      // display score
      boom.add([
        boom.text(score),
        boom.pos(950, 900 / 2 + 80),
        boom.scale(2),
        boom.anchor("center"),
      ]);
      boom.add([
        boom.text("Press space to restart"),
        boom.pos(950, 600),
        boom.scale(1),
        boom.color(0, 0, 0),
        boom.anchor("center"),
      ]);

      // go back to game with space is pressed
      boom.onKeyPress("space", () => boom.go("game"));
      boom.onClick(() => boom.go("game"));
    });
    boom.go("game");
  }, []);

  return <></>;
}

export default Dino;
