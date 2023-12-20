import { showFeatureInDevelopmentToast } from "@src/common/toast";
import AppScrollView from "@src/components/app/app-scroll-view";
import LinkButton from "@src/components/ui/buttons/link-button";
import { Button } from "react-native-paper";

export default function TrainingCenterCourseManagementPage() {
  return (
    <AppScrollView>
      <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
        Enrollments
      </Button>
      <LinkButton href="/scheduling" mode="contained-tonal">
        Scheduling
      </LinkButton>
      <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
        Certifications
      </Button>
    </AppScrollView>
  );
}
