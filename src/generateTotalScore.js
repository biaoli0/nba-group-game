import { teams } from './constants/Teams';

export const findPredictionNumbers = (team1, team2, predictions) => {
  let n1, n2;

  predictions.forEach(pString => {
    const [predictionTeam1, predictionTeam2] = pString.split('-');

    const predictionTeam1Name = predictionTeam1.slice(0, predictionTeam1.length - 1);
    const predictionTeam2Name = predictionTeam2.slice(1, predictionTeam2.length);

    const predictionTeam1Code = teams.find(team => team.chineseName === predictionTeam1Name).code;
    const predictionTeam2Code = teams.find(team => team.chineseName === predictionTeam2Name).code;

    if (team1 === predictionTeam1Code && team2 === predictionTeam2Code) {
      n1 = predictionTeam1.slice(predictionTeam1.length - 1, predictionTeam1.length);
      n2 = predictionTeam2.slice(0, 1);
      return;
    }
    if (team1 === predictionTeam2Code && team2 === predictionTeam1Code) {
      n2 = predictionTeam1.slice(predictionTeam1.length - 1, predictionTeam1.length);
      n1 = predictionTeam2.slice(0, 1);
      return;
    }
  });

  return { n1, n2 };
};

export const generateTotalScore = (Predictions, Vesus) => {
  const result = [...Predictions];

  Predictions.map((P, index) => {
    let totalScore = 0;
    const scores = [];
    Vesus.map(([t1, t2, t1Result, t2Result], i) => {
      const { n1, n2 } = findPredictionNumbers(t1, t2, P.predictions);
      let score = 0;

      if (n1 === t1Result && n1 === '4') {
        score = 4 - Math.abs(t2Result - n2);
      }
      if (n2 === t2Result && n2 === '4') {
        score = 4 - Math.abs(t1Result - n1);
      }

      scores[i] = score;
      totalScore += score;
    });

    result[index].totalScore = totalScore;
    result[index].scores = scores;
  });

  result.sort((a, b) => b.totalScore - a.totalScore);

  return result;
};
