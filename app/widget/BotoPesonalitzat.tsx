import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

/**
 * Classe que te un Component BotoPersonalitzat
 * @version 2.0 12.04.2025
 * @author sergi.grau@fje.edu
 */

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const BotoPersonalitzat: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
