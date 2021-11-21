import React from "react";
import {
  Appearance,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { XMath } from "@wxik/core";
import Modal from "react-native-modal";
import { InsertLinkModal } from "./InsertLink";
import { EmojiView } from "./Emoji";
import * as ImagePicker from "expo-image-picker";

const imageList = [
  "https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg",
  "https://pbs.twimg.com/profile_images/1242293847918391296/6uUsvfJZ.png",
  "https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg",
  "https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg",
];
const initHTML = `<br/>`;

const phizIcon = require("../../assets/imgs/emojiicon.png");
const htmlIcon = require("../../assets/imgs/youtube.png");

class Postcms extends React.Component {
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);
    // this.bodyContent=
    const that = this;
    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = that?.createContentStyle(theme);
    const bodyContent = that?.bodyContent
    that.richHTML = '';
    that.ImageURL = "";
    that.YoutubeURL = "";
    (that.setLinkImage = ""),
      (that.state = {
        bodyContent: bodyContent,
        theme: theme,
        contentStyle,
        ImageModalVisible: false,
        YoutubeModalVisible: false,
        emojiVisible: false,
        disabled: false,
        toggleValue: false,
        // refreshScreen: this.refreshScreen.bind(this),
      });
    // that.refreshScreen = that.refreshScreen.bind(that)
    that.editorFocus = false;
    that.onHome = that?.onHome;
    that.save = that?.save;
    that.onTheme = that?.onTheme;
    that.onPressAddImage = that?.onPressAddImage;
    that.onInsertLink = that?.onInsertLink;
    that.onLinkDone = that?.onLinkDone;
    that.themeChange = that?.themeChange;
    // that.toggleValue=that?.toggleValue
    that.handleChange = that?.handleChange;
    that.handleHeightChange = that?.handleHeightChange;
    that.insertEmoji = that?.insertEmoji;
    that.insertHTML = that?.insertHTML;
    that.insertVideo = that?.insertVideo;
    that.handleEmoji = that?.handleEmoji;
    that.onDisabled = that?.onDisabled;
    that.editorInitializedCallback = that?.editorInitializedCallback;
  }

  componentDidMount() {
    Appearance.addChangeListener(this?.themeChange);
    Keyboard.addListener("keyboardDidShow", this?.onKeyShow);
    Keyboard.addListener("keyboardDidHide", this?.onKeyHide);
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener("keyboardDidShow", this.onKeyShow);
    Keyboard.removeListener("keyboardDidHide", this.onKeyHide);
  }

  handleUpload = async (image) => {
    try {
      // console.log("handleUpload called")
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "quinkpost");
      data.append("cloud_name", "Quink-Post");
      console.log("before cloud post");

      fetch("https://api.cloudinary.com/v1_1/quink-post/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.secure_url, "this is data from cloudinakdfj");
          // this?.setState({ setLinkImage: data.url });
          this?.richText?.current?.insertImage(`${data?.secure_url}`);
        })
        .catch((e) => console.log(e, "error from the n catch"));
    } catch (e) {
      console.log(e, "error while sending in cloudinary");
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const newFile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test/${result.uri.split(".")[1]}`,
      };
      this.handleUpload(newFile);

      console.log(this?.setLinkImage);
    }
  };

  onKeyHide = () => { };

  onKeyShow = () => {
    TextInput.State.currentlyFocusedInput() &&
      this.setState({ emojiVisible: false });
  };

  editorInitializedCallback() {
    this?.richText?.current?.registerToolbar(function (items) {
      // console.log('Toolbar click, selected items (insert end callback):', items);
    });
  }

  /**
   * theme change to editor color
   * @param colorScheme
   */
  themeChange({ colorScheme }) {
    const theme = colorScheme;
    // const contentStyle = this.createContentStyle(theme);
    const contentStyle = {
      backgroundColor: "#2e3847",
      color: "#fff",
      placeholderColor: "gray",
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;", // initial valid
    };
    // this.setState({ theme, contentStyle });
  }

  async save(value) {
    // console.log(value, "<<<this i svale")
    let html = await this?.richText?.current?.getContentHtml();
    await AsyncStorage.setItem("cmsData", JSON.stringify(html));
    // console.log("((", html, "))")

    // console.log()
    // const check = this.state.toggleValue
    // await AsyncStorage.setItem("toggleValue", JSON.stringify(check))
    // this.setState({ toggleValue: !this.toggleValue })
    // this.setState({ toggleValue: !this.state.toggleValue })
    // console.log(">>ToggleValue>>", this.state.toggleValue)

    // console.log(html);
    // this.props.navigation.navigate("ContentPreview", {
    //   html: html,
    //   css: getContentCSS(),
    // });
  }

  /**
   * editor change data
   * @param {string} html
   */
  handleChange(html) {
    this.richHTML = html;
    this.setState({ a: Math.random });
  }

  /**
   * editor height change
   * @param {number} height
   */
  handleHeightChange(height) {
    console.log("editor height change:", height);
  }

  insertEmoji(emoji) {
    this?.richText.current.insertText(emoji);
    this?.richText.current.blurContentEditor();
  }

  handleEmoji() {
    const { emojiVisible } = this.state;
    Keyboard.dismiss();
    this?.richText?.current?.blurContentEditor();
    this.setState({ emojiVisible: !emojiVisible });
  }

  insertVideo() {
    this?.richText?.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4",
      "width: 50%;"
    );
  }

  fontSize = () => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    const size = [1, 2, 3, 4, 5, 6, 7];
    this?.richText?.current?.setFontSize(size[XMath.random(size.length - 1)]);
  };

  insertHTML() {
    console.log(this?.YoutubeURL);

    this?.richText?.current?.insertHTML(
      `<div style="padding:10px 0;" contentEditable="false">
                <iframe  width="100%" height="220"  src="https://www.youtube.com/embed/${this?.YoutubeURL}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`
    );

    this?.setState({ YoutubeModalVisible: false });
  }

  setImageURL(url) {
    this.ImageURL = url;
    console.log(this.ImageURL);
  }

  setYoutubeURL(url) {
    this.YoutubeURL = url;
    console.log(this.YoutubeURL);
  }

  onPressImageModal() {
    this.setState({ ImageModalVisible: true });
  }

  onPressYoutubeModal() {
    this.setState({ YoutubeModalVisible: true });
  }

  onPressAddImage() {
    console.log(this.ImageURL);
    this?.richText.current.insertImage(`${this.ImageURL}`, "background: gray;");
    this.setState({ ImageModalVisible: false });
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }

  onInsertLink() {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    this?.linkModal?.current?.setModalVisible(true);
  }

  onLinkDone({ title, url }) {
    this?.richText?.current?.insertLink(title, url);
  }

  onHome() {
    this.props.navigation.push("index");
  }

  setImageModalVisible(visible) {
    this?.setState({ ImageModalVisible: visible });
  }

  setYoutubeModalVisible(visible) {
    this?.setState({ YoutubeModalVisible: visible });
  }

  createContentStyle(theme) {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: "#2e3847",
      color: "#fff",
      placeholderColor: "gray",
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: "font-size: 16px; min-height: 200px; height: 100%;", // initial valid
    };
    if (theme === "light") {
      contentStyle.backgroundColor = "#fff";
      contentStyle.color = "#000033";
      contentStyle.placeholderColor = "#a9a9a9";
    }
    return contentStyle;
  }

  onTheme() {
    let { theme } = this?.state;
    theme === "light" ? "dark" : "light";
    let contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  }

  onDisabled() {
    this.setState({ disabled: !this.state.disabled });
  }

  handlePaste = (data) => {
    console.log("Paste:", data);
  };

  handleKeyUp = (data) => {
    // console.log('KeyUp:', data);
  };

  handleKeyDown = (data) => {
    // console.log('KeyDown:', data);
  };

  handleMessage = ({ type, id, data }) => {
    let index = 0;
    switch (type) {
      case "ImgClick":
        this?.richText?.current?.commandDOM(
          `$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`
        );
        break;
      case "TitleClick":
        const color = ["red", "blue", "gray", "yellow", "coral"];

        // command: $ = document.querySelector
        this?.richText?.current?.commandDOM(
          `$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`
        );
        break;
      case "SwitchImage":
        break;
    }
    console.log("onMessage", type, id, data);
  };

  handleFocus = () => {
    this.editorFocus = true;
  };

  handleBlur = () => {
    this.editorFocus = false;
  };

  render() {
    let that = this;
    const { contentStyle, theme, emojiVisible, disabled } = that?.state;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const dark = theme === "dark";
    const { ImageModalVisible } = that?.state;
    const { YoutubeModalVisible } = that?.state;

    console.log("render");

    return (
      <SafeAreaView style={[styles.container, dark && styles.darkBack]}>
        <InsertLinkModal
          placeholderColor={placeholderColor}
          color={color}
          backgroundColor={backgroundColor}
          onDone={({ title, url }) => that.onLinkDone({ title, url })}
          ref={that?.linkModal}
        />
        {/* <View style={styles.nav}>
          <Button title={"HOME"} onPress={that?.onHome} />
          <Button title="Preview" onPress={() => that.save()} />
        </View> */}
        <ScrollView
          style={[styles.scroll, dark && styles.scrollDark]}
          keyboardDismissMode={"none"}
        >
          <View style={[styles.topVi, dark && styles.darkBack]}>
            {/* <View style={styles.item}>
                            <Text style={{color}}>To: </Text>
                            <TextInput
                                autoCorrect={false}
                                style={[styles.input, {color}]}
                                placeholderTextColor={placeholderColor}
                                placeholder={'stulip@126.com'}
                            />
                        </View>
                        <View style={styles.item}>
                            <Text style={{color}}>Subject: </Text>
                            <TextInput
                                autoCorrect={false}
                                style={[styles.input, {color}]}
                                placeholderTextColor={placeholderColor}
                                placeholder="Rich Editor Bug 😀"
                            />
                        </View> */}
            {/* <View style={styles.item}>
                            <Button title={theme} onPress={that?.onTheme} />
                            <Button title={disabled ? 'enable' : 'disable'} onPress={that?.onDisabled} />
                        </View> */}
          </View>
          <RichToolbar
            style={[styles.richBar, dark && styles.richBarDark]}
            flatContainerStyle={styles.flatStyle}
            editor={that?.richText}
            disabled={disabled}
            selectedIconTint={"#2095F2"}
            disabledIconTint={"#bfbfbf"}
            onPressAddImage={() => that.onPressImageModal()}
            onInsertLink={() => that?.onInsertLink()}
          />
          <RichEditor
            // initialFocus={true}
            disabled={disabled}
            editorStyle={{ contentStyle }} // default light style
            ref={that?.richText}
            showSoftInputOnFocus={false}
            style={styles.rich}
            placeholder={"please input content"}
            initialContentHTML={that.props.bodyContent ? that.props.bodyContent : initHTML}
            editorInitializedCallback={() => that?.editorInitializedCallback()}
            onChange={(value) => that?.save(value)}
            onHeightChange={() => that?.handleHeightChange()}
            onPaste={() => that?.handlePaste()}
            onKeyUp={() => that?.handleKeyUp()}
            onKeyDown={() => that?.handleKeyDown()}
            onMessage={() => that?.handleMessage()}
            onFocus={() => that?.handleFocus()}
            onBlur={() => that?.handleBlur()}
            pasteAsPlainText={true}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <RichToolbar
            style={[styles.richBar, dark && styles.richBarDark]}
            flatContainerStyle={styles.flatStyle}
            editor={that?.richText}
            disabled={disabled}
            // iconTint={color}
            selectedIconTint={"#2095F2"}
            disabledIconTint={"#bfbfbf"}
            onPressAddImage={() => that.pickImage()}
            // onPressAddImage={() => that.pickImage()}
            onInsertLink={() => that?.onInsertLink()}
            // iconSize={24}
            // iconGap={10}
            actions={[
              actions.undo,
              actions.redo,
              actions.insertVideo,
              actions.insertImage,
              actions.setStrikethrough,
              actions.checkboxList,
              actions.insertOrderedList,
              actions.blockquote,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.code,
              actions.line,
              actions.heading1,
              actions.heading4,
              "insertEmoji",
              "insertHTML",
              "fontSize",
            ]} // default defaultActions
            iconMap={{
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
              ),
              [actions.heading4]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
              ),
              insertEmoji: phizIcon,
              insertHTML: htmlIcon,
            }}
            insertHTML={() => that.onPressYoutubeModal()}
            insertEmoji={() => that.handleEmoji()}
            insertVideo={() => that.onPressImageModal()}
            fontSize={() => that.fontSize()}
          />
          {emojiVisible && (
            <EmojiView onSelect={(emoji) => that?.insertEmoji(emoji)} />
          )}
        </KeyboardAvoidingView>

        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          coverScreen={false}
          isVisible={ImageModalVisible}
          backdropColor={color}
          onBackdropPress={() => that?.setImageModalVisible(false)}
          backdropOpacity={0.3}
        // onBackdropPress={() => this?.setModalVisible(false)}
        >
          <View style={[styles.dialog, { backgroundColor }]}>
            <View style={styles.linkTitle}>
              <Text style={{ color }}>Insert Google Image Link</Text>
            </View>
            <View style={styles.item11}>
              <TextInput
                style={[styles.input11, { color }]}
                placeholderTextColor={placeholderColor}
                placeholder="http(s)://"
                onChangeText={(text) => that?.setImageURL(text)}
              />
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => that?.setImageModalVisible(false)}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => that?.onPressAddImage()}
              >
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          coverScreen={false}
          isVisible={YoutubeModalVisible}
          backdropColor={color}
          onBackdropPress={() => that?.setYoutubeModalVisible(false)}
          backdropOpacity={0.3}
        // onBackdropPress={() => this?.setModalVisible(false)}
        >
          <View style={[styles.dialog2, { backgroundColor }]}>
            <View style={styles.linkTitle}>
              <Text style={{ color }}>Insert Youtube Video Link</Text>
            </View>
            <View style={styles.item11}>
              <TextInput
                style={[styles.input11, { color }]}
                placeholderTextColor={placeholderColor}
                placeholder="Remove https://youtu.be/ e.g. f07EHw7EtAo"
                onChangeText={(text) => that?.setYoutubeURL(text)}
              />
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => that?.setYoutubeModalVisible(false)}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => that?.insertHTML()}
              >
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  topVi: {
    backgroundColor: "#fafafa",
  },
  richBar: {
    borderColor: "#efefef",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: "#191d20",
    borderColor: "#696969",
  },
  scroll: {
    backgroundColor: "#ffffff",
  },
  scrollDark: {
    backgroundColor: "#2e3847",
  },
  darkBack: {
    backgroundColor: "#191d20",
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: "center",
    color: "#515156",
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
  item11: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input11: {
    flex: 1,
    height: 40,
  },
  linkTitle: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b3b3b3",
  },
  dialog: {
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },

  dialog2: {
    borderRadius: 8,
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },

  buttonView: {
    flexDirection: "row",
    height: 36,
    paddingVertical: 4,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#286ab2",
  },
});

export default Postcms;