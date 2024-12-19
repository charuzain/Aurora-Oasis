import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../services/apiBookings";

export const useTodayActivity = () => {
  const {
    isPending: isTodayActivityPending,
    data: todayActivities,
  } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getTodayActivity,
  });

return { todayActivities, isTodayActivityPending };

}