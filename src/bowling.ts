import Game from './game'

type Frame = number[]
type Frames = Array<Frame>

class Bowling implements Game {

    private frames: Frames = [[]]
    private currentFrame: number = 0
    private readonly ALL_PINS = 10
    private readonly FULL_FRAME = 2
    private readonly MAX_FRAMES = 10

    public roll(pins: number): void {
        if (this.isStrike(this.currentFrame) || this.getCurrentFrame().length === this.FULL_FRAME) {
            this.currentFrame += 1;
            this.frames[this.currentFrame] = [];
        }

        this.getCurrentFrame().push(pins)
    }

    public getFrames(): Frames {
        return JSON.parse(JSON.stringify(this.frames))
    }

    public score(): number {
        let score = 0;
        for (let i = 0; i < this.MAX_FRAMES; i++) {
            score += this.getFrameScore(i)

            if (this.isSpare(i)) {
                score += this.getRoll(i + 1, 0)
            }

            if (this.isStrike(i)) {
                score += this.getRoll(i + 1, 0)

                if (this.getRoll(i + 1, 1)) {
                    score += this.getRoll(i + 1, 1)
                } else if (this.getRoll(i + 2, 0)) {
                    score += this.getRoll(i + 2, 0)
                }
            }
        }
        return score;
    }

    private isStrike(frame: number): boolean {
        return this.getRoll(frame, 0) === this.ALL_PINS
    }

    private isSpare(frame: number): boolean {
        return this.getRoll(frame, 0) + this.getRoll(frame, 1) === this.ALL_PINS
    }

    private getFrameScore(frame: number): number {
        let score = this.getRoll(frame, 0)

        if (this.hasSecondRoll(frame)) {
            score += this.getRoll(frame, 1);
        }

        return score
    }

    private hasSecondRoll(frame: number) {
        return typeof this.frames[frame]?.[1] != "undefined";
    }

    private getCurrentFrame(): Frame {
        return this.frames[this.currentFrame]
    }

    private getRoll(frame: number, roll: number): number {
        return this.frames[frame]?.[roll]
    }

}

export default Bowling
