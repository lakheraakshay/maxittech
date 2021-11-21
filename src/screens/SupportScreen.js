import React, { Component } from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import { LinearGradient } from "expo-linear-gradient";

const BACON_IPSUM1 =
  "A content creator can participate in any challenge where a topic will be given to them and the creator can create any type of content relatable to that topic and then the result will be announced after the deadline. You can get fiscal incentive, social media promotion, content published in Q-Magazine, etc."
const BACON_IPSUM2 =
  "We will be approaching some famous content creators from all around the globe. They will be provided a premium member dashboard through which they can upload some content available for all users and some for only premium members. You can also interact with famous creators to get guidance. Their will be a lot of benefits and this feature will be available by the end of September."
const BACON_IPSUM3 =
  "In Q-Magazine their will be transcribed interviews of entrepreneurs, social activists, etc. You can also find articles, short stories, poems, meme gallery, etc. This feature will be available by the end of July. ";

const BACON_IPSUM4 =
  "Through this features user can win badges through which you can get fiscal incentives, social media promotion or content publishing in magazines. To get badges you have to attain goals provided by us like posting content regulary for 7 days. This feature will be available by the end of August.";
const BACON_IPSUM5 =
  "Select Language as Hindi or English while creating content. We are working on availing content in native language. This feature will be available by the end of June. Then you will be able to create & view content in any language.";

const CONTENT = [
  {
    title: "What are Quink Challenges?",
    content: BACON_IPSUM1,
  },
  {
      title: "What is Q-Magazine ?",
      content: BACON_IPSUM3,
    },
    {
        title: "What are Quink Badges ?",
        content: BACON_IPSUM4,
    },
    {
        title: "How to Create Content in any Language ?",
        content: BACON_IPSUM5,
    },
    {
      title: "What are benefits of Premium Membership ?",
      content: BACON_IPSUM2,
    },
];

export default class SupportScreen extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text
          style={[
            styles.headerText,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {section.title}
        </Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <LinearGradient
        colors={["#283c86", "#667db6", "#a8c0ff"]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
          <Text style={styles.title}>FAQS</Text>

          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e6fffd',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 60,
    color: "#f2f2f2",
  },
  activeText: {
    color: "#000",
  },
  inactiveText: {
    color: "#f2f2f2",
  },
  header: {
    backgroundColor: "#e6fffd",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#a8c0ff",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,0)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#e6fffd",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
