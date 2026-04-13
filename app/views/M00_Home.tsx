import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { M01_PropsStates } from '../widget/M01_PropsStates';
import { M02_Estils } from '../widget/M02_Estils';
import { M03_Esdeveniments } from '../widget/M03_Esdeveniments';
import { M04_Flex } from '../widget/M04_Flex';

/**
 * Classe que hereta de Component i que implementa un component
 * independent en l'app. És un component bàsic sense estils
 * @version 1.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#0f0',
  },
});

export class M00_Home extends React.Component {
  render() {
    return (
      <View style={estils.contenidor}>
        <M01_PropsStates missatge='polsar per a Login' />
        <M02_Estils />
        <M03_Esdeveniments />
        <Text>Aprenent React Native a DAW2</Text>
        <M04_Flex />
      </View>
    );
  }
}
