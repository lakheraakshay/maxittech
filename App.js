import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import QuinkStackNavigator from "./src/navigation/Navigator";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import rootReducer from "./src/components/Reducer";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "./store";

const App = () => {
  // const store = createStore(rootReducer);
  let [fontLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    Montserrat_400Regular,
  });
  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    // <Provider store={store}>
      // <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <QuinkStackNavigator />
        
        </NavigationContainer>
      // </PersistGate>
    // </Provider>
  );
};

export default App;


/*

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Block from './Block';
import Text from './atomic/ions/Text';
import Icon from './atomic/ions/Icon';
import IonIcon from '@expo/vector-icons/Ionicons';
import GalioTheme, { withGalio } from './theme';
import { TouchableOpacity } from 'react-native';

function Card({
  avatar,
  borderless, 
  caption, 
  captionColor,
  card, 
  children,
  footerStyle,
  image,
  imageBlockStyle,
  imageStyle,
  location, 
  locationColor, 
  shadow,
  style, 
  styles,
  title, 
  titleColor,
  theme,
  onPressFunction,
  onSettingPress,
  openDetailScreen,
  ...props 
}) {
  function renderImage() {
    if (!image) return null;
    return (
      <TouchableOpacity card onPress={openDetailScreen} style={[styles.imageBlock, imageBlockStyle]}>
        <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
      </TouchableOpacity>
    );
  }

  function renderAvatar() {
    if (!avatar) return null;
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
    )
  }

  function renderLocation() {
    if (!location) return null;
    if (typeof location !== 'string') {
      return location;
    }
    return (
          <IonIcon
            name='ellipsis-horizontal-outline'
            color={locationColor || theme.COLORS.SECONDARY}
            size={theme.SIZES.FONT * 1.2}
            onPress={onSettingPress}
            style={{position: 'absolute', right: 5, alignSelf: 'center'}}
          />
    );
  }

  function renderAuthor() {
    return (
      <Block flex row style={[styles.footer, footerStyle]} space="between">
        <Block flex={0.3}>{renderAvatar()}</Block>
        <Block flex={1.5}>
          <Block style={styles.title}>
            <Text size={theme.SIZES.FONT * 0.875} color={titleColor}>
              {title}
            </Text>
          </Block>
          <Block row space="between">
            <Block row right>
              <Text p muted size={theme.SIZES.FONT * 0.875} color={captionColor}>
                {caption}
              </Text>
            </Block>
            {renderLocation()}
          </Block>
        </Block>
      </Block>
    );
  }


  const styleCard = [borderless && { borderWidth: 0 }, style];

  return (
    <Block {...props} card={card} shadow={shadow} style={styleCard}>
      {renderImage()}
      {renderAuthor()}
      {children}
    </Block>
  );
}

Card.defaultProps = {
  card: true,
  shadow: true,
  borderless: false,
  styles: {},
  theme: GalioTheme,
  title: '',
  titleColor: '',
  caption: '',
  captionColor: '',
  footerStyle: {},
  avatar: '',
};

Card.propTypes = {
  card: PropTypes.bool,
  shadow: PropTypes.bool,
  borderless: PropTypes.bool,
  styles: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  caption: PropTypes.string,
  captionColor: PropTypes.string,
  avatar: PropTypes.string,
  footerStyle: PropTypes.object,
};

const styles = theme =>
  StyleSheet.create({
    card: {
      borderWidth: 0,
      backgroundColor: theme.COLORS.WHITE,
      width: theme.SIZES.CARD_WIDTH,
      marginVertical: theme.SIZES.CARD_MARGIN_VERTICAL,
    },
    footer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: theme.SIZES.CARD_FOOTER_HORIZONTAL,
      paddingVertical: theme.SIZES.CARD_FOOTER_VERTICAL,
      backgroundColor: theme.COLORS.TRANSPARENT,
      zIndex: 1,
    },
    avatar: {
      width: theme.SIZES.CARD_AVATAR_WIDTH,
      height: theme.SIZES.CARD_AVATAR_HEIGHT,
      borderRadius: theme.SIZES.CARD_AVATAR_RADIUS,
    },
    title: {
      justifyContent: 'center',
    },
    imageBlock: {
      borderWidth: 0,
      overflow: 'hidden',
    },
    image: {
      width: 'auto',
      height: theme.SIZES.CARD_IMAGE_HEIGHT,
    },
    round: {
      borderRadius: theme.SIZES.CARD_ROUND,
    },
    rounded: {
      borderRadius: theme.SIZES.CARD_ROUNDED,
    },
  });

export default withGalio(Card, styles);

*/