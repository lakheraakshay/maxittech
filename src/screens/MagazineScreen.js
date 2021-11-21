import React from "react";
import WebView from "react-native-webview";

function MagazineScreen() {
  // useEffect(async () => {
  //   const result = await axios.post('https://auroscholar.com/api/partnerapilogin.php', qs.stringify({
  //     'partner_id': '741',
  //     'partner_source': 'QUINZulSw2',
  //     'mobile_no': '8989802546',
  //     "student_class": "6"

  //   }))
  //   console.log(result.data, "this is if rame")
  //   if (result.data.type == "success") {
  //     setiframeValue(result.data.data)
  //     // const value = window.btoa(result.data['data']['sudent_registration_id']);
  //     const value = base64.encode(result.data['data']['sudent_registration_id']);
  //     console.log(value, "base 64")
  //     setSvalue(value)
  //   }
  // }, [])
  return (
    <>
      <WebView
        originWhitelist={["*"]}
        source={{uri: "https://www.quinkpost.com/Flipbook/flipbook.html"}}
        // source={{ uri: `https://auroscholar.com` }}
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
