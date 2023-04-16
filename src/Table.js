import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { teams } from './constants/Teams';
import { Predictions, Vesus } from './constants/2023/FirstRound';
import styledC from 'styled-components';
import { Avatar as BaseAvatar, Stack } from '@mui/material';
import { Contestants } from './constants/Contestants';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TextItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Text = styledC.div`
      @media screen and (max-width: 768px) {
    min-width: 50px;
  }
`;

const Image = styledC.img`
    max-width: 10px;
      @media screen and (max-width: 768px) {
    max-width: 10px;
  }
`;

const Code = styledC.div`
  dispaly: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Avatar = styledC(BaseAvatar)`  
  margin-left:30px;
  @media screen and (max-width: 768px) {
   margin-left:0px;
  }
`;

const findPredictionNumbers = (team1, team2, predictions) => {
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
export const Table = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1.1} md={1.3}></Grid>
      {Vesus.map(([t1, t2]) => {
        const team1 = teams.find(team => team.code === t1);
        const team2 = teams.find(team => team.code === t2);

        return (
          <Grid item xs={1.1} md={1.3}>
            <Item>
              <Stack direction="row" spacing={0.5}>
                <div>
                  <Image src={team1?.logo} alt={team1.name} />
                </div>
                <Code> {team1.code}</Code>
                <div>vs</div>
                <div>
                  <Image src={team2?.logo} alt={team2.name} />
                </div>
                <Code> {team2.code}</Code>
              </Stack>
            </Item>
          </Grid>
        );
      })}

      <Grid item md={12}>
        {Predictions.map(P => {
          const Contestant = Contestants.find(c => c.code === P.code);
          return (
            <Grid container spacing={2}>
              <Grid item md={1.3}>
                <Stack style={{ marginTop: '5px' }} direction="row" spacing={0.5} useFlexGap>
                  <Avatar
                    sx={{ width: 20, height: 20 }}
                    src={Contestant?.avatar}
                    alt={Contestant.Code}
                  />
                  {Contestant.name}
                </Stack>
              </Grid>
              {/* 太阳3-4快船 */}
              {Vesus.map(([t1, t2]) => {
                const { n1, n2 } = findPredictionNumbers(t1, t2, P.predictions);
                return (
                  <Grid item md={1.3}>
                    <TextItem>
                      <Text>
                        <span style={n1 > n2 ? { backgroundColor: 'lightgreen' } : {}}>{n1}</span> :{' '}
                        <span style={n1 < n2 ? { backgroundColor: 'lightgreen' } : {}}>{n2}</span>
                      </Text>
                    </TextItem>
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
