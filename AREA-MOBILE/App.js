import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'http://localhost:3000/' }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

export default App;