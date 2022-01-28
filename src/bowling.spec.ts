import Bowling from './bowling'
import Game from './game'

const MAX_ROLLS = 20

const rolls = (game: Game, totalCounter: number) => {
  let counter = 0;
  while (counter < totalCounter) {
    game.roll(0)
    counter += 1;
  }
}

describe("Bowling", () => {
  it('scores zero for a complete gutter game', () => {
    const game = new Bowling()

    rolls(game, MAX_ROLLS)
    expect(game.score()).toEqual(0)
  })

  it('scores 1', () => {
    const game = new Bowling()

    rolls(game, MAX_ROLLS - 1)
    game.roll(1)
    expect(game.score()).toEqual(1)
  })

  it('scores 1 spare', () => {
    const game = new Bowling()

    rolls(game, 10)

    // Frame 6
    game.roll(3)
    game.roll(7) // Spare

    game.roll(7) // Double for a spare

    rolls(game, 7)

    expect(game.score()).toEqual(24)
  })

  it('score a strike', () => {
    const game = new Bowling()

    rolls(game, 10);

    //first roll for a strike
    game.roll(10)

    game.roll(3) // Double for a strike
    game.roll(3) // Double for a strike

    rolls(game, 6)

    expect(game.score()).toEqual(22)
  })

  it('scores the perfect game', () => {
    const game = new Bowling()

    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)
    game.roll(10)

    expect(game.score()).toEqual(300)
  })
});
