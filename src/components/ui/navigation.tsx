import { router } from "expo-router";
import { useCallback } from "react";
import { Platform } from "react-native";
import { Button } from "react-native-paper";

import LinkButton from "./buttons/link-button";

import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { resetAppValue, setUser, useAppDispatch, useAppSelector } from "@src/store";

export default function Navigation() {
  const role = useAppSelector(state => state.user.role) || "SEAFARER";
  const logout = useLogout();

  return (
    <>
      {role === "SEAFARER" && <SeafarerNavigation />}
      {role.startsWith("TRAINING_CENTER") && <TrainingCenterNavigation />}
      <Button onPress={logout} mode="outlined">
        Logout
      </Button>
    </>
  );
}

function useLogout() {
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(setUser({}));
    dispatch(resetAppValue("nextLoginReminderTimestamp"));
    router.push("/user/login");
  }, [dispatch]);
  return logout;
}

function SeafarerNavigation() {
  return (
    <>
      <LinkButton href="/scanner/" mode="contained">
        Smart Scanner
      </LinkButton>

      <LinkButton href="/user/" mode="contained-tonal">
        Profile
      </LinkButton>

      <LinkButton href="/documents/" mode="contained-tonal">
        Documents
      </LinkButton>

      <LinkButton href="/voyages/" mode="contained-tonal">
        Voyages
      </LinkButton>

      {Platform.OS === "web" && (
        <>
          <LinkButton href="/booking/" mode="contained-tonal">
            Booking
          </LinkButton>

          <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
            Chat
          </Button>

          <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
            Events
          </Button>

          <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
            Maritime Administration
          </Button>

          <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
            Information
          </Button>
        </>
      )}
    </>
  );
}

function TrainingCenterNavigation() {
  const role = useAppSelector(state => state.user.role) || "SEAFARER";

  const features = role === "TRAINING_CENTER_ADMIN" ? trainingCenterAdminFeatures : trainingCenterUserFeatures;

  return (
    <>
      <LinkButton href="/(auth)/(training)/dashboard" mode="contained">
        Dashboard
      </LinkButton>
      <LinkButton href="/course-management" mode="contained-tonal">
        Course Management
      </LinkButton>
      {features.map(feature => (
        <Button key={feature} onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
          {feature}
        </Button>
      ))}
    </>
  );
}

const trainingCenterAdminFeatures = [
  "Financials & Reports",
  "Communications / Chat",
  "User Management",
  "Settings",
  "Help & Support",
  "Feedback",
  "Analytics",
  "Compliance",
  "Resource Library",
  "Community Forum",
  "Marketplace",
  "Profile",
];

const trainingCenterUserFeatures = [
  "Communications / Chat",
  "Help & Support",
  "Feedback",
  "Analytics",
  "Compliance",
  "Resource Library",
  "Community Forum",
  "Marketplace",
];
