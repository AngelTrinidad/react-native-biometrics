import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ReactNativeBiometrics from 'react-native-biometrics';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const createSignature = () => {
    ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
      ({publicKey}) => {
        console.log(publicKey);

        let epochTimeSeconds = Math.round(
          new Date().getTime() / 1000,
        ).toString();
        let payload = epochTimeSeconds + 'this is a message';

        ReactNativeBiometrics.createSignature({
          promptMessage: 'Sign in',
          payload: payload,
        }).then(({success, signature}) => {
          if (success) {
            console.log(signature, payload);
          }
        });
      },
    );
  };

  const handlePress = async () => {
    const {available, biometryType} =
      await ReactNativeBiometrics.isSensorAvailable();

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('TouchID is supported');
      createSignature();
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('FaceID is supported');
      createSignature();
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('Biometrics is supported');
      createSignature();
    } else {
      console.log('Biometrics not supported');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={{marginTop: 24}}>
          <Button onPress={handlePress} title="Activar Biometrics" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
