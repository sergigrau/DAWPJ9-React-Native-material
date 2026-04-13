import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export class M06_Home extends React.Component<Props> {
  render() {
    return (
      <View style={estils.contenidors}>
        <View style={estils.contenidorLogo}>
          <Image
            source={require('../../assets/logo.png')}
            style={estils.logo}
            resizeMode="contain"
          />
        </View>

        <View style={estils.contenidorBotons} testID="contenidorBotons">
          <BotoPersonalitzat
            title="Anar a Detall"
            onPress={() => this.props.navigation.navigate('Detall', { nom: 'Sergi Grau' })}
          />
          <BotoPersonalitzat
            title="Anar a Camera"
            onPress={() => this.props.navigation.navigate('Camera')}
          />
          <BotoPersonalitzat
            title="Anar a Mapes"
            onPress={() => this.props.navigation.navigate('Mapes')}
          />
          <BotoPersonalitzat
            title="Anar a SQLite"
            onPress={() => this.props.navigation.navigate('SQLite')}
          />
          <BotoPersonalitzat
            title="Anar a CSV"
            onPress={() => this.props.navigation.navigate('CSV')}
          />
          <BotoPersonalitzat
            title="Anar a Suma"
            onPress={() => this.props.navigation.navigate('Suma')}
          />
        </View>
      </View>
    );
  }
}

const estils = StyleSheet.create({
  contenidors: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contenidorLogo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
  },
  contenidorBotons: {
    width: '80%',
    alignSelf: 'center',
  },
});
