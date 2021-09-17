import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['x', '', '', '', '', '', ''],
    ['o', 'x', 'o', '', '', '', ''],
    ['o', 'o', 'x', 'o', '', '', ''],
    ['x', 'x', 'x', 'x', 'o', '', '']
  ]

  const search = () => {
    var win = ''
    board.map((lines, lineIndex) => {
      lines.map((columns, columnIndex) => {
        if (columns === 'x') {
          // console.log(lineIndex, columnIndex)
          win = verify(lineIndex, columnIndex, 'x')
        }
      })
    })

    if (win != '') {
      Alert.alert('Victory!', `GG izi! ${win} é o campeão!`)
    }
  }

  const verify = (line, column, player) => {
    return player
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={search} style={styles.button}>
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
