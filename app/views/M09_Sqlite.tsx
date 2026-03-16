import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

/**
 * Classe que hereta de Component i que treballa amb el
 * component de SQLite. Les dades es mostren en una taula
 * @version 1.1 12.04.2025
 * @author sergi.grau@fje.edu
 */

const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textPeu: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  peu: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FA0',
  },
  taula: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  capcalera: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fila: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columnaId: {
    flex: 1,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  columnaNom: {
    flex: 2,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  columnaNota: {
    flex: 1,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  textColumna: {
    fontSize: 16,
    textAlign: 'center',
  },
  textCapcalera: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

interface Alumne {
  id: number;
  nom: string;
  nota: number;
}

interface State {
  alumnes: Alumne[];
  carregant: boolean;
  error: string | null;
}

export class M09_Sqlite extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      alumnes: [],
      carregant: true,
      error: null,
    };
  }

  componentDidMount() {
    SQLite.openDatabaseAsync('daw2')
      .then((db) => {
        db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS alumnes (id INTEGER PRIMARY KEY NOT NULL, nom TEXT NOT NULL, nota INTEGER);
          INSERT OR IGNORE INTO alumnes (id, nom, nota) VALUES (1,'sergi', 8);
          INSERT OR IGNORE INTO alumnes (id, nom, nota) VALUES (2,'joan', 6);
        `)
          .then(() => {
            console.log('taula creada i dades afegides');
            db.getAllAsync<Alumne>('SELECT * FROM alumnes')
              .then((resultat) => {
                this.setState({ alumnes: resultat, carregant: false });
                for (const alumne of resultat) {
                  console.log(alumne.id, alumne.nom, alumne.nota);
                }
              })
              .catch((error) => {
                console.log(error);
                this.setState({ error: 'Error al consultar dades', carregant: false });
              });
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error: 'Error al crear taula', carregant: false });
          });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: 'Error al obrir base de dades', carregant: false });
      });
  }

  render() {
    const { alumnes, carregant, error } = this.state;

    return (
      <View style={estils.contenidor}>
        <View style={estils.peu}>
          <Text style={estils.textPeu}>SQLITE</Text>
        </View>

        {carregant && <Text>Carregant dades...</Text>}

        {error && <Text style={{ color: 'red' }}>{error}</Text>}

        {!carregant && !error && (
          <ScrollView>
            <View style={estils.taula}>
              <View style={estils.capcalera}>
                <Text style={[estils.columnaId, estils.textCapcalera]}>ID</Text>
                <Text style={[estils.columnaNom, estils.textCapcalera]}>Nom</Text>
                <Text style={[estils.columnaNota, estils.textCapcalera]}>Nota</Text>
              </View>

              {alumnes.length > 0 ? (
                alumnes.map((alumne) => (
                  <View key={alumne.id} style={estils.fila}>
                    <Text style={[estils.columnaId, estils.textColumna]}>{alumne.id}</Text>
                    <Text style={[estils.columnaNom, estils.textColumna]}>{alumne.nom}</Text>
                    <Text style={[estils.columnaNota, estils.textColumna]}>{alumne.nota}</Text>
                  </View>
                ))
              ) : (
                <Text>No hi ha alumnes</Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
