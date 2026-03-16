import React from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { CameraView, CameraType, Camera } from 'expo-camera';

/**
 * Classe que hereta de Component i que implementa un component
 * independent en l'app. És un component bàsic sense estils
 * Fa servir routing
 * expo install expo-camera
 * @version 3.0 (legacy backup)
 * @author sergi.grau@fje.edu
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    width: 200,
    height: 40,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
});

interface State {
  hasCameraPermission: boolean | null;
  facing: CameraType;
  path: string | null;
}

export class M07_Camera extends React.Component<object, State> {
  private camera = React.createRef<CameraView>();

  constructor(props: object) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      facing: 'back',
      path: null,
    };
  }

  ferFoto = async (): Promise<void> => {
    try {
      const data = await this.camera.current?.takePictureAsync();
      if (data) {
        this.setState({ path: data.uri });
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  async componentDidMount() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <CameraView style={{ flex: 1 }} facing={this.state.facing} ref={this.camera}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableHighlight
                style={styles.capture}
                onPress={this.ferFoto.bind(this)}
                underlayColor="rgba(255, 255, 255, 0.5)"
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Fer foto </Text>
              </TouchableHighlight>
              <TouchableOpacity
                style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    facing: this.state.facing === 'back' ? 'front' : 'back',
                  });
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );
    }
  }
}
