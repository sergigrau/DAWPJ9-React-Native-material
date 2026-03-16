import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

/**
 * Classe que hereta de Component i que implementa un component
 * independent en l'app. És un component bàsic sense estils
 * Fa servir routing
 * @version 1.0 23.03.2020
 * @author sergi.grau@fje.edu
 */

type RootStackParamList = {
  Home: undefined;
  Detall: { nom: string };
  Camera: undefined;
  Mapes: undefined;
  SQLite: undefined;
  Suma: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#0f0',
  },
});

export class M06_Home extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pantalla Home</Text>
        <Button
          title="Anar a Detalls"
          onPress={() => this.props.navigation.navigate('Detall', { nom: 'DAW2' })}
        />
        <Button
          title="Anar a Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
        <Button
          title="Anar a Mapes"
          onPress={() => this.props.navigation.navigate('Mapes')}
        />
        <Button
          title="Anar a SQLite"
          onPress={() => this.props.navigation.navigate('SQLite')}
        />
        <Button
          title="Anar a Suma"
          onPress={() => this.props.navigation.navigate('Suma')}
        />
      </View>
    );
  }
}
