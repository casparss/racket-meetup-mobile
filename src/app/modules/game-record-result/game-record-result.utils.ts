import { Injectable } from '@angular/core';
import { partition, max, maxBy } from 'lodash';

@Injectable()
export class GameRecordResultUtils {
  generateScoresObject(scores, gameModel){
    return {
      scores: this.transformScoresObject(scores),
      winner: this.getWinnerId(scores, gameModel)
    }
  }

  transformScoresObject(scores){
    return {
      side1: scores.map(({side1}) => side1),
      side2: scores.map(({side2}) => side2)
    }
  }

  getWinnerId(scores, gameModel){
    let { side1, side2 } = this.transformScoresObject(scores);
    let accumulate = side => side.reduce((acumulator, current) => acumulator + current);

    let players = [{
      userModel: gameModel.side1,
      totalScore: accumulate(side1)
    },
    {
      userModel: gameModel.side2,
      totalScore: accumulate(side2)
    }];

    return maxBy(players, ({totalScore}) => totalScore).userModel._id;
  }

  isValidScoring(scoreItemComs){
    if(scoreItemComs){
      return scoreItemComs
        .map(scoreItemCom => scoreItemCom.isValidScore())
        .indexOf(false) === -1;
    } else {
      return false;
    }
  }

  isWinner(scores, matchSetRange){
    let wins = scores
      .map(a => a.side1 > a.side2 ? "side1" : "side2")

    let maximum = max(partition(wins, side => side === "side1")
      .map((score) => score.length))

    return maximum >= (matchSetRange - maximum);
  }
}
