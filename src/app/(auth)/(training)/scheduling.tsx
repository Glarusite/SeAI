import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import BookingsDataTable from "@src/components/booking/bookings-data-table";
import { BookingsList } from "@src/components/booking/bookings-list";

export default function BookingPage() {
  const { width } = useAppDimensions();
  if (width < 960) {
    return <BookingsList />;
  }

  return (
    <AppScrollView wide>
      <BookingsDataTable actionLabel="Info" />
    </AppScrollView>
  );
}
