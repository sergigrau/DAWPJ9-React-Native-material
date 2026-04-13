import React from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { CameraView, CameraType, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

/**
 * Classe que hereta de Component i que implementa un component
 * per a la càmera. Utilitza expo-camera v16+.
 * @version 3.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
  },
  preview: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    margin: 10,
    borderRadius: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

interface State {
  hasCameraPermission: boolean | null;
  hasMediaLibPermission: boolean | null;
  imageUri: string | null;
  facing: CameraType;
}

export class M07_Camera extends React.Component<object, State> {
  private cameraRef = React.createRef<CameraView>();

  constructor(props: object) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasMediaLibPermission: null,
      imageUri: null,
      facing: 'back',
    };
  }

  async componentDidMount() {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      this.setState({ hasCameraPermission: cameraStatus === 'granted' });

      const { status: mediaLibStatus } = await MediaLibrary.requestPermissionsAsync();
      this.setState({ hasMediaLibPermission: mediaLibStatus === 'granted' });

      if (mediaLibStatus === 'granted') {
        try {
          const { assets } = await MediaLibrary.getAssetsAsync({ first: 1 });
          if (assets.length > 0) {
            this.setState({ imageUri: assets[0].uri });
          }
        } catch (error) {
          console.log('Error carregant imatges:', error);
        }
      }
    } catch (error) {
      console.log('Error en componentDidMount:', error);
      this.setState({ hasCameraPermission: false });
    }
  }

  ferFoto = async (): Promise<void> => {
    if (this.cameraRef.current) {
      try {
        const photo = await this.cameraRef.current.takePictureAsync();
        if (!photo) return;
        console.log('Foto feta:', photo.uri);
        this.setState({ imageUri: photo.uri });

        if (this.state.hasMediaLibPermission) {
          const asset = await MediaLibrary.createAssetAsync(photo.uri);
          try {
            await MediaLibrary.createAlbumAsync('DAW2', asset, false);
            console.log("Imatge desada a l'àlbum DAW2");
          } catch (albumError) {
            console.log("Error creant l'àlbum, desant a la galeria:", albumError);
          }
        }
      } catch (error) {
        console.log('Error fent la foto:', error);
      }
    } else {
      console.log('Referència de càmera no disponible');
    }
  };

  render() {
    const { hasCameraPermission, imageUri, facing } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Sol·licitant permisos de càmera...</Text>
        </View>
      );
    }

    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No hi ha accés a la càmera</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={this.cameraRef} />

        <View style={styles.controls}>
          <Button title="Fes una foto" onPress={this.ferFoto} />
          <Button
            title="Canvia càmera"
            onPress={() => {
              this.setState({ facing: facing === 'back' ? 'front' : 'back' });
            }}
          />
        </View>

        {imageUri && (
          <View style={styles.preview}>
            <Text>Última foto:</Text>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          </View>
        )}
      </View>
    );
  }
}
