import React from "react";
import WebView from "react-native-webview";

function AboutScreen() {
  return (
      <WebView
        originWhitelist={["*"]}
        // source={{uri: "https://quinkpost.com/Flipbook/flipbook.html"}}
        source={{
          uri: `https://www.quinkpost.com/about`,
        }}
        style={{ flex: 1 }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        mixedContentMode="always"
      />
  );
}

export default AboutScreen;
