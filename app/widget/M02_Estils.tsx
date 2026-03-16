import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Classe que hereta de Component i que treballa amb estils
 * @version 1.0 23.03.2020
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  textPeu: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  peu: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FA0',
  },
});

export class M02_Estils extends React.Component {
  render() {
    return (
      <View style={estils.peu}>
        <Text style={estils.textPeu}> Estil </Text>
      </View>
    );
  }
}
