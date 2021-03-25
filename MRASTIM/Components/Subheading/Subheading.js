import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';

function Subheading({children}) {
    return (
    <Text style={styles.subheading}>{children}</Text>
    );
}

export default Subheading;