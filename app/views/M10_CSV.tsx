import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

/**
 * Classe que hereta de Component i que implementa un component
 * que llegeix un csv de l'app
 * @version 1.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  capçalera: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  columna: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  textColumna: {
    textAlign: 'center',
  },
  textCapçalera: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  missatgeError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

const csvExemple = `nom,edat,ciutat
Pere,27,Barcelona
Maria,32,Girona
Joan,45,Tarragona
Montse,29,Lleida
`;

interface State {
  data: Record<string, string>[];
  error: string | null;
  carregant: boolean;
}

export class M10_CSV extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      error: null,
      carregant: true,
    };
  }

  async componentDidMount() {
    try {
      try {
        const asset = Asset.fromModule(require('../../assets/dades.csv'));
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        if (!uri) throw new Error('No s\'ha obtingut URI de l\'asset CSV: ' + JSON.stringify(asset));

        const fileContent = await FileSystem.readAsStringAsync(uri);
        if (!fileContent) throw new Error('Fitxer CSV buit llegit des de: ' + uri);
        this.processarCSV(fileContent);
      } catch (error) {
        console.log('Error al carregar el fitxer CSV:', error);
        this.processarCSV(csvExemple);
      }
    } catch (error) {
      console.error('Error general:', error);
      this.setState({ error: 'Error al processar les dades', carregant: false });
    }
  }

  processarCSV(contingutCSV: string): void {
    Papa.parse<Record<string, string>>(contingutCSV, {
      header: true,
      complete: (results) => {
        const filtered = results.data.filter((row) =>
          Object.values(row).some((v) => v !== null && v !== undefined && String(v).trim() !== '')
        );
        console.log('Dades processades:', results.data, '-> filtrades:', filtered);
        this.setState({
          data: filtered,
          carregant: false,
          error: results.errors.length > 0 ? 'Hi ha errors en el format CSV' : null,
        });
      },
      error: (error: Error) => {
        console.error('Error al analitzar CSV:', error);
        this.setState({ error: 'Error al analitzar CSV', carregant: false });
      },
    });
  }

  render() {
    const { data, error, carregant } = this.state;
    const capçaleres = data.length > 0 ? Object.keys(data[0]) : [];

    return (
      <ScrollView style={estils.contenidor}>
        {carregant && <Text>Carregant dades...</Text>}

        {error && <Text style={estils.missatgeError}>{error}</Text>}

        {!carregant && !error && (
          <>
            <View style={[estils.fila, estils.capçalera]}>
              {capçaleres.map((capçalera, index) => (
                <View key={index} style={estils.columna}>
                  <Text style={estils.textCapçalera}>{capçalera}</Text>
                </View>
              ))}
            </View>

            {data.map((fila, indexFila) => (
              <View key={indexFila} style={estils.fila}>
                {capçaleres.map((capçalera, indexColumna) => (
                  <View key={indexColumna} style={estils.columna}>
                    <Text style={estils.textColumna}>{fila[capçalera]}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    );
  }
}
