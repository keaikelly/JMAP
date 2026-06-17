import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createRoom } from "@/lib/rooms/api";

export default function CreateChatScreen() {
  const [roomName, setRoomName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreateRoom = async () => {
    const name = roomName.trim();

    if (!name) {
      Alert.alert("방 이름이 필요합니다.", "약속방 이름을 먼저 입력하세요.");
      return;
    }

    try {
      setSubmitting(true);
      const room = await createRoom({ roomName: name });
      router.replace({
        pathname: "/room/[roomId]",
        params: { roomId: room.id },
      });
    } catch (error) {
      Alert.alert(
        "방 생성 실패",
        error instanceof Error ? error.message : "방을 만들지 못했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.navButton}>
            <Ionicons name="chevron-back" size={18} color="#111827" />
          </Pressable>
          <View style={styles.topBarText}>
            <Text style={styles.eyebrow}>JMAP</Text>
            <Text style={styles.pageTitle}>새 방 만들기</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>방 이름을 작성해주세요</Text>
          <Text style={styles.subtitle}>
            방을 만든 뒤 안에서 채팅 캡처를 올리고 일정을 정리합니다.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>방 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="예: 여름 여행방"
              placeholderTextColor="#9CA3AF"
              value={roomName}
              onChangeText={setRoomName}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreateRoom}
            />
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={handleCreateRoom}
            disabled={submitting}
          >
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>
              {submitting ? "생성 중..." : "방 만들고 들어가기"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  screen: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 18,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarText: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 2,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  card: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 20,
    gap: 18,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  input: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
  },
  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
