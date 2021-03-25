import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class TextAnimator extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                <Text style={this.props.textStyle}>{this.props.content}</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({});