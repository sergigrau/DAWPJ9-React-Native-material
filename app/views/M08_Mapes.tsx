import React from 'react';
import { StyleSheet, Dimensions, Text, View, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

/**
 * Classe que hereta de Component i que implementa un component
 * per a visualitzar mapes, Fa servir routing i mostra la ubicació actual
 * @version 1.1 13.04.2026
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
  mapsLoaded: boolean;
}

export class M08_Mapes extends React.Component<object, State> {
  private MapView: any = null;
  private Marker: any = null;
  constructor(props: object) {
    super(props);
    this.state = {
      ubicacio: null,
      missatgeError: null,
      estaCarregant: true,
      mapsLoaded: false,
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
      // Dynamically load react-native-maps only on native platforms to avoid web runtime errors
      if (Platform.OS !== 'web') {
        try {
          const maps = await import('react-native-maps');
          this.MapView = maps.default || maps.MapView || maps;
          this.Marker = maps.Marker;
          this.setState({ mapsLoaded: true });
        } catch (e) {
          console.warn("No s'ha pogut carregar react-native-maps:", e);
        }
      }
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

    // On web, avoid importing native map components — show a simple fallback
    if (Platform.OS === 'web') {
      return (
        <View style={estils.contenidor}>
          {ubicacio ? (
            <View style={{ padding: 20 }}>
              <Text>Mapa no disponible en web</Text>
              <Text>Latitude: {ubicacio.coords.latitude}</Text>
              <Text>Longitude: {ubicacio.coords.longitude}</Text>
            </View>
          ) : (
            <Text>No s'ha pogut obtenir la ubicació</Text>
          )}
        </View>
      );
    }

    const MapComponent = this.MapView;
    const MarkerComponent = this.Marker;

    return (
      <View style={estils.contenidor}>
        {ubicacio ? (
          MapComponent && MarkerComponent && this.state.mapsLoaded ? (
            <MapComponent
              style={estils.estilMapa}
              initialRegion={{
                latitude: ubicacio.coords.latitude,
                longitude: ubicacio.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MarkerComponent
                coordinate={{
                  latitude: ubicacio.coords.latitude,
                  longitude: ubicacio.coords.longitude,
                }}
                title="La meva ubicació"
                description="Estic aquí ara mateix"
              />
            </MapComponent>
          ) : (
            <View style={estils.contenidorCarrega}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={{ marginTop: 10 }}>Carregant mapa...</Text>
            </View>
          )
        ) : (
          <Text>No s'ha pogut obtenir la ubicació</Text>
        )}
      </View>
    );
  }
}
