import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { teams } from './constants/Teams';
import styledC from 'styled-components';
import { Avatar as BaseAvatar, Stack } from '@mui/material';
import { Contestants } from './constants/Contestants';
import { findPredictionNumbers, generateTotalScore } from './generateTotalScore';

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

export const Table = ({ Predictions = [], Vesus = [], round = '' }) => {
  const Result = generateTotalScore(Predictions, Vesus);

  return (
    <div>
      {round}
      <Grid container spacing={2}>
        <Grid item xs={1.1} md={1.3}></Grid>
        {Vesus.map(([t1, t2, t1Result, t2Result]) => {
          const team1 = teams.find(team => team.code === t1);
          const team2 = teams.find(team => team.code === t2);

          return (
            <Grid item xs={1.1} md={1.3}>
              <Item>
                <Stack direction="row" spacing={0.5}>
                  <div>
                    <Image src={team1?.logo} alt={team1.name} />
                    {t1Result}
                  </div>
                  <Code> {team1.code} </Code>
                  <div>vs</div>
                  <div>
                    <Image src={team2?.logo} alt={team2.name} />
                    {t2Result}
                  </div>
                  <Code> {team2.code}</Code>
                </Stack>
              </Item>
            </Grid>
          );
        })}

        <Grid item md={12}>
          {Result.map(P => {
            const Contestant = Contestants.find(c => c.code === P.code);

            return (
              <Grid container spacing={2}>
                <Grid item>
                  <Stack style={{ marginTop: '5px' }} direction="row" spacing={0.5} useFlexGap>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      src={Contestant?.avatar}
                      alt={Contestant.Code}
                    />
                    {Contestant.name}
                  </Stack>
                </Grid>

                {Vesus.map(([t1, t2, t1Result, t2Result], i) => {
                  const { n1, n2 } = findPredictionNumbers(t1, t2, P.predictions);
                  const ifIsFinished = (t1Result === '4') | (t2Result === '4');

                  return (
                    <Grid item>
                      <TextItem>
                        <Text>
                          <span style={n1 > n2 ? { backgroundColor: 'lightgreen' } : {}}>{n1}</span>
                          :
                          <span style={n1 < n2 ? { backgroundColor: 'lightgreen' } : {}}>{n2}</span>
                          {ifIsFinished ? <span>{` > ${P.scores[i]}`}</span> : null}
                        </Text>
                      </TextItem>
                    </Grid>
                  );
                })}
                <Grid item>
                  <TextItem>
                    <Text>
                      <span>{P.totalScore}</span>
                    </Text>
                  </TextItem>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
