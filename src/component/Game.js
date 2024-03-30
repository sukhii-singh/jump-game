
import { useEffect, useState } from 'react';

import kaboom from "kaboom";
function Game() {
    const [restart, setRestart] = useState(false)
    useEffect(() => {
        let boom = kaboom();
        let obstacle;
        let player;
        let platform;
        console.log("kaboom->", boom.move)

        boom.setGravity(1500)
        boom.loadBean()
        // boom.loadSprite( "dino", "sprites/dino.svg" )
        boom.scene("game", () => {

            //|||||
            player = boom.add([
                boom.sprite("bean"),
                boom.pos(120, 80),
                boom.area(),
                boom.body(),
                "player"
            ])

            platform = boom.add([
                boom.rect(2000, 48),
                boom.pos(0, 950 - 48),
                boom.outline(4),
                boom.area(),
                boom.body({ isStatic: true }),
                boom.color(127, 200, 255),
            ])


            boom.loop(2, () => {

                obstacle = boom.add([
                    boom.rect(48, boom.rand(24, 64)),
                    boom.area(),
                    boom.outline(4),
                    boom.pos(800, 950 - 48),
                    boom.anchor("botleft"),
                    boom.color(255, 180, 255),
                    boom.move(180, 240),  // <-- !!PROBLEM!!  I am getting problem here
                    "tree",
                ]);
            })
            boom.onKeyPress("space", () => {
                if (player.isGrounded()) {
                    player.jump(770)
                }
            })
            boom.onKeyPress("up", () => {
                if (player.isGrounded()) {
                    player.jump(770)
                }
            })

            player.onCollide("tree", () => {
                boom.go("lose", score)
                boom.burp();
                boom.addKaboom(player.pos);
                boom.shake();
                // player.destroy();
                setRestart(!restart)

            });


            ////////////
            let score = 0;

            const scoreLabel = boom.add([
                boom.text(score),
                boom.pos(24, 24),
            ]);

            // increment score every frame
            boom.onUpdate(() => {
                score++;
                scoreLabel.text = score;
            });



        })
        // loose scene
        boom.scene("lose", (score) => {

            boom.add([
                boom.sprite("bean"),
                boom.pos(800 / 2, 900 / 2 - 80),
                boom.scale(2),
                boom.anchor("center"),
            ]);

            // display score
            boom.add([
                boom.text(score),
                boom.pos(800 / 2, 900 / 2 + 80),
                boom.scale(2),
                boom.anchor("center"),
            ]);
            boom.add([
                boom.text("Press space to restart"),
                boom.pos(400, 600),
                boom.scale(1),
                boom.color(0, 0, 0),
                boom.anchor("center"),
            ]);

            // go back to game with space is pressed
            boom.onKeyPress("space", () => boom.go("game"));
            boom.onClick(() => boom.go("game"));

        });
        boom.go("game")







    }, [])

    return (
        <></>
    );
}


export default Game;
