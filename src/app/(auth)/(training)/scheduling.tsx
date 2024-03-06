import { useAppDimensions } from "@src/common/hooks";
import AppSafeAreaView from "@src/components/app/app-safe-area-view";
import AppScrollView from "@src/components/app/app-scroll-view";
import BookingsDataTable from "@src/components/booking/bookings-data-table";
import BookingsList from "@src/components/booking/bookings-list";

export default function BookingPage() {
  const { width } = useAppDimensions();
  if (width < 960) {
    return (
      <AppSafeAreaView>
        <BookingsList />
      </AppSafeAreaView>
    );
  }

  return (
    <AppScrollView wide>
      <BookingsDataTable />
    </AppScrollView>
  );
}
