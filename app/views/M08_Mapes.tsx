import React from 'react';
import { StyleSheet, Dimensions, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

/**
 * Classe que hereta de Component i que implementa un component
 * per a visualitzar mapes, Fa servir routing i mostra la ubicació actual
 * @version 1.1 12.04.2025
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  estilMapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contenidorCarrega: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface State {
  ubicacio: LocationObject | null;
  missatgeError: string | null;
  estaCarregant: boolean;
}

export class M08_Mapes extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      ubicacio: null,
      missatgeError: null,
      estaCarregant: true,
    };
  }

  async componentDidMount() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        this.setState({
          missatgeError: 'Es requereix permís per accedir a la ubicació',
          estaCarregant: false,
        });
        return;
      }

      const ubicacio = await Location.getCurrentPositionAsync({});
      this.setState({ ubicacio, estaCarregant: false });
    } catch (error) {
      console.error('Error en obtenir la ubicació:', error);
      this.setState({ missatgeError: 'Error en obtenir la ubicació', estaCarregant: false });
    }
  }

  render() {
    const { ubicacio, missatgeError, estaCarregant } = this.state;

    if (estaCarregant) {
      return (
        <View style={estils.contenidorCarrega}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Obtenint ubicació...</Text>
        </View>
      );
    }

    if (missatgeError) {
      return (
        <View style={estils.contenidor}>
          <Text>{missatgeError}</Text>
        </View>
      );
    }

    return (
      <View style={estils.contenidor}>
        {ubicacio ? (
          <MapView
            style={estils.estilMapa}
            initialRegion={{
              latitude: ubicacio.coords.latitude,
              longitude: ubicacio.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: ubicacio.coords.latitude,
                longitude: ubicacio.coords.longitude,
              }}
              title="La meva ubicació"
              description="Estic aquí ara mateix"
            />
          </MapView>
        ) : (
          <Text>No s'ha pogut obtenir la ubicació</Text>
        )}
      </View>
    );
  }
}
