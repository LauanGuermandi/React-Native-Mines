import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';

import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines } from './src/functions';

class App extends Component {

  constructor(props){
    super(props);
    this.state = this.createState();
  }
  
  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return Math.ceil(cols * rows * params.difficultLevel);
  }

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  onOpenField = (row, column) => {
      const board = cloneBoard(this.state.board)
      openField(board, row, column)
      const lost = hadExplosion(board)
      const won = wonGame(board)

      if(lost){
        showMines(board)
        Alert.alert('Perdeu', 'perdeu')
      }

      if(won){
        Alert.alert('Ganhou', 'ganhou')
      }

      this.setState({board, lost, won})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Campo Minado</Text>
        
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'flex-end' 
  },
  title:{
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 90,
    color: '#FFF',
    backgroundColor: '#AAA'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})


export default App;
