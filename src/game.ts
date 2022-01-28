export default interface Game {
    roll(pins: number): void
    score(): number
}