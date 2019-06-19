import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { TODO } from '../store/models'

const styles = StyleSheet.create({
  container: {
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },
})

interface Props {
  items: TODO[],
  onRemoveItem: (index: number) => void,
}

export default class List extends Component<Props> {
  renderItem = (item: TODO, i: number) => {
    const {onRemoveItem} = this.props
    return (
      <View key={i} style={styles.item}>
        <Text> {item.text} </Text>
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => onRemoveItem(i)}>
            <Text style={styles.remove}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {items} = this.props
    return (
      <View>
        <ScrollView style={styles.container}>
          {items.map(this.renderItem)}
        </ScrollView>
      </View>
    )
  }
}
