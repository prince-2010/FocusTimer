import React, { useState } from 'react';
import { View, StyleSheet, Text,Vibration,Platform } from 'react-native';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import {ProgressBar} from 'react-native-paper';
import {Timing} from './Timing';
import {useKeepAwake} from 'expo-keep-awake';

const DEFAULT_TIME =  0.1;

export const Timer = ({ 
  focusSubject,
  onTimerEnd,
  clearSubject
  }) => {
  //Keep the screen awake (means it does not get sleep after sometime)
  useKeepAwake();

  const interval = React.useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [progress,setProgress] = useState(1);
  const [minutes,setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress)=>{
    setProgress(progress);
  }
  
  const vibrate=()=>{
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=>Vibration.vibrate(),1000);
      setTimeout(() => clearInterval(interval),5000);
    }
    else{
      Vibration.vibrate(5000);
    }
  }
  
  const changeTime=(min)=>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const onEnd=()=>{
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>

      <View style={styles.countdown}>
        <Countdown 
        minutes={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress}
        onEnd={onEnd}
         />
      </View>
      
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={styles.title}>Focusing On: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

     <View style={{paddingTop:spacing.lg}}>
        <ProgressBar
          progress={progress}
          color="white"
          style={{height:10}}
        />
      </View>
      
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}/>
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            size={100}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="start"
            size={90}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton
            title="-"
            size={60}
            onPress={() => clearSubject()}
          />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  task: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubject:{
    paddingLeft:20,
    paddingBottom:20
  },
});
