import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';


export const FocusHistory = ({ focusHistory, onClear }) => {
  
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {
    return (
    <Text style={item.status>1 ? 
    {color : "red",fonSize: fontSizes.md}:
    {color:"green",fonSize: fontSizes.md}}
    > 
    {item.subject}
    </Text>);
  };

  return (
    <>
      <SafeAreaView style={styles.safeview}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things We have focused On:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />

            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="clear" onPress={()=>onClear()}/>
            </View>
            
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeview: {
    flex: 0.5,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fonSize: fontSizes.lg,
  },
  clearContainer:{
     alignItems:"center",
     padding:spacing.md,
  },
});
