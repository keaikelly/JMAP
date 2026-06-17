import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useScheduleStore } from "@/context/schedule-store";

export default function HomeScreen() {
  const { plans } = useScheduleStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>JMAP</Text>
            <Text style={styles.headerTitle}>약속방 선택</Text>
          </View>
          <Pressable
            style={styles.headerAction}
            onPress={() => router.push("/createChat")}
          >
            <Ionicons name="add" size={18} color="#111827" />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>채팅방 단위로 계획을 관리합니다</Text>
          <Text style={styles.heroSubtitle}>
            방을 만들거나 기존 방을 고르고, 일정 정리를 시작하세요.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/createChat")}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.primaryButtonText}>새 방 만들기</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>내 방 목록</Text>
          <Text style={styles.sectionMeta}>{plans.length}개</Text>
        </View>

        {plans.length ? (
          <View style={styles.roomList}>
            {plans.map((plan) => (
              <Pressable
                key={plan.id}
                style={styles.roomCard}
                onPress={() =>
                  router.push({
                    pathname: "/createChat",
                    params: { roomId: plan.id },
                  })
                }
              >
                <View style={styles.roomPreview}>
                  <Image
                    source={{ uri: plan.imageUri }}
                    style={styles.roomPreviewImage}
                    contentFit="cover"
                  />
                </View>

                <View style={styles.roomBody}>
                  <View style={styles.roomTopRow}>
                    <View style={styles.roomBadge}>
                      <Text style={styles.roomBadgeText}>ROOM</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={16}
                      color="#9CA3AF"
                    />
                  </View>

                  <Text style={styles.roomTitle}>{plan.roomName}</Text>
                  <Text style={styles.roomMeta}>
                    일정 {plan.schedules.length}개 · 최근 저장
                  </Text>

                  <View style={styles.roomInfoRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#2563EB"
                    />
                    <Text style={styles.roomInfoText}>
                      {plan.schedules[0]?.title || "저장된 일정"}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="chatbubbles-outline" size={22} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>아직 만든 방이 없습니다</Text>
            <Text style={styles.emptySubtitle}>
              새 방을 만든 뒤 캡처를 올리고 일정을 정리하세요.
            </Text>
          </View>
        )}
      </ScrollView>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 34,
    gap: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    borderRadius: 24,
    backgroundColor: "#111827",
    padding: 20,
    gap: 12,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "rgba(255,255,255,0.72)",
  },
  primaryButton: {
    marginTop: 6,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  roomList: {
    gap: 12,
  },
  roomCard: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  roomPreview: {
    backgroundColor: "#F3F4F6",
  },
  roomPreviewImage: {
    width: "100%",
    height: 148,
  },
  roomBody: {
    padding: 16,
    gap: 10,
  },
  roomTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#DBEAFE",
  },
  roomBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  roomMeta: {
    fontSize: 13,
    color: "#6B7280",
  },
  roomInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roomInfoText: {
    flex: 1,
    fontSize: 13,
    color: "#4B5563",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  emptySubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
    textAlign: "center",
  },
  secondaryButton: {
    marginTop: 6,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
});
