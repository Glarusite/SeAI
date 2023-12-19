import { showFeatureInDevelopmentToast } from "@src/common/toast";
import AppScrollView from "@src/components/app/app-scroll-view";
import { Button } from "react-native-paper";

export default function TrainingCenterCourseManagementPage() {
  return (
    <AppScrollView>
      <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
        Enrollments
      </Button>
      <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
        Scheduling
      </Button>
      <Button onPress={showFeatureInDevelopmentToast} mode="contained-tonal">
        Certifications
      </Button>
    </AppScrollView>
  );
}
