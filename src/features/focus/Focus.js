import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import {fontSizes,spacing} from '../../utils/sizes';

export const Focus = ({addSubject}) => {

  const [subject,setSubject] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>

        <Text style={styles.title}>What would you like to focus on?</Text>
        
        <View style={styles.inputContainer}>
          <TextInput style={{flex:1,marginRight:spacing.sm} } onSubmitEditing={
            ({nativeEvent})=> 
               setSubject(nativeEvent.text)
            }
      
          />
          <RoundedButton size={60} title="+" 
          onPress={()=>{
            addSubject(subject);
          }} />
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection:"row",
    alignItems:"center",
  },
});
