import React from "react";
import WebView from "react-native-webview";

function MagazineScreen() {
  return (
    <>
      <WebView
        originWhitelist={["*"]}
        source={{uri: "https://quinktrendingkeyword.com/about.html"}}
        style={{ flex: 1 }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        mixedContentMode="always"
      />
    </>
  );
}

export default MagazineScreen;
