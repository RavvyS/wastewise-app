// screens/home/HomeScreen.js - Main Dashboard Screen
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// Import utilities and styles
import { getAllWasteLogs } from "../../utils/database";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalLogs: 0,
    thisWeek: 0,
    recyclableCount: 0,
    ecoScore: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const logs = await getAllWasteLogs();

      // Compute simple stats
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeekLogs = logs.filter(
        (l) => new Date(l.created_at) >= weekAgo
      );
      const recyclableCount = logs.filter((l) => l.recyclable).length || 0;
      const ecoScore = Math.round(recyclableCount * 10 + logs.length * 3);

      setStats({
        totalLogs: logs.length,
        thisWeek: thisWeekLogs.length,
        recyclableCount,
        ecoScore,
      });
    } catch (e) {
      console.error("Error loading stats", e);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      id: "scan",
      label: "Scan",
      icon: "camera-alt",
      color: colors.primary,
      action: () => navigation.navigate("Camera"),
    },
    {
      id: "add",
      label: "Add Log",
      icon: "add-circle",
      color: colors.success,
      action: () => navigation.navigate("Logs", { screen: "AddLog" }),
    },
    {
      id: "logs",
      label: "Logs",
      icon: "list",
      color: colors.secondary,
      action: () => navigation.navigate("Logs"),
    },
    {
      id: "centers",
      label: "Centers",
      icon: "place",
      color: "#9C27B0",
      action: () => navigation.navigate("Locations"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Welcome back</Text>
          <Text style={styles.subHello}>
            Track your waste & improve your eco score
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileBtn}
        >
          <MaterialIcons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="#777" />
          <TextInput
            placeholder="Search logs or items"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity
            onPress={() => {
              setQuery("");
            }}
          >
            <MaterialIcons name="close" size={18} color="#aaa" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.quickIcon} onPress={loadStats}>
          <MaterialIcons name="refresh" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsRow}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Total Items</Text>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.cardNumber}>{stats.totalLogs}</Text>
            )}
            <MaterialIcons
              name="inventory"
              size={28}
              color={colors.secondary}
              style={styles.cardIcon}
            />
          </View>

          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Recycled</Text>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.cardNumber}>{stats.recyclableCount}</Text>
            )}
            <MaterialIcons
              name="recycling"
              size={28}
              color={colors.success}
              style={styles.cardIcon}
            />
          </View>
        </View>

        <View style={[styles.largeCard, styles.shadow]}>
          <View style={styles.largeCardHeader}>
            <Text style={styles.largeTitle}>Eco Score</Text>
            <Text style={styles.largeScore}>
              {isLoading ? "—" : stats.ecoScore}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((stats.ecoScore / 500) * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {stats.ecoScore < 100
              ? "Eco Beginner"
              : stats.ecoScore < 300
              ? "Eco Warrior"
              : "Eco Champion"}
          </Text>
        </View>

        <View style={styles.actionsGrid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={[styles.actionBtn, styles.shadow]}
              onPress={a.action}
              activeOpacity={0.8}
            >
              <View
                style={[styles.actionIcon, { backgroundColor: `${a.color}22` }]}
              >
                <MaterialIcons name={a.icon} size={24} color={a.color} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Logs")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.recentCard, styles.shadow]}>
            <MaterialIcons name="history" size={36} color={colors.primary} />
            <View style={styles.recentTextWrap}>
              <Text style={styles.recentTitle}>
                {stats.totalLogs} items logged
              </Text>
              <Text style={styles.recentSubtitle}>
                {stats.recyclableCount} recycled • {stats.thisWeek} this week
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => navigation.navigate("Logs")}
            >
              <Text style={styles.viewBtnText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tipCardContainer}>
          <Text style={styles.sectionTitle}>Eco Tip</Text>
          <View style={[styles.tipCard, styles.shadow]}>
            <MaterialIcons name="lightbulb" size={22} color={colors.accent} />
            <Text style={styles.tipText}>
              Rinse containers before recycling to reduce contamination.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: { fontSize: 20, fontWeight: "700", color: "#222" },
  subHello: { color: "#666", marginTop: 4 },
  profileBtn: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchInput: { marginLeft: 8, flex: 1, height: 36 },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  scrollContent: { padding: 16, paddingBottom: 40 },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginRight: 8,
    position: "relative",
  },
  cardTitle: { color: "#666", fontSize: 13 },
  cardNumber: { fontSize: 22, fontWeight: "800", marginTop: 6 },
  cardIcon: { position: "absolute", right: 12, top: 12 },
  largeCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  largeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeTitle: { fontSize: 16, fontWeight: "700" },
  largeScore: { fontSize: 22, fontWeight: "800", color: colors.primary },
  progressBar: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  progressLabel: { marginTop: 8, color: "#666" },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionBtn: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionLabel: { fontWeight: "700" },
  recentContainer: { marginTop: 10 },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  seeAll: { color: colors.primary },
  recentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  recentTextWrap: { marginLeft: 12, flex: 1 },
  recentTitle: { fontWeight: "700" },
  recentSubtitle: { color: "#777", marginTop: 4 },
  viewBtn: {
    backgroundColor: colors.primary + "22",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBtnText: { color: colors.primary, fontWeight: "700" },
  tipCardContainer: { marginTop: 14 },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  tipText: { marginLeft: 10, color: "#555" },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
});
