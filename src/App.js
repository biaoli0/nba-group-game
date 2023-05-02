import Divider from '@mui/material/Divider';
import { Table } from './Table';
import { Predictions, Vesus } from './constants/2023/FirstRound';
import { Predictions as secPredictions, Vesus as secVesus } from './constants/2023/SecondRound';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <h1 class="title">NBA经理工会2023季后赛预测</h1>
      <Table Predictions={secPredictions} Vesus={secVesus} round="次轮" />
      <Divider style={{ margin: 40 }} light />
      <Table Predictions={Predictions} Vesus={Vesus} round="首轮" />
    </div>
  );
}
