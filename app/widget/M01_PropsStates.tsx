import React from 'react';
import { Text, View } from 'react-native';

/**
 * Classe que hereta de Component i que permet utilitzar
 * propietats inmutables i estats
 * @version 1.0 13.04.2026
 * @author sergi.grau@fje.edu
 */

interface Props {
  missatge: string;
}

interface State {
  logat: boolean;
}

export class M01_PropsStates extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { logat: false };
  }

  canviarLog = (): void => {
    if (this.state.logat) {
      this.setState({ logat: false });
    } else {
      this.setState({ logat: true });
    }
  };

  render() {
    const missatge = this.state.logat ? 'Usuari anònim' : this.props.missatge;
    return (
      <View>
        <Text onPress={this.canviarLog}>{missatge}</Text>
      </View>
    );
  }
}
