import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const player1 = "x"
  const player2 = "o"
  const [gameOver, setGameOver] = useState(false)
  // const [playTime, setPlayTime] = useState(player1)

  const board = [
    ['o', '', '', '', '', '', ''],
    ['x', 'o', 'o', '', '', '', 'o'],
    ['x', 'x', 'o', 'o', '', 'o', ''],
    ['x', 'x', 'x', '', 'o', '', ''],
    ['x', 'x', '', '', 'o', '', ''],
    ['', '', 'x', '', '', '', '']
  ]

  const verifyWinner = () => {
    var winner = ''
    var linePlayer1 = []
    var columnPlayer1 = []
    var linePlayer2 = []
    var columnPlayer2 = []

    board.map((lines, lineIndex) => {
      lines.map((columns, columnIndex) => {
        if (columns === player1) {
          linePlayer1.push(lineIndex)
          columnPlayer1.push(columnIndex)
        } else if (columns === player2) {
          linePlayer2.push(lineIndex)
          columnPlayer2.push(columnIndex)
        }
      })
    })

    //horizontal
    const horizontalPlayer1 = verify(linePlayer1, columnPlayer1, 'hv')
    const horizontalPlayer2 = verify(linePlayer2, columnPlayer2, 'hv')
    // console.log(horizontalPlayer1, horizontalPlayer2)

    //vertical
    const verticalPlayer1 = verify(columnPlayer1, linePlayer1, 'hv')
    const verticalPlayer2 = verify(columnPlayer2, linePlayer2, 'hv')
    // console.log(verticalPlayer1, verticalPlayer2)

    //diagonal direita
    const rightDiagonalPlayer1 = verify(linePlayer1, columnPlayer1, 'rd')
    const rightDiagonalPlayer2 = verify(linePlayer2, columnPlayer2, 'rd')
    console.log(rightDiagonalPlayer1, rightDiagonalPlayer2)

    //diagonal esquerda
    const leftDiagonalPlayer1 = verify(linePlayer1, columnPlayer1, 'ld')
    const leftDiagonalPlayer2 = verify(linePlayer2, columnPlayer2, 'ld')
    console.log(leftDiagonalPlayer1, leftDiagonalPlayer2)

    if (horizontalPlayer1 >= 4 || verticalPlayer1 >= 4 || rightDiagonalPlayer1 >= 4 || leftDiagonalPlayer1 >= 4) {
      winner = player1
    } else if (horizontalPlayer2 >= 4 || verticalPlayer2 >= 4 || rightDiagonalPlayer2 >= 4 || leftDiagonalPlayer2 >= 4) {
      winner = player2
    }

    if (winner != '') {
      setGameOver(true)
      Alert.alert('Victory!', `GG izi! ${winner} é o campeão!`)
    }

  }

  const verify = (mainAxis, auxAxis, direction) => {
    console.log('--------------------------------------------------------')
    var qt = 1
    var last = 0

    for(var i = 0; i < mainAxis.length; i++) {
      //horizontal and vertical
      if (direction === 'hv') {
        last = i
        for(var j = 0; j < mainAxis.length; j++) {
          if (qt < 4) {
            // console.log(mainAxis[j], auxAxis[j], 'i')
            // console.log(mainAxis[last] + 1, auxAxis[last], 'last')
            // console.log(last, 'last')
            // console.log(j, 'j')
            if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last])) {
              last = j
              qt++
            }
            // console.log(last, 'last novo')
            // console.log(qt, 'qt')
          } else {
            return qt
          }
        }
        if (qt < 4) {
          qt = 1
        } else {
          return qt
        }
      }

      //diagonal direita
      else if (direction === 'rd') {
        console.log('****************************************************************')
        last = i
        for(var j = 0; j < mainAxis.length; j++) {
          if(qt < 4) {
            if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last] - 1)){
              console.log('passei aqui')
              last = j
              qt++
            }
          } else {
            return qt
          }
        }
        qt = 1
      }

      //diagonal esquerda
      else if (direction === 'ld') {
        console.log('****************************************************************')
        last = i
        for(var j = 0; j < mainAxis.length; j++) {
          if(qt < 4) {
            if ((mainAxis[j] == mainAxis[last] + 1) && (auxAxis[j] == auxAxis[last] + 1)){
              console.log('passei aqui')
              last = j
              qt++
            }
          } else {
            return qt
          }
        }
        if (qt < 4) {
          qt = 1
        } else {
          return qt
        }
      }
    }
    return qt
  }

  // const updateDisplay = () => {
  //   if (gameOver) {
  //     return
  //   }
    
  //   if (playTime == player1) {
  //     var player = document.querySelectorAll("div#id_div img")[0]
  //     player.setAttribute("src", "caminho_img_player1")
  //   } else {
  //     var player = document.querySelectorAll("div#id_div img")[0]
  //     player.setAttribute("src", "caminho_img_player2")
  //   }
  // }

  // const initializeSpaces = () => {
  //   var spaces = document.getElementsByClassName("nome_classe_espacos")

  //   for (var i = 0; i < spaces.length; i ++) {
  //     spaces[i].addEventListener("click", function() {
  //       if (gameOver) {
  //         return
  //       }

  //       if (playTime == player1) {
  //         this.innerHTML = "<img src='caminho_img_player1'"
  //         this.setAttribute("nome_atributo_valor_espaco", player1)
  //         setPlayTime(player2)
  //       } else {
  //         this.innerHtml = "<img src='caminho_img_player2'"
  //         this.setAttribute("nome_atributo_valor_espaco", player2)
  //         setPlayTime(player1)
  //       }
  //       updateDisplay()
  //       verifyWinner()
  //     })
  //   }
  // }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={verifyWinner} style={styles.button}>
        <Text>
          Iniciar
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#00FF7F'
  },
});
