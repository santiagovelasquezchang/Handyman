// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/chat/ChatScreen.js  –  Shared by Client and Tasker
//  Params: { conversationId, participantName, participantAvatar }
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CHAT_MESSAGES } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// ── Message bubble ────────────────────────────────────────────────────────────
function Bubble({ message }) {
  const isClient = message.sender === 'client';
  return (
    <View style={[styles.bubbleRow, isClient ? styles.bubbleRowRight : styles.bubbleRowLeft]}>
      <View style={[styles.bubble, isClient ? styles.bubbleClient : styles.bubbleTasker]}>
        <Text style={[styles.bubbleText, isClient ? styles.bubbleTextClient : styles.bubbleTextTasker]}>
          {message.text}
        </Text>
        <Text style={[styles.bubbleTime, isClient ? styles.bubbleTimeClient : styles.bubbleTimeTasker]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ChatScreen({ navigation, route }) {
  const { conversationId, participantName, participantAvatar } = route.params;
  const insets = useSafeAreaInsets();

  const rawMessages = CHAT_MESSAGES[conversationId] ?? [];
  const [messages, setMessages]   = useState([...rawMessages].reverse());
  const [inputText, setInputText] = useState('');
  const listRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Image source={{ uri: participantAvatar }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{participantName}</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </View>
      ),
      headerStyle: { backgroundColor: COLORS.white },
      headerShadowVisible: false,
      headerTintColor: COLORS.primary,
    });
  }, [navigation, participantName, participantAvatar]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    const newMsg = {
      id: `m${Date.now()}`,
      text,
      sender: 'client',
      time: 'Now',
    };
    setMessages((prev) => [newMsg, ...prev]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Bubble message={item} />}
        inverted
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textDisabled}
            multiline
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
        </View>
        <TouchableOpacity
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
          onPress={sendMessage}
          activeOpacity={0.8}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Header
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.border,
  },
  headerName: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  headerStatus: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: COLORS.success,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  // Bubbles
  bubbleRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  bubbleRowRight: {
    justifyContent: 'flex-end',
  },
  bubbleRowLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: RADIUS.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...SHADOW.card,
  },
  bubbleClient: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  bubbleTasker: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontFamily: FONTS.family,
    fontSize: 14,
    lineHeight: 21,
  },
  bubbleTextClient: {
    color: COLORS.white,
  },
  bubbleTextTasker: {
    color: COLORS.textPrimary,
  },
  bubbleTime: {
    fontFamily: FONTS.family,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
  bubbleTimeClient: {
    color: 'rgba(255,255,255,0.6)',
  },
  bubbleTimeTasker: {
    color: COLORS.textSecondary,
  },

  // Footer input
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    ...SHADOW.bar,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: RADIUS.xl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  input: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
});
