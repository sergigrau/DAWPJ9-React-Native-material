import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { M02_Estils } from './M02_Estils';

/**
 * Classe que hereta de Component i que implementa esdeveniments
 * @version 1.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#0f0',
  },
  filaSeleccionada: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    alignContent: 'center',
  },
  fila: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'red',
    alignContent: 'center',
    borderBottomWidth: 1,
  },
  boto: {
    height: '50%',
    width: '50%',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export class M04_Flex extends React.Component {
  mostrarMissatge = (): void => {
    Alert.alert('Has polsat un botó');
  };

  render() {
    return (
      <View style={estils.contenidor}>
        <View style={estils.filaSeleccionada}>
          <TouchableOpacity style={estils.boto} onPress={this.mostrarMissatge}>
            <Text>Menu 1</Text>
          </TouchableOpacity>
        </View>
        <View style={estils.fila}>
          <TouchableOpacity style={estils.boto} onPress={this.mostrarMissatge}>
            <Text>Menu 2</Text>
          </TouchableOpacity>
        </View>
        <View style={estils.fila}>
          <TouchableOpacity style={estils.boto} onPress={this.mostrarMissatge}>
            <Text>Menu 3</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
