import React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';

/**
 * Classe que hereta de Component i que implementa esdeveniments
 * @version 1.0 23.03.2020
 * @author sergi.grau@fje.edu
 */

export class M03_Esdeveniments extends React.Component {
  mostrarMissatge = (): void => {
    Alert.alert('Has polsat un botó');
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.mostrarMissatge}>
          <Text>Polsar aquest botó</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
