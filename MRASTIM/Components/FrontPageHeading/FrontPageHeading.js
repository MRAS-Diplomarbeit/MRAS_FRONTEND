import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';

function AppText({children}) {
    return (
    <Text style={styles.frontpageheading}>{children}</Text>
    );
}

export default AppText;