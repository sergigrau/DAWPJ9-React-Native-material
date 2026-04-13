import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { BotoPersonalitzat } from '../widget/BotoPesonalitzat';

/**
 * Classe que hereta de Component i que implementa un component
 * independent en l'app. És un component bàsic sense estils
 * Fa servir routing
 * @version 2.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

type RootStackParamList = {
  Home: undefined;
  Detall: { nom?: string };
  Camera: undefined;
  Mapes: undefined;
  SQLite: undefined;
  CSV: undefined;
  Suma: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Detall'>;

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#0f0',
  },
  contenidorBotons: {
    width: '80%',
    alignSelf: 'center',
  },
});

export class M06_Detalls extends React.Component<Props> {
  render() {
    const nom = this.props.route?.params?.nom;

    return (
      <View style={estils.contenidor}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Pantalla Detall {nom ? `"${nom}"` : 'sense nom'}</Text>
          <Image
            source={require('../../assets/favicon.png')}
            style={{ width: 80, height: 80, marginVertical: 20 }}
          />
          <View style={estils.contenidorBotons}>
            <BotoPersonalitzat
              title="Tornar a Home"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <BotoPersonalitzat
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  }
}
